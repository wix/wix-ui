/**
 * Convert a space delimited full name to capitalized initials.
 * Returned initials would not exceed 3 or 2 letters, according to provided `limit`.
 * @param limit number If set to 3, then if name has more than 3 parts,
 *  then the 1st, 2nd and last parts would be used. If set to 2, then first and last parts are used.
 */
export function nameToInitials(name?: string, limit: 2 | 3 = 2) {
  if (!name) {
    return '';
  }

  if (limit < 2 || limit > 3) {
    limit = 2;
  }

  let initials = name.split(' ').map(s=>s[0]).join('');
 
  if (limit === 2 && initials.length > 2) {
    initials = initials[0]+initials[initials.length-1];
  }

  if (limit === 3 && initials.length > 3) {
    initials = initials[0]+initials[1]+initials[initials.length-1];
  }

  return initials.toUpperCase();
}