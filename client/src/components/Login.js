import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
export const LoginForm = () => {
  const [doctors, setDoctors] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);
  useEffect(() => {
    fetch("/dms")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, [refreshPage]);
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Incorrect email or password.Try again.")
      .required("Please enter email."),
    password: yup
      .string()
      .password("Incorrect email or password.Try again.")
      .required("Please enter password."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/dms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status == 200) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });
  return (
    <div>
      <h1>Doctor Login Form</h1>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        <button type="submit">Submit</button>
      </form>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>Email</th>
            <th>Password</th>
          </tr>
          {doctors === "undefined" ? (
            <p>Loading</p>
          ) : (
            doctors.map((doctor, i) => (
              <>
                <tr key={i}>
                  <td>{doctor.email}</td>
                  <td>{doctor.password}</td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
