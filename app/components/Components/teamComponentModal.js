"use client"
import React, {
    useCallback,
    useMemo,
    useRef,
    useEffect,
    useState,
    StrictMode,
} from "react";
import axios from 'axios';

import { motion } from 'framer-motion';
import InputForm from "../Input";
export default function TeamComponentModel({ onClick, data }){
    const [isOpen, setIsOpen] = useState(false);
    const [inputData, setInputData] = useState({});

    const handleInputChange = (label, value) => {
        console.log(label, value);
        setInputData((prevData) => ({
            ...prevData,
            [label]: value,
        }));
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSaveData = async () => {
        try {
            console.log(inputData)
            const response = await axios.post('/api/save-data', inputData);
            console.log('Data berhasil disimpan:', response.data);
            toggleModal();
            onClick();
            setTimeout(() => {
                setIsOpen(false);
            }, 300);
        } catch (error) {
            console.error('Terjadi kesalahan saat menyimpan data:', error);
        }
    };
    return (
        <div>
            <button className="text-sm readmore_text" onClick={toggleModal}>Tambah Data</button>
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
                        className="bg-white rounded-lg shadow-lg p-6 w-3/4 mx-auto z-10"
                    >
                        <h2 className="text-2xl font-bold mb-4">Input Data Modal</h2>
                        <div className="mb-2">
                            <div class="grid grid-cols-2 gap-4">
                                {data.map((input, index) => (
                                    <InputForm key={index} label={input.labels} placeholder={input.placeholder} icons={input.icons} onChange={(value) => handleInputChange(input.name, value)}/>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div>
                                <button
                                    className="px-4 py-2 mr-2 text-blue-500 rounded-md hover:bg-blue-600 hover:text-white border-[1px] border-blue-500"
                                    onClick={handleSaveData}
                                >
                                    Save Data
                                </button>
                                <button
                                    className="px-4 py-2 text-red-500 rounded-md hover:bg-red-600 hover:text-white border-[1px] border-red-500"
                                    onClick={() => {
                                        toggleModal();
                                        setTimeout(() => {
                                            setIsOpen(false);
                                        }, 300);
                                    }}
                                >
                                    Tutup Modal
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}