// import React, { useState } from 'react';
// import { ProcessedForecasting } from '@/pages.tsx/Upload';


// interface ForecastingTableProps {
//     materials: ProcessedForecasting[];
// }

// const formatNumber = (value: number): string => {
//     return new Intl.NumberFormat('en-US', {
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0,
//     }).format(Math.round(value));
// };

// const ForecastingTable: React.FC<ForecastingTableProps> = ({ materials }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [entriesPerPage, setEntriesPerPage] = useState(20);

//     const totalPages = Math.ceil(materials.length / entriesPerPage);

//     const currentMaterials = materials.slice(
//         (currentPage - 1) * entriesPerPage,
//         currentPage * entriesPerPage
//     );

//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setEntriesPerPage(Number(e.target.value));
//         setCurrentPage(1); // Reset to the first page whenever entries per page changes
//     };

//     return (
//         <div className="overflow-x-auto">
//             <div className="mb-4 flex justify-between items-center">
//                 <div>
//                     <label htmlFor="entriesPerPage" className="text-sm font-medium text-gray-700 mr-2">
//                         Entries per page:
//                     </label>
//                     <select
//                         id="entriesPerPage"
//                         value={entriesPerPage}
//                         onChange={handleEntriesChange}
//                         className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value={10}>10</option>
//                         <option value={20}>20</option>
//                         <option value={30}>30</option>
//                         <option value={50}>50</option>
//                         <option value={100}>100</option>
//                     </select>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                     Showing {Math.min((currentPage - 1) * entriesPerPage + 1, materials.length)}-
//                     {Math.min(currentPage * entriesPerPage, materials.length)} of {materials.length} entries
//                 </div>
//             </div>

//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Material ID
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             AMS Material Description
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Month/Year
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Forecasting for next month
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Proposed Quantity for next 3 months
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             3 Month Average Consumption
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Proposed Quantity SAP
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {currentMaterials.map((material) => (
//                         <tr key={material.materialId} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 {material.materialId}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {material.description}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {material.monthYear}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {formatNumber(material.forecastingNextMonth)}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {/* {formatNumber(material.nextThreeMonths)} */}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {formatNumber(material.threeMonthsAvg)}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {/* {formatNumber(material.proposedQuantity)} */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="flex justify-between items-center mt-4">
//                 <button
//                     onClick={handlePrevious}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
//                 >
//                     Previous
//                 </button>
//                 <span className="text-sm text-gray-500">
//                     Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                     onClick={handleNext}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ForecastingTable;


import React, { useState } from 'react';
import { ProcessedForecasting } from '@/pages.tsx/Upload';

interface ForecastingTableProps {
    materials: ProcessedForecasting[];
}

const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Math.round(value));
};

const ForecastingTable: React.FC<ForecastingTableProps> = ({ materials }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(20);

    const totalPages = Math.ceil(materials.length / entriesPerPage);

    const currentMaterials = materials.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page whenever entries per page changes
    };

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <label htmlFor="entriesPerPage" className="text-sm font-medium text-gray-800 mr-2">
                        Entries per page:
                    </label>
                    <select
                        id="entriesPerPage"
                        value={entriesPerPage}
                        onChange={handleEntriesChange}
                        className="py-2 px-3 border bg-purple-200 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div className="text-sm font-medium text-gray-800">
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, materials.length)}-
                    {Math.min(currentPage * entriesPerPage, materials.length)} of {materials.length} entries
                </div>
            </div>

            <table className="min-w-full divide-y divide-purple-300">
                <thead className="bg-purple-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            Material ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            AMS Material Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            Month/Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            Forecasting for next month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            Proposed Quantity for next 3 months
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            3 Month Average Consumption
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            Proposed Quantity SAP
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-purple-300">
                    {currentMaterials.map((material) => (
                        <tr key={material.materialId} className="hover:bg-purple-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {material.materialId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                {material.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                {material.monthYear}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                {formatNumber(material.forecastingNextMonth)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                {/* {formatNumber(material.nextThreeMonths)} */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                {formatNumber(material.threeMonthsAvg)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                {/* {formatNumber(material.proposedQuantity)} */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-purple-300 font-medium text-purple-800 rounded-md hover:bg-purple-400 disabled:bg-purple-200"
                >
                    Previous
                </button>
                <span className="text-sm font-medium text-gray-800">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-purple-300 font-medium text-purple-800 rounded-md hover:bg-purple-400 disabled:bg-purple-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ForecastingTable;
