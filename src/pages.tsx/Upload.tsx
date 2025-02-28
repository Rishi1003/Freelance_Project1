//@ts-nocheck

// import axios from 'axios';

// import { useState, ChangeEvent, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import { useAppContext } from '@/AppContext';
// import { useNavigate } from 'react-router';

// const backendurl = import.meta.env.VITE_BACKEND


// const YourComponentWithForecasting = () => {

//     const { setMaterialGRN, setForecastData, setMaterialCData } = useAppContext();

//     const navigate = useNavigate()

//     const [isProcessing, setIsProcessing] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);


//     const startProcessing = async () => {
//         try {
//             setIsProcessing(true);
//             const response = await axios.get(`${backendurl}/upload-data`, {
//                 headers: { "ngrok-skip-browser-warning": "true" }
//             });
//             setIsProcessing(false);
//             setIsSuccess(true)
//             console.log(response.data);
//         } catch (error: any) {
//             console.error('Error processing files:', error);
//             setErrorMessage(error.response.data.message);
//         }
//         finally {
//             setIsProcessing(false);
//         }
//     }

//     // useEffect to trigger file processing when all files are uploaded
//     useEffect(() => {
//         if (isSuccess) {
//             navigate('/');
//         }
//     }, [isSuccess]);


//     if (isProcessing) {
//         return (
//             <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
//                 <Sidebar />
//                 <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
//                     <h2 className="text-2xl font-semibold text-center text-gray-700">Processing your files...</h2>
//                 </div>
//             </div>
//         )
//     }

//     if (errorMessage) {
//         return (
//             <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
//                 <Sidebar />
//                 <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
//                     <h2 className="text-4xl font-semibold text-center text-red-600">Error processing files</h2>
//                     <p className="text-7xl text-center text-red-600">{errorMessage}</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
//             <Sidebar />
//             <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">

//                 <h2 className="text-2xl font-semibold text-center text-gray-700">Make sure your files are saved in the uploads folder</h2>
//                 <button onClick={() => startProcessing()} className='bg-blue-500 hover:bg-blue-700 mx-auto text-white font-bold py-2 px-4 rounded-lg'>Start Processing</button>

//             </div>
//         </div>
//     );
// };

// export default YourComponentWithForecasting;

// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import { useAppContext } from '@/AppContext';
// import { useNavigate } from 'react-router';

// const backendurl = import.meta.env.VITE_BACKEND;

// const YourComponentWithForecasting = () => {
//     const { setMaterialGRN, setForecastData, setMaterialCData } = useAppContext();
//     const navigate = useNavigate();

//     const [files, setFiles] = useState(null); // Store the selected files
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);

//     // Handle file selection
//     const handleFileChange = (event) => {
//         setFiles(event.target.files);
//     };

//     // Handle the upload
//     const handleUpload = async () => {
//         if (!files || files.length === 0) {
//             setErrorMessage("Please select files before uploading.");
//             return;
//         }

//         const formData = new FormData();
//         for (let i = 0; i < files.length; i++) {
//             formData.append("files", files[i]);
//         }

//         try {
//             setIsProcessing(true);
//             const response = await axios.post(`${backendurl}/upload`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     "ngrok-skip-browser-warning": "true"
//                 }
//             });
//             setIsProcessing(false);
//             setIsSuccess(true);
//             console.log(response.data);
//         } catch (error: any) {
//             setIsProcessing(false);
//             console.error('Error uploading files:', error);
//             setErrorMessage(error.response?.data?.error || 'Error uploading files');
//         }
//     };

//     // Redirect when upload is successful
//     useEffect(() => {
//         if (isSuccess) {
//             navigate('/');
//         }
//     }, [isSuccess]);

//     if (isProcessing) {
//         return (
//             <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
//                 <Sidebar />
//                 <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
//                     <h2 className="text-2xl font-semibold text-center text-gray-700">Processing your files...</h2>
//                 </div>
//             </div>
//         );
//     }

//     if (errorMessage) {
//         return (
//             <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
//                 <Sidebar />
//                 <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
//                     <h2 className="text-4xl font-semibold text-center text-red-600">Error uploading files</h2>
//                     <p className="text-7xl text-center text-red-600">{errorMessage}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
//             <Sidebar />
//             <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
//                 <h2 className="text-2xl font-semibold text-center text-gray-700">
//                     Make sure your files are saved in the uploads folder
//                 </h2>
//                 <div className="flex justify-center space-x-4">
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleFileChange}
//                         className="border p-2 rounded"
//                     />
//                     <button
//                         onClick={handleUpload}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
//                     >
//                         Start Processing
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default YourComponentWithForecasting;


import axios from 'axios';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAppContext } from '@/AppContext';
import { useNavigate } from 'react-router';

const backendurl = import.meta.env.VITE_BACKEND;

const YourComponentWithForecasting = () => {
    const { setMaterialGRN, setForecastData, setMaterialCData } = useAppContext();
    const navigate = useNavigate();

    const [files, setFiles] = useState(null); // Store the selected files
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handle file selection
    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    // Handle the upload
    const handleUpload = async () => {
        if (!files || files.length === 0) {
            setErrorMessage("Please select files before uploading.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        try {
            setIsProcessing(true);
            const response = await axios.post(`${backendurl}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "ngrok-skip-browser-warning": "true"
                }
            });

            console.log(response.data);

            // Now, trigger the additional API call to "/upload-data" after successful upload
            const dataResponse = await axios.get(`${backendurl}/upload-data`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });

            setIsProcessing(false);
            setIsSuccess(true);

            console.log('Upload Data Response:', dataResponse.data); // Handle the response from /upload-data endpoint

        } catch (error: any) {
            setIsProcessing(false);
            console.error('Error uploading files:', error);
            setErrorMessage(error.response?.data?.message || 'Failed uploading files');
        }
    };

    // Redirect when upload is successful
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
        );
    }

    if (errorMessage) {
        return (
            <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
                <Sidebar />
                <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
                    <h2 className="text-4xl font-semibold text-center text-red-600">Error</h2>
                    <p className="text-7xl text-center text-red-600">{errorMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
            <Sidebar />
            <div className="w-full flex-1 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Make sure your files are saved in the uploads folder
                </h2>
                <div className="flex justify-center space-x-4">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleUpload}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Start Processing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default YourComponentWithForecasting;
