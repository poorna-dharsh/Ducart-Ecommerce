import React, { useState } from "react";

import HeroSection from "../Components/HeroSection";

import formValidators from "../Components/Validators/formValidators";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    username: "User Name Field is Mendatory",
    email: "Email Field is Mendatory",
    phone: "Phone Field is Mendatory",
    password: "Password Field is Mendatory",
  });
  let [show, setShow] = useState(false);

  let navigate = useNavigate();

  function getInputData(e) {
    var { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidators(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  async function postData(e) {
    e.preventDefault();

    // Check for existing validation errors
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
      return;
    }

    // Check for password mismatch
    if (data.password !== data.cpassword) {
      setErrorMessage((old) => ({
        ...old,
        password: "Password and Confirm Password Don't Match",
      }));
      setShow(true);
      return;
    }

    try {
      // Send POST request to create the user
      const postResponse = await fetch(
        `${process.env.REACT_APP_SERVER}/api/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: "Buyer",
          }),
        }
      );

      // Check if POST request was successful
      if (!postResponse.ok) {
        console.error("POST request failed:", postResponse.statusText);
        alert("Something Went Wrong!");
        return;
      }

      const postResult = await postResponse.json();
      console.log("POST Response:", postResult);

      // Store user data in localStorage
      localStorage.setItem("login", true);
      localStorage.setItem("name", postResult.name);
      localStorage.setItem("userid", postResult.id);
      localStorage.setItem("role", postResult.role);

      navigate("/profile");

      // Send GET request to validate the username or email
      const getResponse = await fetch(
        `${process.env.REACT_APP_SERVER}/api/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!getResponse.ok) {
        console.error("GET request failed:", getResponse.statusText);
        alert("Unable to fetch user data!");
        return;
      }

      const users = await getResponse.json();
      const existingUser = users.find(
        (user) => user.username === data.username || user.email === data.email
      );

      if (existingUser) {
        setErrorMessage((old) => ({
          ...old,
          username:
            data.username === existingUser.username
              ? "Username is Already Taken"
              : "",
          email:
            data.email === existingUser.email
              ? "Email is Already Registered"
              : "",
        }));
        setShow(true);
      }
    } catch (err) {
      console.error("An error occurred:", err.message);
      alert("An unexpected error occurred!");
    }
  }

  return (
    <>
      <HeroSection title="Signup - Create Your Account" />

      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 col-sm-10 m-auto">
            <h5 className="bg-primary text-light text-center p-2">
              Create Your Free Account
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Full Name"
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger">{errorMessage.name}</p>
                  ) : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>User Name*</label>
                  <input
                    type="text"
                    name="username"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.username
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="User Name"
                  />
                  {show && errorMessage.username ? (
                    <p className="text-danger">{errorMessage.username}</p>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.email
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Email Address"
                  />
                  {show && errorMessage.email ? (
                    <p className="text-danger">{errorMessage.email}</p>
                  ) : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone Number*</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.phone
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Phone Number"
                  />
                  {show && errorMessage.phone ? (
                    <p className="text-danger">{errorMessage.phone}</p>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Password*</label>
                  <input
                    type="password"
                    name="password"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.password
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Password"
                  />
                  {show && errorMessage.password ? (
                    <p className="text-danger">{errorMessage.password}</p>
                  ) : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Confirm Password*</label>
                  <input
                    type="password"
                    name="cpassword"
                    onChange={getInputData}
                    className="form-control border-3 border-primary"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Signup
                </button>
              </div>
            </form>
            <Link to="/login">Already Heave an Account?Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
