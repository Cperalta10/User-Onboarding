import React from "react";

export default function Form(props) {
  const { form, update, disabled, setFormErrors, errors, submit } = props;

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    update(name, valueToUse);
  };

  return (
    <div>
      <h1>Best Form Ever</h1>
      <div className="error">{errors.fname}</div>
      <div className="error">{errors.lname}</div>
      <div className="error">{errors.email}</div>
      <div className="error">{errors.password}</div>
      <div className="error">{errors.agree}</div>
      <form onSubmit={submit}>
        <label>
          First name
          <input
            onChange={change}
            value={form.fname}
            name="fname"
            type="text"
          ></input>
        </label>

        <label>
          Last Name
          <input
            onChange={change}
            value={form.lname}
            name="lname"
            type="text"
          ></input>
        </label>

        <label>
          Email
          <input
            onChange={change}
            value={form.email}
            name="email"
            type="email"
          ></input>
        </label>

        <label>
          Password
          <input
            onChange={change}
            value={form.password}
            name="password"
            type="password"
          ></input>
        </label>

        <label>
          Terms of Service
          <input
            onChange={change}
            checked={form.agree}
            name="agree"
            type="checkbox"
          ></input>
        </label>

        <button id="submitBtn" disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  );
}
