import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import Sparkline from './Sparkline';

interface MaterialData {
  id: string;
  description: string;
  ppo_details: string;
  supplier: string;
  monthlyData: {
    month: string;
    consumption: number;
    grn: number;
  }[];
}

interface MaterialTableProps {
  materials: MaterialData[];
}

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
};

const MaterialTable: React.FC<MaterialTableProps> = ({ materials }) => {
  const [expandedMaterial, setExpandedMaterial] = useState<string | null>(null);

  const toggleExpand = (materialId: string) => {
    setExpandedMaterial(expandedMaterial === materialId ? null : materialId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
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
              GRN Trend
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pending Purchase Order Details
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
          {materials.map((material) => (
            <React.Fragment key={material.id}>
              <tr className={expandedMaterial === material.id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {material.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {material.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Sparkline data={material.monthlyData.map(d => d.consumption)} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Sparkline data={material.monthlyData.map(d => d.grn)} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {material.ppo_details}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {material.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => toggleExpand(material.id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    {expandedMaterial === material.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </td>
              </tr>
              {expandedMaterial === material.id && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 bg-gray-50">
                    <div className="ml-8">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Month/Year
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Consumption
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              GRN
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {material.monthlyData.map((data, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {data.month}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {formatNumber(data.consumption)}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {formatNumber(data.grn)}
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
    </div>
  );
};

export default MaterialTable;