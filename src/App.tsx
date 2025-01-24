import React from 'react';
import { TrendingUp, BarChart2, Clock8, Briefcase } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';
import RadialProgress from './components/RadialProgress';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import ConsumptionTable from './components/ConsumptionTable';
import MaterialTable from './components/MaterialTable';
import ForecastingTable from './components/ForecastingTable';

// Sample data for charts
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// Sample data for consumption table
const sampleProducts = [
  {
    id: 'PRD001',
    description: 'Product Alpha',
    totalConsumption: 1234.56,
    maxConsumption: 150.00,
    minConsumption: 80.00,
    avgConsumption: 102.88,
    monthlyData: [
      { material_description: "some material", month: 'Jan 2024', consumption: 75.20, prediction: 82 },
      { material_description: "some material", month: 'Feb 2024', consumption: 82.40, prediction: 85 },
      { material_description: "some material", month: 'Apr 2024', consumption: 85.60, prediction: 89 },
      { material_description: "some material", month: 'Mar 2024', consumption: 78.90, prediction: 50 },
      { material_description: "some material", month: 'May 2024', consumption: 90.30, prediction: 90 },
      { material_description: "some material", month: 'Jun 2024', consumption: 95.70, prediction: 76 },
      { material_description: "some material", month: 'Jul 2024', consumption: 100.40, prediction: 82 },
      { material_description: "some material", month: 'Aug 2024', consumption: 105.20, prediction: 83 },
      { material_description: "some material", month: 'Sep 2024', consumption: 110.50, prediction: 85 },
      { material_description: "some material", month: 'Oct 2024', consumption: 115.80, prediction: 87 },
      { material_description: "some material", month: 'Nov 2024', consumption: 118.90, prediction: 84 },
      { material_description: "some material", month: 'Dec 2024', consumption: 120.00, prediction: 83 }
    ]
  },
  {
    id: 'PRD002',
    description: 'Product Beta',
    totalConsumption: 987.65,
    maxConsumption: 120.00,
    minConsumption: 60.00,
    avgConsumption: 82.30,
    monthlyData: [
      { material_description: "some material", month: 'Jan 2024', consumption: 75.20, prediction: 82 },
      { material_description: "some material", month: 'Feb 2024', consumption: 82.40, prediction: 85 },
      { material_description: "some material", month: 'Apr 2024', consumption: 85.60, prediction: 89 },
      { material_description: "some material", month: 'Mar 2024', consumption: 78.90, prediction: 50 },
      { material_description: "some material", month: 'May 2024', consumption: 90.30, prediction: 90 },
      { material_description: "some material", month: 'Jun 2024', consumption: 95.70, prediction: 76 },
      { material_description: "some material", month: 'Jul 2024', consumption: 100.40, prediction: 82 },
      { material_description: "some material", month: 'Aug 2024', consumption: 105.20, prediction: 83 },
      { material_description: "some material", month: 'Sep 2024', consumption: 110.50, prediction: 85 },
      { material_description: "some material", month: 'Oct 2024', consumption: 115.80, prediction: 87 },
      { material_description: "some material", month: 'Nov 2024', consumption: 118.90, prediction: 84 },
      { material_description: "some material", month: 'Dec 2024', consumption: 120.00, prediction: 83 }
    ]
  }
];

// Sample data for material table
const sampleMaterials = [
  {
    id: 'MAT001',
    description: 'Raw Material X',
    ppo_details: "Pending",
    supplier: "Supplier A",
    monthlyData: [
      { month: 'Jan 2024', consumption: 85.50, grn: 90.00 },
      { month: 'Feb 2024', consumption: 92.30, grn: 95.50 },
      { month: 'Mar 2024', consumption: 88.70, grn: 92.00 },
      { month: 'Apr 2024', consumption: 95.40, grn: 98.30 },
      { month: 'May 2024', consumption: 100.20, grn: 105.00 },
      { month: 'Jun 2024', consumption: 105.80, grn: 108.50 },
      { month: 'Jul 2024', consumption: 110.50, grn: 115.00 },
      { month: 'Aug 2024', consumption: 115.30, grn: 118.70 },
      { month: 'Sep 2024', consumption: 120.70, grn: 125.00 },
      { month: 'Oct 2024', consumption: 125.90, grn: 130.00 },
      { month: 'Nov 2024', consumption: 132.40, grn: 135.50 },
      { month: 'Dec 2024', consumption: 140.00, grn: 145.00 }
    ]
  },
  {
    id: 'MAT002',
    description: 'Raw Material Y',
    ppo_details: "Completed",
    supplier: "Supplier B",
    monthlyData: [
      { month: 'Jan 2024', consumption: 65.20, grn: 70.00 },
      { month: 'Feb 2024', consumption: 72.40, grn: 75.50 },
      { month: 'Mar 2024', consumption: 68.90, grn: 72.00 },
      { month: 'Apr 2024', consumption: 75.60, grn: 78.30 },
      { month: 'May 2024', consumption: 80.30, grn: 85.00 },
      { month: 'Jun 2024', consumption: 85.70, grn: 88.50 },
      { month: 'Jul 2024', consumption: 90.40, grn: 95.00 },
      { month: 'Aug 2024', consumption: 95.20, grn: 98.70 },
      { month: 'Sep 2024', consumption: 100.50, grn: 105.00 },
      { month: 'Oct 2024', consumption: 105.80, grn: 110.00 },
      { month: 'Nov 2024', consumption: 108.90, grn: 115.50 },
      { month: 'Dec 2024', consumption: 110.00, grn: 115.00 }
    ]
  }
];

const sampleForecasting = [
  {
    "id": "MAT001",
    "description": "Steel Rods",
    "month": "January/2025",
    "avg_consumption": 120,
    "forecasting": 130,
    "next_three_months": 120,
    "proposed_quantity": 120
  },
  {
    "id": "MAT002",
    "description": "Copper Sheets",
    "month": "January/2025",
    "avg_consumption": 90,
    "forecasting": 100,
    "next_three_months": 120,
    "proposed_quantity": 110
  },
  {
    "id": "MAT003",
    "description": "Aluminum Pipes",
    "month": "January/2025",
    "avg_consumption": 70,
    "forecasting": 75,
    "next_three_months": 120,
    "proposed_quantity": 100
  },
  {
    "id": "MAT004",
    "description": "Plastic Granules",
    "month": "January/2025",
    "avg_consumption": 150,
    "forecasting": 160,
    "next_three_months": 120,
    "proposed_quantity": 80
  }
];

function App() {
  return (
    <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
      <Sidebar />

      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Consumption Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Count"
            value="2,543"
            icon={Briefcase}
            color="bg-gradient-to-br from-[#24cbd4] to-[#2a64b5]"
          />
          <MetricCard
            title="Total Value"
            value="$54,239"
            icon={BarChart2}
            color="bg-gradient-to-br from-[#5e8dd2] to-[#724cbc]"
          />

          <MetricCard
            title="High Variance Items"
            value="15.3%"
            icon={TrendingUp}
            color="bg-gradient-to-br from-[#F06292] to-[#cf3a2e]"
          />

          <MetricCard
            title="Average Lead Time"
            value={"10" + " Days"}
            icon={Clock8}
            color="bg-gradient-to-br from-[#FFD54F] to-[#dd9731]"
          />
        </div> */}

        {/* <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl p-6 shadow-lg bg-white">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Hight Value Items</h3>
            <div className="flex items-center justify-center">
              <RadialProgress value={75} color="text-blue-500" />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Value Trend</h3>
            <div className="h-64">
              <LineChart
                labels={months}
                datasets={[
                  {
                    label: 'Dataset 1',
                    data: [10, 100, 20, 300, 30],
                    borderColor: '#3b82f6',
                    backgroundColor: '#3b82f620',
                  },
                  {
                    label: 'Dataset 2',
                    data: [50, 200, 100, 400, 150],
                    borderColor: '#ef4444',
                    backgroundColor: '#ef444420',
                  },
                  {
                    label: 'Dataset 3',
                    data: [58, 20, 108, 300, 180],
                    borderColor: '#4fb199',
                    backgroundColor: '#4fb19920',
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Volume Trend</h3>
            <div className="h-64">
              <LineChart
                labels={months}
                datasets={[
                  {
                    label: 'Dataset 1',
                    data: [10, 100, 20, 300, 30],
                    borderColor: '#3b82f6',
                    backgroundColor: '#3b82f620',
                  },
                  {
                    label: 'Dataset 2',
                    data: [50, 200, 100, 400, 150],
                    borderColor: '#ef4444',
                    backgroundColor: '#ef444420',
                  },
                  {
                    label: 'Dataset 3',
                    data: [58, 20, 108, 300, 180],
                    borderColor: '#4fb199',
                    backgroundColor: '#4fb19920',
                  },
                ]}
              />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Monthly Count</h3>
            <div className="h-64">
              <BarChart
                labels={["A", "B", "C"]}
                datasets={[
                  {
                    label: 'Dataset 1',
                    data: [10, 20, 30, 40, 50],
                    backgroundColor: '#f59e0b',
                  },
                  {
                    label: 'Dataset 2',
                    data: [15, 25, 35, 45, 55],
                    backgroundColor: '#3b82f6',
                  },
                ]}
              />
            </div>
          </div>
        </div> */}

        <div className="mt-8">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Material Consumption</h3>
            <ConsumptionTable products={sampleProducts} />
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 capitalize">Forecasting of material</h3>
            <ForecastingTable materials={sampleForecasting} />
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Material Consumption & GRN</h3>
            <MaterialTable materials={sampleMaterials} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;