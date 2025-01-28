
import Sidebar from '../components/Sidebar';
import ConsumptionTable from '../components/ConsumptionTable';
import MaterialTable from '../components/MaterialTable';
import ForecastingTable from '../components/ForecastingTable';
import { useAppContext } from '@/AppContext';
import { Link } from 'react-router';
import Copyrights from '@/components/Copyrights';

// import { TrendingUp, BarChart2, Clock8, Briefcase } from 'lucide-react';
// import MetricCard from '../components/MetricCard';
// import RadialProgress from '../components/RadialProgress';
// import LineChart from '../components/LineChart';
// import BarChart from '../components/BarChart';


function Dashboard() {
  const { materialCData, forecastData, materialGRN } = useAppContext();

  if (materialCData === null && forecastData === null && materialGRN === null) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
        <p className="text-gray-600 mb-6">
          Please upload your data to view the dashboard and gain insights.
        </p>
        <Link
          to="/upload"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Data
        </Link>
      </div>
    </div>
  }

  return (
    <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
      <Sidebar />

      <main className="flex-1 overflow-auto p-8 pb-0">
        <div className="mb-8">
          <h1 className="text-6xl font-mono font-bold text-gray-800">InvOp</h1>
          <p className="text-gray-600 text-lg">Inventory Optimization</p>
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
          <div className="rounded-xl bg-orange-300 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Material Consumption</h3>
            <ConsumptionTable products={materialCData} />
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-xl bg-purple-300 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 capitalize">Forecasting of material</h3>
            <ForecastingTable materials={forecastData} />
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-xl bg-rose-300 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Material Consumption & GRN</h3>
            <MaterialTable materials={materialGRN} />
          </div>
        </div>


        <Copyrights />
      </main>
    </div>
  );
}

export default Dashboard;