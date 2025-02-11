//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import Sparkline from './Sparkline';
import { MaterialGRN } from '@/pages.tsx/Upload';

interface MaterialTableProps {
  materials: MaterialGRN[];
}

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
};

const MaterialTable: React.FC<MaterialTableProps> = ({ tableVisible, setTableVisible, totalItemsMaterial, fetchData, materials, currentPage = 1, setCurrentPage, entriesPerPage = 20, setEntriesPerPage, totalPages }) => {

  const [expandedMaterial, setExpandedMaterial] = useState<string | null>(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [entriesPerPage, setEntriesPerPage] = useState(20);

  // const totalPages = Math.ceil(materials.length / entriesPerPage);

  // const [tableVisible, setTableVisible] = useState<boolean>(true);

  const toggleTableVisibility = () => {
    setTableVisible(!tableVisible);
  };


  const currentMaterials = materials

  const toggleExpand = (materialId: string) => {
    setExpandedMaterial(expandedMaterial === materialId ? null : materialId);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page whenever entries per page is changed
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <button onClick={toggleTableVisibility} className="text-rose-600 hover:text-rose-800 flex items-center gap-1">
          <Eye className="h-5 w-5" />
          {tableVisible ? 'Hide Table' : 'Show Table'}
        </button>
        <div>
          <label htmlFor="entriesPerPage" className="text-sm font-medium text-gray-800 mr-2">
            Entries per page:
          </label>
          <select
            id="entriesPerPage"
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="py-2 px-3 border bg-rose-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="text-sm font-medium text-gray-800">
          Showing {currentPage * entriesPerPage - entriesPerPage + 1}-{currentPage * entriesPerPage} of {totalItemsMaterial} entries
        </div>
      </div>
      {tableVisible && (<>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-rose-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Consumption Trend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GRN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pending Purchase Order Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMaterials.map((material) => (
              <React.Fragment key={material.materialId}>
                <tr className={expandedMaterial === material.materialId ? 'bg-rose-100' : 'hover:bg-rose-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {material.materialId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {material.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Sparkline data={material.consumption.map(d => d.consumption)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {material.grnQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {material.stockQuantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {material.pendingQuantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {material.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <button
                      onClick={() => toggleExpand(material.materialId)}
                      className="text-rose-600 hover:text-rose-800 flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      {expandedMaterial === material.materialId ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedMaterial === material.materialId && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-rose-50">
                      <div className="ml-8">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-rose-100">
                            <tr>
                              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Month/Year
                              </th>
                              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Consumption
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {material.consumption.map((data, index) => (
                              <tr key={index} className="hover:bg-rose-50">
                                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                                  {data.monthYear}
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                                  {formatNumber(data.consumption)}
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
            className="px-4 py-2 bg-rose-300 font-medium text-rose-800 rounded-md hover:bg-rose-400 disabled:bg-rose-200"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-rose-300 font-medium text-rose-800 rounded-md hover:bg-rose-400 disabled:bg-rose-200"
          >
            Next
          </button>
        </div></>)}
    </div>
  );
};

export default MaterialTable;
