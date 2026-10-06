// Harinda's professional profile: education, experience, certifications,
// skills and public profiles. Source of truth is his LinkedIn profile
// (linkedin.com/in/iamharinda, exported 6 Oct 2026) plus his own public
// profiles (Behance, GitHub, Fiverr) and Orbitra. Update this file when
// LinkedIn changes; the home page and Person schema read from it.
//
// Note: a different person, Prof. Harinda Fernando of SLIIT, shows up in
// search. Nothing here comes from his profiles.

export const profile = {
  name: "Harinda Fernando",
  fullName: "Harinda Vishwantha Fernando",
  headline: "B.ICT (Hons) · Photo editor, web developer and app maker",
  hometown: "Kuliyapitiya",
  region: "North Western Province",
  country: "Sri Lanka",
  freelancingSince: 2019,
  openTo: "Photo editor and photo retoucher roles",

  // ── Experience (LinkedIn) ──────────────────────────────────────────────────
  experience: [
    {
      role: "Freelance Photo Editor",
      org: "Fiverr · Freelance",
      logo: "/images/logos/fiverr.webp",
      start: "Nov 2019",
      end: "Present",
      place: "Remote",
      text: "Wedding, portrait, event, product and food editing in Adobe Lightroom and Photoshop for photographers worldwide, working closely with each client on their style.",
      skills: ["Adobe Lightroom", "Adobe Photoshop", "Photo Retouching", "Image Editing", "Photo Touch-up", "Wedding Albums"],
    },
    {
      role: "Trainee Software Engineer (PHP)",
      org: "Elegant Media Sri Lanka · Internship",
      logo: "/images/logos/elegant-media.webp",
      start: "Sep 2022",
      end: "Apr 2023",
      place: "Colombo, Sri Lanka",
      text: "Internship as a Trainee Associate Software Engineer: PHP and Laravel web applications, Vue.js front ends, REST APIs and MySQL, shipped with Git on Linux servers.",
      skills: ["PHP", "Laravel", "Vue.js", "MySQL", "REST APIs", "Git", "Bitbucket", "LAMP", "Nginx"],
    },
    {
      role: "WordPress Developer",
      org: "HELAMID LLC · Full-time",
      monogram: "H",
      start: "Jun 2020",
      end: "Dec 2021",
      place: "Remote",
      text: "Built and maintained WordPress websites remotely: themes, plugins, databases and search engine optimization.",
      skills: ["WordPress", "HTML", "CSS", "JavaScript", "Bootstrap", "Databases", "SEO"],
    },
  ],

  // ── Education (LinkedIn) ───────────────────────────────────────────────────
  education: [
    {
      school: "Rajarata University of Sri Lanka",
      logo: "/images/logos/rajarata.webp",
      award: "B.ICT (Hons) · Bachelor of Information Technology",
      field: "Information Technology",
      start: "2018",
      end: "Apr 2023",
      url: "https://www.rjt.ac.lk/",
    },
    {
      school: "University of Colombo School of Computing (UCSC)",
      logo: "/images/logos/ucsc.webp",
      award: "Bachelor's degree programme",
      field: "Information Technology",
      start: "Jul 2017",
      end: null,
      url: "https://ucsc.cmb.ac.lk/",
    },
    {
      school: "Central College, Kuliyapitiya",
      monogram: "CC",
      award: "GCE Advanced Level, 2016",
      field: "Technology stream: Engineering Technology, Science for Technology and ICT",
      start: "2014",
      end: "2016",
    },
    {
      school: "Saranath College, Kuliyapitiya",
      monogram: "SC",
      award: "GCE Ordinary Level, 2013",
      field: null,
      start: "2008",
      end: "2013",
    },
  ],

  // ── Licenses & certifications (LinkedIn lists 7; these two are public) ──────
  certificationsTotal: 7,
  certifications: [
    { name: "Google Analytics for Beginners", issuer: "Google", issued: "Jun 2023", logo: "/images/logos/google.webp" },
    { name: "Docker Training Course", issuer: "KodeKloud", issued: "Jun 2023", logo: "/images/logos/kodekloud.webp", credentialId: "2D0D70FE6491-2D0D6B079935-2D0D6ACB53E9" },
    { name: "HTML", issuer: "LinkedIn Skill Assessment", issued: "Passed", logo: "/images/logos/linkedin.webp" },
  ],

  // ── Skills (all 35 from LinkedIn, grouped; plus Android from Orbitra) ───────
  skills: [
    { group: "Photo editing", items: ["Adobe Lightroom", "Adobe Photoshop", "Photo Retouching", "Photo Touch-up", "Image Editing", "Wedding Albums"] },
    { group: "Web development", items: ["HTML", "CSS", "JavaScript", "Vue.js", "Bootstrap", "PHP", "Laravel", "WordPress", "AJAX", "REST APIs", "SEO"] },
    { group: "Data & servers", items: ["MySQL", "Databases", "phpMyAdmin", "LAMP", "Nginx", "Ubuntu", "macOS", "cPanel", "Sandboxing"] },
    { group: "Tools & teamwork", items: ["Git", "Version Control", "Bitbucket", "Visual Studio Code", "Trello", "Google Sheets", "Google Slides", "FRD", "Scratch"] },
    { group: "Live production & media", items: ["Live streaming", "Multi-camera production", "Blackmagic switchers", "vMix", "OBS Studio", "Audio mixing", "Video editing", "Multimedia", "Social media management"] },
    { group: "Apps (Orbitra)", items: ["Android", "Kotlin", "React Native", "Firebase", "Astro"] },
  ],

  // Photography genres he edits (LinkedIn → Services).
  genres: ["Wedding", "Event", "Portrait", "Headshot", "Food", "Real estate", "Restaurant", "Sports", "Commercial", "Corporate"],

  // ── The whole story, oldest first ──────────────────────────────────────────
  timeline: [
    { when: "2008 – 2013", title: "Saranath College, Kuliyapitiya", text: "School years, finishing with the GCE Ordinary Level in 2013.", monogram: "SC", kind: "study" },
    { when: "2014 – 2016", title: "A/L technology stream, Central College", text: "GCE Advanced Level in 2016 with Engineering Technology, Science for Technology and ICT.", monogram: "CC", kind: "study" },
    { when: "2017", title: "Information Technology at UCSC", text: "Joined the University of Colombo School of Computing's bachelor's programme in Information Technology.", logo: "/images/logos/ucsc.webp", kind: "study" },
    { when: "2018", title: "Rajarata University of Sri Lanka", text: "Started the B.ICT (Hons) degree, and started sharing work on Behance as Harinda Creative Studio.", logo: "/images/logos/rajarata.webp", kind: "study" },
    { when: "Nov 2019", title: "Freelance photo editor", text: "First photo-editing orders on Fiverr. The work that grew into 1,150+ orders for clients in 49 countries.", logo: "/images/logos/fiverr.webp", kind: "work" },
    { when: "2020 – 2021", title: "WordPress developer, HELAMID LLC", text: "A year and a half building WordPress sites full-time, remotely.", monogram: "H", kind: "work" },
    { when: "2022 – 2023", title: "Trainee software engineer, Elegant Media", text: "PHP, Laravel and Vue.js in a Colombo software company.", logo: "/images/logos/elegant-media.webp", kind: "work" },
    { when: "Apr 2023", title: "Graduated: B.ICT (Hons)", text: "Completed the Bachelor of Information Technology at Rajarata University of Sri Lanka.", logo: "/images/logos/rajarata.webp", kind: "milestone" },
    { when: "Jun 2023", title: "Certifications", text: "Google Analytics for Beginners (Google) and the Docker Training Course (KodeKloud).", logo: "/images/logos/google.webp", kind: "study" },
    { when: "Oct 2026", title: "Orbitra: five Android apps", text: "Periodic Element Table and ToolsServer (the apps of my websites PeriodicElementTable.com and ToolsServer.com), Budget Tracker and Habit Tracker on Google Play. ProductWhite is in testing.", logo: "/orbitra/assets/brand/orbitra-app-icon.svg", kind: "milestone", href: "/orbitra/" },
  ],

  // Beyond work.
  also: [
    { title: "HaVilah FM", text: "Founder of HaVilah FM, a Sinhala Christian online radio station with its own app." },
  ],

  // ── Public profiles (all @iamharinda) ──────────────────────────────────────
  profiles: [
    { name: "LinkedIn", logo: "/images/logos/linkedin.webp", url: "https://www.linkedin.com/in/iamharinda" },
    { name: "Fiverr", logo: "/images/logos/fiverr.webp", url: "https://www.fiverr.com/iamharinda" },
    { name: "GitHub", logo: "/images/logos/github.webp", url: "https://github.com/iamHarinda" },
    { name: "Behance", logo: "/images/logos/behance.webp", url: "https://www.behance.net/iamharinda" },
    { name: "Instagram", logo: "/images/logos/instagram.webp", url: "https://www.instagram.com/iamharinda/" },
    { name: "X", logo: "/images/logos/x.webp", url: "https://x.com/iamharinda" },
    { name: "Ko-fi", logo: "/images/logos/ko-fi.webp", url: "https://ko-fi.com/iamharinda" },
  ],
};

export default profile;
