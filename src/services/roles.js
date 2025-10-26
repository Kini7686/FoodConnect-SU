// src/services/roles.js
export const ADMIN_EMAIL = "ompatil9082154@gmail.com";

export function isAdmin(user) {
  return user?.email === ADMIN_EMAIL;
}
