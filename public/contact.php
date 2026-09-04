<?php
/**
 * contact.php — handler for the iamharinda.com contact form.
 *
 * Hostinger Business shared hosting gives us PHP + mail(). This script accepts
 * the POST from /contact/, validates it, emails it to the site mailbox, and
 * redirects back to /contact/ with an anchor the page uses to show a message.
 *
 * SET-UP: create the mailbox in step 5 of the README, then check $TO below.
 */

// ── Config ──────────────────────────────────────────────────────────────────
$TO      = 'hello@iamharinda.com';                 // TODO: must be a real mailbox on this domain
$FROM    = 'no-reply@iamharinda.com';              // TODO: an address that exists on this domain
$SUBJECT = 'New enquiry from iamharinda.com';
$SITE    = 'https://www.iamharinda.com';
$RETURN  = $SITE . '/contact/';

// ── Only handle POST ────────────────────────────────────────────────────────
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    header('Location: ' . $RETURN, true, 303);
    exit;
}

// ── Honeypot: humans never fill "company" ──────────────────────────────────
if (!empty($_POST['company'])) {
    // Pretend it worked; do not send.
    header('Location: ' . $RETURN . '?sent=1#sent', true, 303);
    exit;
}

// ── Gather + trim ──────────────────────────────────────────────────────────
$name    = trim((string) ($_POST['name']    ?? ''));
$email   = trim((string) ($_POST['email']   ?? ''));
$count   = trim((string) ($_POST['count']   ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

// ── Validate ───────────────────────────────────────────────────────────────
$ok = $name !== ''
    && filter_var($email, FILTER_VALIDATE_EMAIL)
    && $message !== ''
    && strlen($message) <= 8000;

if (!$ok) {
    header('Location: ' . $RETURN . '?error=1#error', true, 303);
    exit;
}

// ── Strip anything that could inject mail headers ──────────────────────────
$strip = static function (string $v): string {
    return trim(str_replace(["\r", "\n", "\t", "%0a", "%0d", "%0A", "%0D"], ' ', $v));
};
$name  = $strip($name);
$email = $strip($email);
$count = $strip($count);

// ── Compose ────────────────────────────────────────────────────────────────
$body  = "New enquiry from iamharinda.com\n";
$body .= "-----------------------------------\n";
$body .= "Name:   {$name}\n";
$body .= "Email:  {$email}\n";
$body .= "Photos: " . ($count !== '' ? $count : 'not specified') . "\n";
$body .= "-----------------------------------\n\n";
$body .= $message . "\n";

$headers   = [];
$headers[] = 'From: iamharinda.com <' . $FROM . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($TO, '=?UTF-8?B?' . base64_encode($SUBJECT) . '?=', $body, implode("\r\n", $headers));

header('Location: ' . $RETURN . ($sent ? '?sent=1#sent' : '?error=1#error'), true, 303);
exit;
