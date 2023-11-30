import React from 'react';
import AdminPanel from './components/AdminPanel';
import StudentInterface from './components/StudentInterface';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/admin" element={<AdminPanel />} />
        <Route exact path="/student" element={<StudentInterface/>} />
      </Routes>
    </Router>
  );
}

export default App;
