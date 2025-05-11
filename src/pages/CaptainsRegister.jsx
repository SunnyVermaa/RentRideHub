import React, { useState } from "react";
import { captainRegister } from "../api/captains";
import { useNavigate } from "react-router-dom";

export default function CaptainsRegister() {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [color, setColor] = useState('')
    const [plate, setPlate] = useState('')
    const [capacity, setCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('car', 'auto', 'motercycle')

    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await captainRegister({
                fullname: {
                    firstname,
                    lastname
                },
                email,
                password,
                vehicle: {
                    color,
                    plate,
                    capacity,
                    vehicleType
                }

            });
            const token = res.data.token;
            localStorage.setItem('token', token);
            alert('register sucessfully')
            navigate('/captains/login')
        }
        catch (err) {
            console.log(err);
            alert(err.response?.data?.message || 'registration unsucessfully')

        }
    }


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                        Captain Login
                    </h2>
                    <form onSubmit={handelSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                First Name
                            </label>
                            <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="firstname" minLength={3} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Last Name
                            </label>
                            <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="lastname" minLength={3} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Email
                            </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="captain@example.com" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" required minLength={6} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Vehical color
                            </label>
                            <input value={color} onChange={(e) => setColor(e.target.value)} type="text" placeholder="color" required minLength={3} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" /></div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Number plate
                            </label>
                            <input value={plate} onChange={(e) => setPlate(e.target.value)} type="text" placeholder="UP 54 4573" required minLength={3} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Capacity
                            </label>
                            <input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" placeholder="capacity" min={1} max={9} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" /></div>
                        <div>
                            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className=" w-full py-3 border border-gray-300 rounded  text-gray-700 hover:border-blue-500 focus:outline-none">
                                <option value='car'>Car</option>
                                <option value='auto'>Auto</option>
                                <option value='motorcycle'>Motorcycle</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200" > Register as Captains</button>
                    </form>
                    <p className="text-sm text-center text-gray-500 mt-4">
                    Have you already Signup?{" "}
          <a href="/captains/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
                </div>
            </div>
        </>
    )
}