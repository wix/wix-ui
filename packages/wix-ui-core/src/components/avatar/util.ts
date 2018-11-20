/**
 * Convert a space delimited full name to capitalized initials.
 * Returned initials would not exceed 3 letters.
 * If name has more than 3 parts, then the 1st, 2nd and last parts would be used.
 */
export function nameToInitials(name?: string) {
  if (!name) {
    return '';
  }
  let initials = name.split(' ').map(s=>s[0]).join('');
  if (initials.length > 3 ) {
    initials = initials[0]+initials[1]+initials[initials.length-1];
  }
  return initials.toUpperCase();
}