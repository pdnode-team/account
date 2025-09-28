export const isValidEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }
  // A standard, practical regex for most common email formats
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
