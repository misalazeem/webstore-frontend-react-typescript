export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const hasMinimumLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: hasMinimumLength && hasUpperCase && hasSpecialCharacter,
    hasMinimumLength,
    hasUpperCase,
    hasSpecialCharacter
  };
};
