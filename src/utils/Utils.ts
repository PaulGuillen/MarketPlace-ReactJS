// utils/validation.ts

/**
 * Valida si el formato del correo es correcto y si no es nulo o indefinido.
 * @param email El correo a validar.
 * @returns true si es válido, false de lo contrario.
 */
export const validateEmail = (email: string | null | undefined): boolean => {
    if (!email) return false; // Verifica si es nulo o indefinido
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim()); // trim para eliminar espacios al inicio o final
  };
  
/**
 * Validates if the password is not null or empty.
 * @param password The password to validate.
 * @returns true if the password is not null or empty, false otherwise.
 */
export const validatePassword = (password: string | null | undefined): boolean => {
    return password ? password.trim().length > 0 : false;
};
