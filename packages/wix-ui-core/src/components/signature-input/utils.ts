let idCounter = 1;

export function generateID() {
  return String(idCounter++);
}
