import React,{useState} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
import CaptainsRegister from "./pages/CaptainsRegister";
import CaptainsLogin from "./pages/CaptainsLogin";
import CaptainsProfile from "./pages/CaptainsProfile";
import LocationSearch from "./components/LocationSearch";
// import RideSection from "./components/RideSection";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Header from './components/Header/Header'
import UserRide from "./components/UserRide";
import CaptainRide from "./components/CaptainRide";
import Footer from "./components/Footer/Footer";



function App(){
  const location = useLocation();
  const currentPath = location.pathname;

    const showFooterPaths = [
    "/users/register",
    "/users/login",
    "/users/profile",
    "/captains/register",
    "/captains/login",
    "/captains/profile"
  ];

   const showFooter = showFooterPaths.includes(currentPath);

  return (
    <>
    <Header/>
  <Routes>

    <Route path="/" element={<Home/>} />
    <Route path="/users/register" element={<UserRegister/>}/>
    <Route path="/users/login" element={<UserLogin/>}/>
    <Route path="/users/profile" element={<UserProfile/>}/>
    <Route path="/captains/register" element={<CaptainsRegister/>}/>
    <Route path="/captains/login" element={<CaptainsLogin/>}/>
    <Route path="/captains/profile" element={<CaptainsProfile/>}/>
    <Route path="/users/ride"element={<LocationSearch role="user" />}/>
    {/* <Route path="/location" element={<LocationSearch/>}/> */}
    <Route path="/captains/ride" element={<CaptainRide />}/>
    
  </Routes>
{showFooter && <Footer />}
    </>
  )
}

export default App;