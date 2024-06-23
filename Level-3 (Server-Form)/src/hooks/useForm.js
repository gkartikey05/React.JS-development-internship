import { useState } from "react";

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.surveyTopic) {
      newErrors.surveyTopic = "Survey Topic is required";
    }
    if (formData.surveyTopic === "Technology") {
      if (!formData.technology.programmingLanguage) {
        newErrors["technology.programmingLanguage"] =
          "Favorite Programming Language is required";
      }
      if (!formData.technology.yearsOfExperience) {
        newErrors["technology.yearsOfExperience"] =
          "Years of Experience is required";
      }
    }
    if (formData.surveyTopic === "Health") {
      if (!formData.health.exerciseFrequency) {
        newErrors["health.exerciseFrequency"] =
          "Exercise Frequency is required";
      }
      if (!formData.health.dietPreference) {
        newErrors["health.dietPreference"] = "Diet Preference is required";
      }
    }
    if (formData.surveyTopic === "Education") {
      if (!formData.education.highestQualification) {
        newErrors["education.highestQualification"] =
          "Highest Qualification is required";
      }
      if (!formData.education.fieldOfStudy) {
        newErrors["education.fieldOfStudy"] = "Field of Study is required";
      }
    }
    if (!formData.feedback) {
      newErrors.feedback = "Feedback is required";
    } else if (formData.feedback.length < 50) {
      newErrors.feedback = "Feedback must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    errors,
    handleChange,
    validateForm,
  };
};

export default useForm;
