import { useState } from "react";

const usePasswordValidation = () => {
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    hasNumberAndLetter: false,
    hasSpecialChar: false,
  });

  const validatePassword = (password: string) => {
    setPasswordChecks({
      length: password.length >= 8,
      hasNumberAndLetter: /[A-Za-z]/.test(password) && /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  return { passwordChecks, validatePassword };
};

export default usePasswordValidation;
