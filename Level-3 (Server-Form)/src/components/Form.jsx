import "./Form.css";

import { useEffect, useState } from "react";

import useForm from "../hooks/useForm";

const initialState = {
  fullName: "",
  email: "",
  surveyTopic: "",
  technology: {
    programmingLanguage: "",
    yearsOfExperience: "",
  },
  health: {
    exerciseFrequency: "",
    dietPreference: "",
  },
  education: {
    highestQualification: "",
    fieldOfStudy: "",
  },
  feedback: "",
};

const Form = () => {
  const { formData, errors, handleChange, validateForm, setFormData } =
    useForm(initialState);

  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(
        `https://api.example.com/questions?topic=${topic}`
      );
      const data = await response.json();
      setAdditionalQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching additional questions:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process form submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Full name input field */}
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      {/* Email input field */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      {/* Survey topic dropdown */}
      <div>
        <label htmlFor="topic">Survey Topic</label>
        <select
          id="topic"
          name="surveyTopic"
          value={formData.surveyTopic}
          onChange={handleChange}
          required
        >
          <option value="">--Select a topic--</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
      </div>

      {formData.surveyTopic === "Technology" && (
        <>
          {/* Additional question for programming language */}
          <div>
            <label htmlFor="programmingLang">
              Favorite Programming Language
            </label>
            <select
              id="programmingLang"
              name="technology.programmingLanguage"
              value={formData.technology.programmingLanguage}
              onChange={handleChange}
              required
            >
              <option value="">--Select a language--</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors["technology.programmingLanguage"] && (
              <p className="error">
                {errors["technology.programmingLanguage"]}
              </p>
            )}
          </div>

          {/* Additional question for years of experience */}
          <div>
            <label htmlFor="experience">Years of Experience</label>
            <input
              id="experience"
              min="0"
              max="100"
              type="number"
              name="technology.yearsOfExperience"
              placeholder="Enter your experience"
              value={formData.technology.yearsOfExperience}
              onChange={handleChange}
              required
            />
            {errors["technology.yearsOfExperience"] && (
              <p className="error">{errors["technology.yearsOfExperience"]}</p>
            )}
          </div>
        </>
      )}

      {formData.surveyTopic === "Health" && (
        <>
          {/* Additional question for exercise frequency */}
          <div>
            <label htmlFor="exercise">Exercise Frequency</label>
            <select
              id="exercise"
              name="health.exerciseFrequency"
              value={formData.health.exerciseFrequency}
              onChange={handleChange}
              required
            >
              <option value="">--Select frequency--</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors["health.exerciseFrequency"] && (
              <p className="error">{errors["health.exerciseFrequency"]}</p>
            )}
          </div>

          {/* Additional question for diet preference */}
          <div>
            <label htmlFor="diet">Diet Preference</label>
            <select
              id="diet"
              name="health.dietPreference"
              value={formData.health.dietPreference}
              onChange={handleChange}
              required
            >
              <option value="">--Select diet--</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors["health.dietPreference"] && (
              <p className="error">{errors["health.dietPreference"]}</p>
            )}
          </div>
        </>
      )}

      {formData.surveyTopic === "Education" && (
        <>
          {/* Additional question for highest qualification */}
          <div>
            <label htmlFor="qualification">Highest Qualification</label>
            <select
              id="qualification"
              name="education.highestQualification"
              value={formData.education.highestQualification}
              onChange={handleChange}
              required
            >
              <option value="">--Select qualification--</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors["education.highestQualification"] && (
              <p className="error">
                {errors["education.highestQualification"]}
              </p>
            )}
          </div>

          {/* Additional question for field of study */}
          <div>
            <label htmlFor="studyField">Field of Study</label>
            <input
              id="studyField"
              type="text"
              name="education.fieldOfStudy"
              placeholder="Enter your field of study"
              value={formData.education.fieldOfStudy}
              onChange={handleChange}
              required
            />
            {errors["education.fieldOfStudy"] && (
              <p className="error">{errors["education.fieldOfStudy"]}</p>
            )}
          </div>
        </>
      )}

      {/* Feedback question */}
      <div>
        <label htmlFor="feedback">Feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          placeholder="Write your feedback here..."
          value={formData.feedback}
          onChange={handleChange}
          required
        />
        {errors.feedback && <p className="error">{errors.feedback}</p>}
      </div>

      {/* Display additional questions */}
      {additionalQuestions.map((question, index) => (
        <div key={index}>
          <label htmlFor="">{question.text}</label>
          <input
            type="text"
            name={`additionalQuestion${index}`}
            value={formData[`additionalQuestion${index}`] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
