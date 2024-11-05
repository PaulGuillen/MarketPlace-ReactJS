export const validateEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()); 
};

export const validatePassword = (password: string | null | undefined): boolean => {
  return password ? password.trim().length > 0 : false;
};


export const truncateText = (text, charLimit) => {
  if (text.length > charLimit) {
    return text.slice(0, charLimit) + '...'; 
  }
  return text;
};

export const getDocumentType = (document: string): string => {
  return document.length === 8 ? "dni" : "cex";
};