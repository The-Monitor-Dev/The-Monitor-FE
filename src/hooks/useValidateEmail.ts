import { useCallback } from "react";

const useValidateEmail = (type: string) => {
  const validateEmail = useCallback(
    (keyword: string) => {
      if (type === "email") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(keyword.trim());
      }
      return true;
    },
    [type],
  );

  return validateEmail;
};

export default useValidateEmail;
