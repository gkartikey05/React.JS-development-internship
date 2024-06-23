import "./Form.css";

import { useState } from "react";

// Custom Hook for form state management and validation
function useForm(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setValues({
      ...values,
      [name]: val,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted:", values);
      alert(`Form Submitted:\n${JSON.stringify(values, null, 2)}`);
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

function validate(values) {
  const errors = {};
  if (!values.name) errors.name = "*Name is required";

  if (!values.email) {
    errors.email = "*Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "*Email address is invalid";
  }

  if (!values.age) {
    errors.age = "*Age is required";
  } else if (values.age <= 0) {
    errors.age = "*Must be a number greater than 0";
  }

  if (values.attendingWithGuest && !values.guestName) {
    errors.guestName = "*Guest Name is required if attending with a guest";
  }

  return errors;
}

function Form() {
  const initialState = {
    name: "",
    email: "",
    age: "",
    attendingWithGuest: false,
    guestName: "",
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialState,
    validate
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="name">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      {errors.name && <p className="error">{errors.name}</p>}

      <div>
        <label className="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      {errors.email && <p className="error">{errors.email}</p>}

      <div>
        <label className="age">Age:</label>
        <input
          type="text"
          name="age"
          placeholder="Enter your age"
          value={values.age}
          onChange={handleChange}
        />
      </div>
      {errors.age && <p className="error">{errors.age}</p>}

      <div>
        <label className="attending-with-guest">
          Are you attending with a guest?
        </label>
        <input
          type="checkbox"
          name="attendingWithGuest"
          checked={values.attendingWithGuest}
          onChange={handleChange}
        />
      </div>

      {/* Conditional rendering based on the attendingWithGuest checkbox */}
      {values.attendingWithGuest && (
        <div className="input-box">
          <div>
            <label>Guest Name:</label>
            <input
              type="text"
              name="guestName"
              placeholder="Enter guest name"
              value={values.guestName}
              onChange={handleChange}
            />
          </div>
          {errors.guestName && <p className="error">{errors.guestName}</p>}
        </div>
      )}

      <button className="btn" type="submit">
        Register
      </button>
    </form>
  );
}

export default Form;
