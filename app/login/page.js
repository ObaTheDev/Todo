'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setError("Please fill in all fields!");
            return;
        }
        // Handle form submission logic here
        console.log("Submitted:", { username, email, password });
        setError(null); // Clear any previous error messages
        router.push("/todo"); // Redirect to home page after successful submission
    };

    return (
        <div className='flex justify-center items-center text-center h-screen'>
            <div className="w-[50%] justify-center items-center flex h-[60%] py-4 m-auto text-center bg-blue-900 rounded-md">
                <div className="text-white">
                        {error && (
                            <div className="text-red-400 text-lg  text-center mb-8">
                            {error}
                            </div>
                        )}

                    <form
                        className="flex text-center flex-col gap-3"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-7 text-left">
                            <div>
                                <label className='mr-3' htmlFor="username">Username: </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Johnny"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-[300px] border border-slate-200 rounded-lg py-1 px-5 outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='mr-3'>Email Address:</label>
                                <input
                                    type="text"
                                    id="emailAddress"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="emailaddress@gmail.com"
                                    className="w-[300px] border border-slate-200 rounded-lg py-1 px-5 outline-none bg-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className='mr-3'>Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder=".........."
                                    className="w-[300px] border border-slate-200 rounded-lg py-1 px-5 outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                name ="submit
                                "
                                type="submit"
                                value="Submit"
                                className="px-6 border mt-5 bg-[#41404D] border-slate-200 rounded-lg py-3 outline-none cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
