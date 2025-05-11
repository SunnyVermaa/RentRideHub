import React, {useState} from "react";
import { userLogin } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await userLogin({ email, password });
            // console.log(res);
            
            localStorage.setItem("token", res.data.token);
            alert("Login successfully");
            navigate("/users/profile");
          } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Login failed");
            navigate("/users/register");
          }
    }

    return(
        <>
        {/* <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" required minLength={5} className=""/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" required minLength={6}/>
        <button type="submit"> login </button>
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE1ZjM4YzE0M2M4Njc1NmEyZTMwNmEiLCJpYXQiOjE3NDYyNjkwODMsImV4cCI6MTc0NjM1NTQ4M30.kXoiigFthxA7Brmns8HrAb8NffLnWAw4W05Y04D0nD4"
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE1ZjM4YzE0M2M4Njc1NmEyZTMwNmEiLCJpYXQiOjE3NDYyNjkwNjgsImV4cCI6MTc0NjM1NTQ2OH0.grIz-XDPSLlndq3Vn-AhrNs5h9x_t5uvHzn6x3dzqK8"
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE1ZTI2MTE0M2M4Njc1NmEyZTMwNGYiLCJpYXQiOjE3NDY0MjU3NTIsImV4cCI6MTc0NjUxMjE1Mn0.dU3U0BhVL2TWkBtAhCQInVnu1f5BQo3EYce2RRec_VI"
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE1ZjM4YzE0M2M4Njc1NmEyZTMwNmEiLCJpYXQiOjE3NDY0MjU3MzQsImV4cCI6MTc0NjUxMjEzNH0.6HymZq-P62QTtfJ5BSgYKceqZ3STgHUMRjiw-fvVsWs"
        </form> */}

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          User Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength={5}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/users/register" className="text-purple-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>

        </>
    )
}