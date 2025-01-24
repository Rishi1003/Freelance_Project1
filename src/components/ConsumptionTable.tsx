import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import Sparkline from './Sparkline';

interface Product {
  id: string;
  description: string;
  totalConsumption: number;
  maxConsumption: number;
  minConsumption: number;
  avgConsumption: number;
  monthlyData: {
    material_description: string;
    month: string;
    consumption: number;
    prediction: number;
  }[];
}

interface ConsumptionTableProps {
  products: Product[];
}

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
};

const ConsumptionTable: React.FC<ConsumptionTableProps> = ({ products }) => {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleExpand = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
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
              Total Consumption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max Consumption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min Consumption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Average Consumption
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trend
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <tr className={expandedProduct === product.id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNumber(product.totalConsumption)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNumber(product.maxConsumption)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNumber(product.minConsumption)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNumber(product.avgConsumption)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Sparkline data={product.monthlyData.map(d => d.consumption)} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => toggleExpand(product.id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    {expandedProduct === product.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </td>
              </tr>
              {expandedProduct === product.id && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 bg-gray-50">
                    <div className="ml-8">
                      <h4 className="font-medium text-gray-900 mb-2">{product.description}</h4>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Material Description
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Month and Year
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Consumption Quantity
                            </th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Next 3 Months Prediction
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {product.monthlyData.map((data, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {data.material_description}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {data.month}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500">
                                {formatNumber(data.consumption)}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500">
                                {formatNumber(data.prediction)}
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

export default ConsumptionTable;