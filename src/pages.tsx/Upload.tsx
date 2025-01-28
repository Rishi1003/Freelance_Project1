import { useState, ChangeEvent, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAppContext } from '@/AppContext';
import Papa from 'papaparse';
import { useNavigate } from 'react-router';


type CSVData = Record<string, string | number>;

// Function to process Forecasting CSV data
interface ForecastingRow extends CSVData {
    'MATERIAL ID': string;
    DESCRIPTION: string;
    'MONTH/YEAR': string;
    'FORECASTING FOR NEXT MONTH': string;
}

export interface ProcessedForecasting {
    materialId: string;
    description: string;
    monthYear: string;
    threeMonthsAvg: number;
    forecastingNextMonth: number;
}

interface ConsumptionRow extends CSVData {
    Time_Id: string;
    'Material ID': string;
    Material_Description: string;
    Consumed_Quantity: string;
}

interface TimeMasterRow extends CSVData {
    Month: string;
    Year: string;
    Time_Id: string;
}

interface TimeInfo {
    month: string;
    year: number;
}

interface ConsumptionDetail {
    monthYear: string;
    quantity: number;
    description: string;
}

interface MaterialGroup {
    materialId: string;
    description: string;
    consumptions: ConsumptionDetail[];
}

export interface ProcessedMaterial {
    materialId: string;
    totalConsumption: number;
    maxConsumption: number;
    minConsumption: number;
    averageConsumption: number;
    details: {
        description: string;
        monthYear: string;
        quantity: number;
    }[];
}

type TimeMap = {
    [key: string]: TimeInfo; // Use string as the key type for Time_Id
};

type MaterialMap = {
    [key: string]: MaterialGroup; // Use string as the key type for Material ID
};


export interface MaterialGRN {
    materialId: string;
    description: string;
    consumption: {
        monthYear: string;
        consumption: number;
    }[];
}

export const processForecastingData = (
    forecastingData: ForecastingRow[],
    processedMaterialC: ProcessedMaterial[]
): ProcessedForecasting[] => {

    return forecastingData.map(row => {

        let threeMonthAvg = 0;

        const index = processedMaterialC.findIndex(item => item.materialId === row['MATERIAL ID']);

        if (index >= 0) {

            const threeMonthQuants = processedMaterialC[index].details.slice(-3).map(item => item.quantity);
            threeMonthAvg = Math.round(threeMonthQuants.reduce((sum, q) => sum + q, 0) / threeMonthQuants.length);

        }



        return ({
            materialId: row['MATERIAL ID'],
            description: row.DESCRIPTION,
            monthYear: row['MONTH/YEAR'],
            threeMonthsAvg: threeMonthAvg,
            forecastingNextMonth: parseInt(row['FORECASTING FOR NEXT MONTH'], 10),
        })
    });
};

export const parseCSVFile = async <T extends CSVData>(file: Blob): Promise<T[]> => {
    return new Promise<T[]>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            try {
                const text: string = event.target?.result as string;
                const { data } = Papa.parse<T>(text, {
                    header: true, // Automatically treat the first row as headers
                    skipEmptyLines: true, // Ignore empty rows
                    dynamicTyping: true, // Automatically convert numbers, booleans, etc.
                });
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error: ProgressEvent<FileReader>) => reject(error);
        reader.readAsText(file);
    });
};

export const processMaterialCData = (
    consumptionData: ConsumptionRow[],
    timeMasterData: TimeMasterRow[]
): ProcessedMaterial[] => {
    // Create a map of Time_Id to Month/Year for easier lookup
    const timeMap: TimeMap = timeMasterData.reduce((acc: TimeMap, row) => {

        if (Number(row.Year) >= 2024) {
            acc[row.Time_Id] = {
                month: row.Month,
                year: Number(row.Year), // Ensure year is a number
            };
        }

        return acc;
    }, {});

    // Group consumption data by Material ID
    const groupedData: MaterialMap = consumptionData.reduce((acc: MaterialMap, row) => {
        const materialId = row['Material ID']; // Ensure Material ID is treated as a string
        if (!acc[materialId]) {
            acc[materialId] = {
                materialId,
                description: row.Material_Description,
                consumptions: [],
            };
        }


        // Add consumption data with corresponding month and year
        const timeInfo = timeMap[row["Time Id"]];
        if (timeInfo) {
            acc[materialId].consumptions.push({
                monthYear: `${timeInfo.month} ${timeInfo.year}`,
                quantity: parseInt(row.Consumed_Quantity, 10), // Parse string to number
                description: row.Material_Description,
            });
        }

        return acc;
    }, {});


    const temp = Object.values(groupedData)
        .map((material): ProcessedMaterial | undefined => {
            const quantities = material.consumptions.map((c) => Number(c.quantity));

            if (quantities.length !== 0) {
                return {
                    materialId: material.materialId,
                    totalConsumption: quantities.reduce((sum, q) => sum + q, 0),
                    maxConsumption: Math.max(...quantities),
                    minConsumption: Math.min(...quantities),
                    averageConsumption: Math.round(
                        quantities.reduce((sum, q) => sum + q, 0) / quantities.length
                    ),
                    details: material.consumptions.map((c) => ({
                        description: c.description,
                        monthYear: c.monthYear,
                        quantity: c.quantity,
                    })),
                };
            }

            return undefined;
        })
        .filter((item): item is ProcessedMaterial => item !== undefined);


    // Calculate statistics for each material
    return temp;
};

export const materialGRN = (processedData: ProcessedMaterial[]): MaterialGRN[] => {
    return processedData.map(material => ({
        materialId: material.materialId,
        description: material.details[0]?.description || '',  // Use the description from the first detail item
        consumption: material.details.map(detail => ({
            monthYear: detail.monthYear,
            consumption: detail.quantity,  // Return the consumption quantity for each month
        })),
    }));
};


const YourComponentWithForecasting = () => {

    const { setMaterialGRN, setForecastData, setMaterialCData } = useAppContext();

    const navigate = useNavigate()

    const [step, setStep] = useState(1);
    const [consumptionFile, setConsumptionFile] = useState<File | null>(null);
    const [timeMasterFile, setTimeMasterFile] = useState<File | null>(null);
    const [forecastingFile, setForecastingFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // useEffect to trigger file processing when all files are uploaded
    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess]);

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        if (step === 1) {
            setConsumptionFile(files[0]);
            setStep(2); // Move to next step
            console.log('Material Consumption file uploaded:', files[0]);
        } else if (step === 2) {
            setTimeMasterFile(files[0]);
            setStep(3); // Move to next step
            console.log('Time Master file uploaded:', files[0]);
        } else if (step === 3) {
            setForecastingFile(files[0]);
            setStep(4); // Move to success step
            console.log('Forecasting file uploaded:', files[0]);
        }
    };

    // useEffect to trigger file processing when all files are uploaded
    useEffect(() => {
        if (step === 4 && consumptionFile && timeMasterFile && forecastingFile) {
            processFiles();
        }
    }, [step, consumptionFile, timeMasterFile, forecastingFile]); // Runs when all files are uploaded

    const processFiles = async () => {
        // Ensure all files are present before processing
        if (!consumptionFile || !timeMasterFile || !forecastingFile) {
            console.error("Missing files, cannot process.");
            setErrorMessage('Please upload all three files.');
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null); // Reset error message before processing

        try {
            console.log('Starting file processing...');
            const consumptionData = await parseCSVFile<ConsumptionRow>(consumptionFile);
            const timeMasterData = await parseCSVFile<TimeMasterRow>(timeMasterFile);
            const forecastingData = await parseCSVFile<ForecastingRow>(forecastingFile);

            // Log the parsed data to ensure they're correct
            console.log('Parsed Material Consumption Data:', consumptionData);
            console.log('Parsed Time Master Data:', timeMasterData);
            console.log('Parsed Forecasting Data:', forecastingData);

            const processedData = processMaterialCData(consumptionData, timeMasterData);
            const processedForecastingData = processForecastingData(forecastingData, processedData);
            const material = materialGRN(processedData);

            setMaterialGRN(material);
            setForecastData(processedForecastingData);
            setMaterialCData(processedData);
            console.log('Processed Data:', processedData);
            console.log('Processed Forecasting Data:', processedForecastingData);
            console.log('Material GRN:', material);

            setIsSuccess(true);


        } catch (error) {
            console.error('Error processing CSV files:', error);
            setErrorMessage('An error occurred while processing the files. Please try again.');
            setIsSuccess(false);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
            <Sidebar />
            <div className="w-full flex-1 mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Upload Your Files</h2>
                <div className="text-center text-sm text-gray-500">
                    <p>Step {step} of 3</p>
                </div>

                <div className='max-w-3xl mx-auto'>
                    {/* File Upload for Material Consumption */}
                    {step === 1 && (
                        <div className="p-6 bg-blue-50 rounded-lg shadow-md border border-blue-100">
                            <h3 className="text-lg font-semibold text-gray-700">Material Consumption (CSV)</h3>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="mt-4 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 hover:bg-gray-100 file:cursor-pointer file:px-6 file:py-2 file:text-sm file:font-medium file:bg-indigo-600 file:text-white file:rounded-md file:hover:bg-indigo-700"
                            />

                            <p className="mt-2 text-sm text-gray-600">Please upload the material consumption CSV file.</p>
                        </div>
                    )}

                    {/* File Upload for Time Master */}
                    {step === 2 && (
                        <div className="p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-100">
                            <h3 className="text-lg font-semibold text-gray-700">Time Master (CSV)</h3>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="mt-4 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 hover:bg-gray-100 file:cursor-pointer file:px-6 file:py-2 file:text-sm file:font-medium file:bg-indigo-600 file:text-white file:rounded-md file:hover:bg-indigo-700"
                            />

                            <p className="mt-2 text-sm text-gray-600">Now, upload the time master CSV file.</p>
                        </div>
                    )}

                    {/* File Upload for Forecasting */}
                    {step === 3 && (
                        <div className="p-6 bg-green-50 rounded-lg shadow-md border border-green-100">
                            <h3 className="text-lg font-semibold text-gray-700">Forecasting (CSV)</h3>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="mt-4 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 hover:bg-gray-100 file:cursor-pointer file:px-6 file:py-2 file:text-sm file:font-medium file:bg-indigo-600 file:text-white file:rounded-md file:hover:bg-indigo-700"
                            />

                            <p className="mt-2 text-sm text-gray-600">Finally, upload the forecasting CSV file.</p>
                        </div>
                    )}

                    {/* Loading or Success Message */}
                    {isProcessing && (
                        <div className="text-center p-6 bg-yellow-100 rounded-lg shadow-md border border-yellow-300">
                            <p className="text-xl font-semibold text-yellow-700">Processing your files...</p>
                        </div>
                    )}

                    {isSuccess && !isProcessing && (
                        <div className="text-center p-6 bg-green-100 rounded-lg shadow-md border border-green-300">
                            <p className="text-xl font-semibold text-green-700">Files successfully uploaded and processed!</p>
                            <p className="text-sm text-gray-600">Your data has been processed and is ready for use.</p>
                        </div>
                    )}

                    {/* Error Handling */}
                    {errorMessage && !isProcessing && !isSuccess && (
                        <div className="text-center p-6 bg-red-100 rounded-lg shadow-md border border-red-300">
                            <p className="text-xl font-semibold text-red-700">{errorMessage}</p>
                            <p className="text-sm text-gray-600">Please try again after checking your files.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YourComponentWithForecasting;
