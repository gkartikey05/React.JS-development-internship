// useForm.js
import { useState } from "react";

const useForm = (initialState, validate) => {
  // const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setValues((prevState) => {
      if (checked) {
        return {
          ...prevState,
          additionalSkills: [...prevState.additionalSkills, value],
        };
      } else {
        return {
          ...prevState,
          additionalSkills: prevState.additionalSkills.filter(
            (skill) => skill !== value
          ),
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted:", values);
      alert(`Form Submitted:\n${JSON.stringify(values, null, 2)}`);
      setSubmitted(true);
    }
  };

  return {
    values,
    errors,
    submitted,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  };
};

export default useForm;
