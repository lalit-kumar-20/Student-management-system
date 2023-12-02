// src/components/StudentInterface.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../Services/API_Services";
//import {Button} from 'Bootstrap'
import Task from "./Task";

const StudentInterface = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [studentCredentials, setStudentCredentials] = useState({
    email: "",
    password: "",
  });
  const [tasks, setTasks] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await api.post("/student/signup", newStudent);
      setSuccessMessage("Account created successfully!");
      setErrorMessage(""); // Reset error message if it was set before
    } catch (error) {
      setSuccessMessage(""); // Reset success message if it was set before
      setErrorMessage("Email is already Registered."); // Set error message
      console.error("Error during signup:", error); // Log the error for debugging
    }
  };

  const DisplaySignupPage = async () => {
    setShowSignup(true);
  };
  const DisplayLoginPage = async () => {
    setShowSignup(false);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/student/login", studentCredentials);
      setSuccessMessage("Logged In successfully!");
      setErrorMessage("");
      getTasks(); // Fetch tasks after successful login
    } catch (error) {
      // Handle login error
      setSuccessMessage(""); // Reset success message if it was set before
      setErrorMessage("Error while logging in. Please use right credentials.");
      console.error("Error during login:", error); // Log the error for debugging
      // Implement UI feedback for login error if needed
    }
  };

  const getTasks = async () => {
    try {
      const response = await api.get("/student/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      // Handle error fetching tasks
      console.error("Error fetching tasks:", error); // Log the error for debugging
      // Implement UI feedback for tasks fetching error if needed
    }
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      await api.post("/student/completeTask", { taskId, newStatus });
      // Update the tasks state or refetch tasks after a status change
      getTasks();
    } catch (error) {
      // Handle error changing task status
      console.error("Error changing task status:", error); // Log the error for debugging
      // Implement UI feedback for task status change error if needed
    }
  };

  useEffect(() => {
    // Fetch tasks when the component mounts
    getTasks();
  }, []);

  return (
    <>
      <div className="container mt-5">
        {successMessage.length !== 0 ? (
          <>
            <h2>Tasks</h2>
            {tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onStatusChange={handleTaskStatusChange}
              />
            ))}
          </>
        ) : (
          <>
            {showSignup ? (
               <div className="container mt-5">
          <h1 className="mb-4">Student Signup</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={newStudent.password}
              onChange={(e) =>
                setNewStudent({ ...newStudent, password: e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary" onClick={handleSignup}>
            Signup
          </button>
          {successMessage.length === 0 && (
            <div className="mt-3">
              <p>
                If you don't have an account,{" "}
                <button className="text-primary" onClick={DisplayLoginPage}>
                  Login Here
                </button>
              </p>
            </div>
          )}

          {/* Success pop-up */}
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
            ) : (
                 <div className="container mt-5">
          <h1 className="mb-4">Student Interface</h1>
          <div className="mb-3">
            <h2>Login</h2>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={studentCredentials.email}
                onChange={(e) =>
                  setStudentCredentials({
                    ...studentCredentials,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={studentCredentials.password}
                onChange={(e) =>
                  setStudentCredentials({
                    ...studentCredentials,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
            {/* Success pop-up */}
            {successMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {successMessage}
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </div>

          {successMessage.length === 0 && (
            <div className="mt-3">
              <p>
                If you don't have an account,{" "}
                <button className="text-primary" onClick={DisplaySignupPage}>
                  sign up here
                </button>
              </p>
            </div>
          )}
          
        </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default StudentInterface;
