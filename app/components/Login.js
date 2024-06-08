"use client"
import React, {
    useCallback,
    useMemo,
    useRef,
    useEffect,
    useState,
    StrictMode,
} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from "next/image";

function delay(){return new Promise((resolve) => setTimeout(resolve, 2000))}

export default function Login({children}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState();
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setLoading(true)
        const response = axios.post('/api/auth-login', {
            email,
            password,
        });
        response.then((e) => {
            console.log(e.data)
            setLoading(false)
            if (e.data.status === 200){
                router.push('/admin/dashboard');
            }
            else
            {
                setErrortext(e.data.message)
                setError(true);
            }
        })
        // Lakukan validasi email dan password di sini
        // Jika validasi berhasil, arahkan ke halaman dashboard
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900 bg-kominfo">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        {
                            error && (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">Login Gagal!</span> {errortext}.
                                </div>
                            )
                        }
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    className="border border-indigo-600 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Masukan email ..."
                                    required
                                    {...(loading ? { disabled: true } : { required: true })}
                                />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="border border-indigo-600 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukan Password"
                                    required
                                    {...(loading ? { disabled: true } : { required: true })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" disabled={loading} className="flex justify-items-center justify-center w-full text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {loading ? "Please Wait..." : "Sign in"}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}