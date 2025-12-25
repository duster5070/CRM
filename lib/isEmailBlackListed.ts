const blackListedDomains = [
  "maildrop.cc",
  "dispostable.com",
  "trashmail.com",
  "spam4.me",
  "sharklasers.com",
  "temporarymail.com",
  "mailnesia.com",
  "fakeinbox.com",
  "temp-mail.org",
  "yopmail.com",
  "10minutemail.com",
  "gurrillamail.com",
  "throwawaymail.com",
  "tempmail.com",
  "mailinator.com",
];

export function isEmailBlackListed(email: string): boolean {
  const domain = email.split("@")[1].toLowerCase();
  return blackListedDomains.includes(domain);
}
