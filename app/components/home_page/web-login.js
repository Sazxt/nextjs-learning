"use client"
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { abi } from '@/app/contract/artifacts/contracts/SimpleContract.sol/SimpleContract.json';

const contract_address = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d"

export default function Web3Login() {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [greeting, setGreeting] = useState('');
    const [newGreeting, setNewGreeting] = useState('');

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);


    const checkIfWalletIsConnected = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length > 0) {
                const account = accounts[0];
                console.log('Found an authorized account:', account);
                setAccount(account);
                connectToContract();
            } else {
                console.log('No authorized account found');
            }
        }
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                console.log('Connected to account:', account);
                setAccount(account);
                connectToContract();
            } catch (error) {
                console.error('Error connecting to metamask:', error);
            }
        } else {
            alert('Please install Metamask extension');
        }
    };

    const connectToContract = async () => {
        try {
            const provider = new Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(contract_address, abi, signer);
            setContract(contractInstance);
            console.log('Connected to contract');

            // Mendapatkan nilai greeting saat ini dari kontrak
            const currentGreeting = await contractInstance.getGreeting();
            setGreeting(currentGreeting);
        } catch (error) {
            console.error('Error connecting to contract:', error);
        }
    };

    const handleGreetingChange = (event) => {
        setNewGreeting(event.target.value);
    };

    const updateGreeting = async () => {
        if (contract) {
            try {
                const tx = await contract.setGreeting(newGreeting);
                await tx.wait();
                console.log('Greeting updated');
                setGreeting(newGreeting);
                setNewGreeting('');
            } catch (error) {
                console.error('Error updating greeting:', error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {account ? (
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-xl font-semibold mb-4">Connected to account: {account}</p>
                    {contract && (
                        <div>
                            <p className="text-lg mb-4">Current Greeting: {greeting}</p>
                            <input
                                type="text"
                                value={newGreeting}
                                onChange={handleGreetingChange}
                                placeholder="Enter new greeting"
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={updateGreeting}
                                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Update Greeting
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Connect Metamask
                </button>
            )}
        </div>
    );
}