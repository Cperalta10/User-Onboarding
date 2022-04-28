import "./App.css";
import Form from "./component/Form";
import React, { useState, useEffect } from "react";
import schema from "./validation/formSchema";
import * as yup from "yup";
import axios from "axios";

function App() {
  const [disabled, setDisabled] = useState(true);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    agree: false,
  });
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    agree: false,
  });

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const update = (keyName, keyValue) => {
    setForm({ ...form, [keyName]: keyValue });
  };

  const submit = (e) => {
    e.preventDefault();
    const newUser = {
      fname: form.fname.trim(),
      lname: form.lname.trim(),
      email: form.email.trim(),
      password: form.password,
      agree: form.agree,
    };
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((err) => {})
      .finally(() =>
        setForm({
          fname: "",
          lname: "",
          email: "",
          password: "",
          agree: false,
        })
      );
  };

  useEffect(() => {
    schema
      .isValid(form)
      .then((valid) => setDisabled(!valid))
      .catch((error) => {});
  });

  return (
    <div className="App">
      <Form
        submit={submit}
        errors={errors}
        setFormErrors={setFormErrors}
        form={form}
        update={update}
        disabled={disabled}
      />
      {users.map((user) => {
        return (
          <div key={user.id} className="users">
            <p>First Name: {user.fname}</p>
            <p>Last Name: {user.lname}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>
              Terms of Service: {user.agree === true ? "Agreed" : "Not agreed"}
            </p>
            <p>User created at: {user.createdAt}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
