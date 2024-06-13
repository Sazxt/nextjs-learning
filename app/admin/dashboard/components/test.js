"use client"

import { Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuotes, setLoading } from '@/app/store/features/quotesSlice';
export default function Testadmin() {
    const dispatch = useDispatch();
    const { quotes, isLoading } = useSelector((state) => state.quotes);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await axios.get('https://raw.githubusercontent.com/Ovi/DummyJSON/master/raw/quotes/quotes.json');
                dispatch(setQuotes(response.data.slice(0, 10)));
                dispatch(setLoading(false));
            } catch (error) {
                dispatch(setLoading(false));
                console.error('Error fetching data:', error);
            }
        };
        if (isLoading)
        {
            fetchData();
        }
    }, []);
    return (
        <div className="mx-auto py-6 sm:px-6 lg:px-8">
            <div className="w-full py-6">
                <div className="border-4 border-dashed border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                        {isLoading ? (
                            <Skeleton />
                        ) : quotes.length === 0 ? (
                            <p>No data available</p>
                        ) : (
                            quotes.slice(0, 10).map((quote, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                    <p className="text-lg font-semibold mb-4">{quote.quote}</p>
                                    <p className="text-gray-600">{quote.author}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}