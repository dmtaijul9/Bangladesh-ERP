import { useEffect, useState } from "react";

export const useForm = (initial: any = {}) => {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = (e: any) => {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseFloat(value);
    }
    if (type === "file") {
      value = e.target.files[0];
    }
    setInputs({ ...inputs, [name]: value });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};
