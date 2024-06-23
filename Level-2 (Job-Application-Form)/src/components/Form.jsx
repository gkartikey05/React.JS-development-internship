import "./Form.css";

import { useEffect } from "react";

import useForm from "../hooks/useForm";

const validate = (values) => {
  const errors = {};

  if (!values.fullName) 
    errors.fullName = "*Name is required";
  else if (values.fullName.length < 3)
    errors.fullName = "*Name must be at least 3 characters long";
  else if (!/^[a-zA-Z\s]+$/.test(values.fullName))
    errors.fullName = "*Name must contain letters and spaces only";

  if (!values.email) 
    errors.email = "*Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = "*Email is invalid";

  if (!values.phoneNumber) 
    errors.phoneNumber = "*Phone Number is required";
  else if (!/^\d+$/.test(values.phoneNumber))
    errors.phoneNumber = "*Phone Number is invalid";
  else if (values.phoneNumber.length < 10)
    errors.phoneNumber = "*Phone Number must be at least 10 digits long";

  if (
    (values.position === "Developer" || values.position === "Designer") &&
    (!values.relevantExperience)
  ) {
    errors.relevantExperience =
      "*Relevant Experience is required";
  }

  if (values.position === "Designer" && !values.portfolioURL) {
    errors.portfolioURL = "*Portfolio URL is required";
  } else if (
    values.portfolioURL &&
    !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioURL)
  ) {
    errors.portfolioURL = "*Portfolio URL is invalid";
  }

  if (values.position === "Manager" && !values.managementExperience) {
    errors.managementExperience = "*Management Experience is required";
  }
  if (values.additionalSkills.length === 0)
    errors.additionalSkills = "*At least one skill must be selected";

  if (!values.interviewTime)
    errors.interviewTime = "*Preferred Interview Date & Time is required";

  return errors;
};

const initialState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  position: "",
  relevantExperience: "",
  portfolioURL: "",
  managementExperience: "",
  additionalSkills: [],
  interviewTime: "",
};

const JobApplicationForm = () => {
  const {
    values,
    errors,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  } = useForm(initialState, validate);

  useEffect(() => {
    if (values.position !== "Designer") values.portfolioURL = "";
    if (values.position !== "Manager") values.managementExperience = "";
    if (values.position === "Developer" || values.position === "Designer") {
      values.relevantExperience = "";
    }
  }, [values.position]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="input-box">
          <label htmlFor="name">Name :</label>
          <input
            id="name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={values.fullName}
            onChange={handleChange}
          />
        </div>
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div>
        <div className="input-box">
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div>
        <div className="input-box">
          <label htmlFor="contact">Phone Number :</label>
          <input
            id="contact"
            type="number"
            name="phoneNumber"
            placeholder="Enter your number"
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      </div>

      <div className="input-box">
        <label htmlFor="position">Applying for Position :</label>
        <select
          id="position"
          name="position"
          value={values.position}
          onChange={handleChange}
        >
          <option value="">--Select Position--</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      {(values.position === "Developer" ||
        values.position === "Designer") && (
        <div>
          <div className="input-box">
            <label htmlFor="experience">Relevant Experience :</label>
            <input
              id="experience"
              type="number"
              min="0"
              name="relevantExperience"
              placeholder="Enter your experience (Years)"
              value={values.relevantExperience}
              onChange={handleChange}
            />
          </div>
          {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
        </div>
      )}
      {values.position === "Designer" && (
        <div>
          <div className="input-box">
            <label htmlFor="portfolio">Portfolio URL :</label>
            <input
              id="portfolio"
              type="text"
              name="portfolioURL"
              placeholder="Enter your portfolio URL"
              value={values.portfolioURL}
              onChange={handleChange}
            />
          </div>
          {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
        </div>
      )}
      {values.position === "Manager" && (
        <div>
          <div className="input-box">
            <label htmlFor="management">Management Experience :</label>
            <textarea
              id="management"
              name="managementExperience"
              placeholder="Write about your management experience..."
              value={values.managementExperience}
              onChange={handleChange}
            ></textarea>
          </div>
          {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
        </div>
      )}

      <div>
        <div className="input-box additional-skills">
          <label htmlFor="skills">Additional Skills :</label>
          <div className="input-box">
            <input
              type="checkbox"
              name="additionalSkills"
              value="JavaScript"
              checked={values.additionalSkills.includes("JavaScript")}
              onChange={handleCheckboxChange}
            />{" "}
            JavaScript
            <input
              type="checkbox"
              name="additionalSkills"
              value="CSS"
              checked={values.additionalSkills.includes("CSS")}
              onChange={handleCheckboxChange}
            />{" "}
            CSS
            <input
              type="checkbox"
              name="additionalSkills"
              value="Python"
              checked={values.additionalSkills.includes("Python")}
              onChange={handleCheckboxChange}
            />{" "}
            Python
          </div>
        </div>
        {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
      </div>

      <div>
        <div className="input-box timing">
          <label htmlFor="timing">Preferred Interview Time:</label>
          <input
            id="timing"
            type="datetime-local"
            name="interviewTime"
            value={values.interviewTime}
            onChange={handleChange}
          />
        </div>
        {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
      </div>
      
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default JobApplicationForm;
