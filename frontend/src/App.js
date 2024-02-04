//KINDLY DON'T TOUCH THIS ONE.
import { useEffect } from 'react';
import './App.css';
import Login from './Components/LoginFolder/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import Fill from './Components/Fill_The_Blanks/Fill';
import Match from './Components/Match_The_Following/Match';
import Select from './Components/Select_Option/Select';
import WebFont from "webfontloader"
import { isAuth } from './helpers/auth';



function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Inria Sans"]
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            (isAuth() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />)
          }
        />

        <Route path="/login"
          element={<Login />}
        />
        <Route path="/dashboard"
          element={<Dashboard />}
        />
        <Route path="/fill"
          element={<Fill />}
        />
        <Route path="/match"
          element={<Match />}
        />
        <Route path="/select"
          element={<Select />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
