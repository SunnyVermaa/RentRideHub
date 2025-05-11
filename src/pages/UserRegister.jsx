import react, {useState} from "react";
import { userRegister } from "../api/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserRegister() {

    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await userRegister({
                fullname:{
                    firstname,
                    lastname
                },
                email,
                password
            });

            const token = res.data.token;
            localStorage.setItem('token', token);
            alert("Register sucessfully");
            navigate('/users/login');
        } catch(err){
            console.log(err);
            alert(err.response?.data?.message || "registration fail")
            
        }

    }

    return(
        <>
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
                        Users Register
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                First Name
                            </label>
                            <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="firstname" minLength={3} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Last Name
                            </label>
                            <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="lastname" minLength={3} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Email
                            </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="captain@example.com" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" required minLength={6} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400" />
                        </div>
                        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-200" > Register as User</button>
                    </form>
                    <p className="text-sm text-center text-gray-500 mt-4">
          Have you already Signup?{" "}
          <a href="/users/login" className="text-purple-600 hover:underline">
            Login here
          </a>
        </p>
                </div>
            </div>
        </>
    )
}