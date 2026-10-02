<?php
/**
 * contact.php — handles both forms on iamharinda.com:
 *   form=sample   → /free-sample/  (free sample edit request)
 *   form=contact  → /contact/      (general enquiry)
 *
 * Validates input, blocks bots (honeypot + optional Cloudflare Turnstile +
 * a simple per-IP rate limit), emails the site mailbox, then redirects to the
 * matching thank-you page so GA4 can count the conversion.
 */

// ── Config ──────────────────────────────────────────────────────────────────
$TO      = 'hello@iamharinda.com';        // a real mailbox on this domain
$FROM    = 'no-reply@iamharinda.com';     // must exist on this domain (SPF/DKIM)
$SITE    = 'https://www.iamharinda.com';
// Optional Cloudflare Turnstile secret. Set it here (and turnstileSiteKey in
// src/data/site.js) to require the challenge. Leave empty to skip.
$TURNSTILE_SECRET = '';
$RATE_LIMIT = 5;          // max submissions…
$RATE_WINDOW = 600;       // …per IP per 10 minutes

$form = (($_POST['form'] ?? '') === 'sample') ? 'sample' : 'contact';
$back = $SITE . ($form === 'sample' ? '/free-sample/' : '/contact/');
$thanks = $back . 'thanks/';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') { header('Location: ' . $back, true, 303); exit; }

// Honeypot: humans never fill "company".
if (!empty($_POST['company'])) { header('Location: ' . $thanks, true, 303); exit; }

// Per-IP rate limit (file-based, no database needed).
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '0';
$bucket = sys_get_temp_dir() . '/hf_rl_' . md5($ip);
$hits = array_filter(@json_decode(@file_get_contents($bucket), true) ?: [], fn($t) => $t > time() - $RATE_WINDOW);
if (count($hits) >= $RATE_LIMIT) { header('Location: ' . $back . '?error=1', true, 303); exit; }
$hits[] = time();
@file_put_contents($bucket, json_encode(array_values($hits)));

// Optional Turnstile verification.
if ($TURNSTILE_SECRET !== '') {
    $ctx = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query(['secret' => $TURNSTILE_SECRET, 'response' => $_POST['cf-turnstile-response'] ?? '', 'remoteip' => $ip]),
        'timeout' => 5,
    ]]);
    $res = json_decode(@file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $ctx), true);
    if (empty($res['success'])) { header('Location: ' . $back . '?error=1', true, 303); exit; }
}

// ── Gather + validate ──────────────────────────────────────────────────────
$clean = static fn($v, $max = 500) => mb_substr(trim(str_replace(["\r", "\n", "\t", "%0a", "%0d", "%0A", "%0D"], ' ', (string) $v)), 0, $max);
$name    = $clean($_POST['name'] ?? '', 120);
$email   = $clean($_POST['email'] ?? '', 200);
$message = mb_substr(trim((string) ($_POST['message'] ?? '')), 0, 8000);

$ok = $name !== '' && filter_var($email, FILTER_VALIDATE_EMAIL);
if ($form === 'sample') {
    $link = $clean($_POST['photos_link'] ?? '', 1000);
    $ok = $ok && preg_match('#^https?://#i', $link);
} else {
    $ok = $ok && $message !== '';
}
if (!$ok) { header('Location: ' . $back . '?error=1', true, 303); exit; }

// ── Compose ────────────────────────────────────────────────────────────────
if ($form === 'sample') {
    $subject = 'Free sample request — ' . $clean($_POST['shoot_type'] ?? 'photos', 80);
    $fields = [
        'Name' => $name, 'Email' => $email,
        'Photos link' => $link,
        'Shoot type' => $clean($_POST['shoot_type'] ?? ''),
        'Gallery size' => $clean($_POST['gallery_size'] ?? '', 40),
        'Style' => $clean($_POST['style'] ?? ''),
        'Reference' => $clean($_POST['reference'] ?? '', 1000),
    ];
} else {
    $subject = 'New enquiry — ' . $clean($_POST['service'] ?? 'website', 80);
    $fields = ['Name' => $name, 'Email' => $email, 'Service' => $clean($_POST['service'] ?? '')];
}
$body = ($form === 'sample' ? "Free sample request" : "New enquiry") . " from iamharinda.com\n-----------------------------------\n";
foreach ($fields as $k => $v) { $body .= str_pad($k . ':', 14) . ($v !== '' ? $v : '—') . "\n"; }
$body .= "-----------------------------------\n\n" . $message . "\n";

$headers = [
    'From: iamharinda.com <' . $FROM . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
];
$sent = @mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), '-f' . $FROM);

header('Location: ' . ($sent ? $thanks : $back . '?error=1'), true, 303);
exit;
