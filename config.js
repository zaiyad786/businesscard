/**
 * Digital business card configuration.
 * This is the ONLY file you need to edit with your personal details.
 * Leave a field as an empty string "" to hide it from the card.
 * The physical NFC tag should point at the URL where this page is hosted,
 * NOT at a vCard file — that way you can edit this file later (new phone
 * number, new title, etc.) without ever reprogramming the physical card.
 */
const profile = {
  // Full name, e.g. "Zaiyad Ahmed"
  name: "Zaiyad Ahmed",

  // Job title, e.g. "Senior Enterprise Account Manager"
  title: "Senior Enterprise Account Manager",

  // Company name — shown as "Title | Company"
  company: "Gcore",

  // Short location, e.g. "Dubai, UAE"
  location: "Dubai, UAE",

  // Phone number in international format, e.g. "+971547453215"
  phone: "+971547453215",

  // Email address
  email: "zaiyad.ahmed@gcore.com",

  // WhatsApp number in international format (digits only or with +),
  // e.g. "+971547453215". Leave blank if you don't want a WhatsApp button.
  whatsapp: "+971547453215",

  // Full LinkedIn profile URL, e.g. "https://www.linkedin.com/in/zaiyadahmed"
  linkedin: "https://www.linkedin.com/in/zaiyadahmed",

  // URL to a professional headshot. Leave blank to show initials instead.
  photo: "profile_round.png",

  // Company website — used for the vCard and the Gcore brand link.
  website: "https://gcore.com",

  // One short positioning line. Max ~1-2 lines. Keep it brief.
  tagline: "Connecting businesses with Gcore's cloud, network, edge and security solutions.",

  // Optional upcoming event. Leave "name" blank to hide this entirely.
  event: {
    name: "LEAP'26", // e.g. "GITEX"
    location: "Riyadh", // e.g. "Dubai"
    date: "", // e.g. "Oct 2026"
    link: "" // optional URL/mailto for "Let's meet →"
  }
};
