"use client"
import Image from "next/image";
import Navbar from "../navbar";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CardTest from "../card";
import { useState } from 'react';
import { motion } from 'framer-motion';
export default function Homepage() {
    const [ref, inView] = useInView();
    const initialData = Array.from({ length: 28 }, (_, index) => ({
        nama: `User ${index + 1}`,
        umur: Math.floor(Math.random() * 50) + 20 // Umur acak antara 20 dan 70
    }));
    const [data, setData] = useState(initialData);
    useEffect(() => {
        if (inView)
        {
            const delay = setTimeout(() => {
                const dummyData = Array.from({ length: 20 }, (_, index) => ({
                    nama: `Dummy ${index + 1}`,
                    umur: Math.floor(Math.random() * 50) + 20 // Umur acak antara 20 dan 70
                }));
                setData([...data, ...dummyData]);
            }, 1000); // Penundaan 1 detik (1000 milidetik)

            // Membersihkan timeout jika komponen unmount sebelum penundaan selesai
            return () => clearTimeout(delay);
        }
    }, [inView])
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    return (
    <main className="min-h-screen">
        <Navbar/>
        <div className="p-2">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full grid grid-flow-row auto-rows-max">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                <div className="bg-white rounded-lg shadow-lg my-8">
                    <Image src="https://images8.alphacoders.com/136/1363709.png" alt="" className="rounded-t-lg w-full h-40 object-cover" width={800} height={200} />
                    <div className="p-6">
                        <h2 className="font-bold mb-2 text-2xl text-black-50">Card with an image</h2>
                        <p className="mb-2">This is a little bit better of a card!</p>
                        <a href="javascript:;" onClick={toggleModal} className="text-sm readmore_text">Read More 👉</a>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {data.map((item, index) => (
                        <CardTest key={index} nama={item.nama}/>
                    ))}
                    <div ref={ref} className="block col-span-full text-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        Loading..........
                    </div>
                </div>
                {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={toggleModal}
                    ></div>
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto z-10"
                    >
                        <h2 className="text-2xl font-bold mb-4">Judul Modal</h2>
                        <p className="mb-4">Ini adalah contoh konten dalam modal.</p>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                            onClick={() => {
                                toggleModal();
                                setTimeout(() => {
                                    setIsOpen(false);
                                }, 300);
                            }}
                        >
                            Tutup Modal
                        </button>
                    </motion.div>
                </motion.div>
                )}
            </div>
        </div>
    </main>);
}