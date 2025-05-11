import React,{useState, useEffect} from "react";
import { getProfile, userLogout } from "../api/user";
import {useNavigate} from 'react-router-dom'


export default function UserProfile() {
 const token = localStorage.getItem("userToken")
    const[ user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() =>{
        const fetchUser = async () =>{
        try{
        const res = await getProfile();
        setUser(res.data);
        // naviagate('users/profile')
        }catch (err){
        console.log(err);
        
        navigate('/users/login')
        };
    }
    fetchUser()
    }, [navigate])

    const handelRide = () =>{
        navigate('/users/ride')
    }

    const handleLogout = async () =>{
        await userLogout();
        localStorage.removeItem('token');
        navigate('/users/login')
    }

    if(!user) return  <div className="flex items-center justify-center h-screen">
    <p className="text-gray-500 text-lg">Loading...</p>
  </div>
    return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">User Profile</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 text-sm">Name</p>
            <p className="text-lg font-medium text-gray-900">{user.fullname?.firstname} {user.fullname?.lastname}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Email</p>
            <p className="text-lg font-medium text-gray-900">{user.email}</p>
          </div>
        </div>
        
        <button
          onClick={handelRide}
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          search for ride
        </button>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
        </>
    )
}