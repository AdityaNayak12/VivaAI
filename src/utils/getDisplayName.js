/**
 * Returns the best available display name for a Firebase user.
 *
 * Priority:
 *  1. user.displayName  — set for Google / OAuth sign-ins
 *  2. local-part of email, capitalised — e.g. "adinayak18@gmail.com" → "Adinayak18"
 *     Numbers are stripped and underscores/dots become spaces for readability,
 *     e.g. "john.doe42" → "John Doe"
 *  3. "User" — safe fallback
 *
 * @param {import("firebase/auth").User | null} user
 * @returns {string}
 */
export function getDisplayName(user) {
  if (!user) return "User";

  if (user.displayName && user.displayName.trim()) {
    return user.displayName.trim();
  }

  if (user.email) {
    const local = user.email.split("@")[0]; // e.g. "john.doe42"
    const cleaned = local
      .replace(/[._-]/g, " ")      // dots/underscores/dashes → spaces
      .replace(/\d+/g, "")         // strip trailing/embedded numbers
      .trim();

    if (cleaned) {
      // Capitalise each word
      return cleaned
        .split(" ")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    }
  }

  return "User";
}
