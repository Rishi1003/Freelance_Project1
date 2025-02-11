//@ts-nocheck

import axios from 'axios';

import { useState, ChangeEvent, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAppContext } from '@/AppContext';
import { useNavigate } from 'react-router';



const YourComponentWithForecasting = () => {

    const { setMaterialGRN, setForecastData, setMaterialCData } = useAppContext();

    const navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const startProcessing = async () => {
        try {
            setIsProcessing(true);
            const response = await axios.get('http://localhost:5000/upload-data');
            setIsProcessing(false);
            console.log(response.data);
        } catch (error: any) {
            console.error('Error processing files:', error);
            setErrorMessage(error.response.data.message);
        }
        finally {
            setIsProcessing(false);
        }
    }

    // useEffect to trigger file processing when all files are uploaded
    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess]);


    if (isProcessing) {
        return (
            <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
                <Sidebar />
                <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-700">Processing your files...</h2>
                </div>
            </div>
        )
    }

    if (errorMessage) {
        return (
            <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
                <Sidebar />
                <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
                    <h2 className="text-4xl font-semibold text-center text-red-600">Error processing files</h2>
                    <p className="text-7xl text-center text-red-600">{errorMessage}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
            <Sidebar />
            <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">

                <h2 className="text-2xl font-semibold text-center text-gray-700">Make sure your files are saved in the uploads folder</h2>
                <button onClick={() => startProcessing()} className='bg-blue-500 hover:bg-blue-700 mx-auto text-white font-bold py-2 px-4 rounded-lg'>Start Processing</button>

            </div>
        </div>
    );
};

export default YourComponentWithForecasting;
