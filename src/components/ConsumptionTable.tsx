// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
// import Sparkline from './Sparkline';
// import { ProcessedMaterial } from '@/pages.tsx/Upload';


// interface ConsumptionTableProps {
//   products: ProcessedMaterial[];
// }

// const formatNumber = (value: number): string => {
//   return new Intl.NumberFormat('en-US', {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(Math.round(value));
// };

// const ConsumptionTable: React.FC<ConsumptionTableProps> = ({ products }) => {
//   const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(20);

//   const totalPages = Math.ceil(products.length / entriesPerPage);

//   const currentProducts = products.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const toggleExpand = (productId: string) => {
//     setExpandedProduct(expandedProduct === productId ? null : productId);
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setEntriesPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to the first page whenever entries per page is changed
//   };

//   return (
//     <div className="overflow-x-auto">
//       <div className="mb-4 flex justify-between items-center">
//         <div>
//           <label htmlFor="entriesPerPage" className="text-sm font-medium text-gray-700 mr-2">
//             Entries per page:
//           </label>
//           <select
//             id="entriesPerPage"
//             value={entriesPerPage}
//             onChange={handleEntriesChange}
//             className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={30}>30</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//         </div>
//         <div className="text-sm text-gray-500">
//           Showing {Math.min((currentPage - 1) * entriesPerPage + 1, products.length)}-
//           {Math.min(currentPage * entriesPerPage, products.length)} of {products.length} entries
//         </div>
//       </div>

//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Material ID
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Total Consumption
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Max Consumption
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Min Consumption
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Average Consumption
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Trend
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               View
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentProducts.map((product) => (
//             <React.Fragment key={product.materialId}>
//               <tr className={expandedProduct === product.materialId ? 'bg-blue-50' : 'hover:bg-gray-50'}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {product.materialId}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {formatNumber(product.totalConsumption)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {formatNumber(product.maxConsumption)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {formatNumber(product.minConsumption)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {formatNumber(product.averageConsumption)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <Sparkline data={product.details.map(d => d.quantity)} />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <button
//                     onClick={() => toggleExpand(product.materialId)}
//                     className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                   >
//                     <Eye className="h-4 w-4" />
//                     {expandedProduct === product.materialId ? (
//                       <ChevronUp className="h-4 w-4" />
//                     ) : (
//                       <ChevronDown className="h-4 w-4" />
//                     )}
//                   </button>
//                 </td>
//               </tr>
//               {expandedProduct === product.materialId && (
//                 <tr>
//                   <td colSpan={7} className="px-6 py-4 bg-gray-50">
//                     <div className="ml-8">
//                       <h4 className="font-medium text-gray-900 mb-2">{product.materialId}</h4>
//                       <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-100">
//                           <tr>
//                             <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Material Description
//                             </th>
//                             <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Month and Year
//                             </th>
//                             <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Consumption Quantity
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {product.details.map((data, index) => (
//                             <tr key={index} className="hover:bg-gray-50">
//                               <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
//                                 {data.description}
//                               </td>
//                               <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
//                                 {data.monthYear}
//                               </td>
//                               <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500">
//                                 {formatNumber(data.quantity)}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={handlePrevious}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
//         >
//           Previous
//         </button>
//         <span className="text-sm text-gray-500">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ConsumptionTable;

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import Sparkline from './Sparkline';
import { ProcessedMaterial } from '@/pages.tsx/Upload';

interface ConsumptionTableProps {
  products: ProcessedMaterial[];
}

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
};

const ConsumptionTable: React.FC<ConsumptionTableProps> = ({ products }) => {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(20);

  const totalPages = Math.ceil(products.length / entriesPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const toggleExpand = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

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
    setCurrentPage(1); // Reset to the first page whenever entries per page is changed
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
            className="py-2 px-3 border bg-orange-200 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="text-sm font-medium text-gray-800">
          Showing {Math.min((currentPage - 1) * entriesPerPage + 1, products.length)}-
          {Math.min(currentPage * entriesPerPage, products.length)} of {products.length} entries
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 border border-orange-300">
        <thead className="bg-orange-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
              Material ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
              Total Consumption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
              Max Consumption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
              Min Consumption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
              Average Consumption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
              Trend
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
              View
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentProducts.map((product) => (
            <React.Fragment key={product.materialId}>
              <tr className={expandedProduct === product.materialId ? 'bg-orange-50' : 'hover:bg-orange-100'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.materialId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-800">
                  {formatNumber(product.totalConsumption)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-800">
                  {formatNumber(product.maxConsumption)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-800">
                  {formatNumber(product.minConsumption)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-800">
                  {formatNumber(product.averageConsumption)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Sparkline data={product.details.map((d) => d.quantity)} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => toggleExpand(product.materialId)}
                    className="text-orange-600 hover:text-orange-800 flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    {expandedProduct === product.materialId ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </td>
              </tr>
              {expandedProduct === product.materialId && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 bg-orange-50">
                    <div className="ml-8">
                      <h4 className="font-medium text-gray-900 mb-2">{product.materialId}</h4>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-orange-100">
                          <tr>
                            <th className="px-6 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                              Material Description
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                              Month and Year
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                              Consumption Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {product.details.map((data, index) => (
                            <tr key={index} className="hover:bg-orange-100">
                              <td className="px-6 py-2 whitespace-nowrap font-medium text-sm text-gray-800">
                                {data.description}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap font-medium text-sm text-gray-800">
                                {data.monthYear}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap font-medium text-sm text-center text-gray-800">
                                {formatNumber(data.quantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-orange-300 font-medium text-orange-800 rounded-md hover:bg-orange-400 disabled:bg-orange-200"
        >
          Previous
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-orange-300 font-medium text-orange-800 rounded-md hover:bg-orange-400 disabled:bg-orange-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ConsumptionTable;
