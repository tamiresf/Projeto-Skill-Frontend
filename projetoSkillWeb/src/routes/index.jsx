import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// import useAuth from "../hooks/useAuth";
import Signin from "../pages/Signin";
import Signup from '../Signup';
import Home from '../pages/Home';


const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
   
        <Routes>
        <Route exact path="/home" element={<Private Item={Home} />} />
        <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
  );
};

export default RoutesApp;