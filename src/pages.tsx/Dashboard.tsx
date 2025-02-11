
// import Sidebar from '../components/Sidebar';
// import ConsumptionTable from '../components/ConsumptionTable';
// import MaterialTable from '../components/MaterialTable';
// import ForecastingTable from '../components/ForecastingTable';
// import { useAppContext } from '@/AppContext';
// import { Link } from 'react-router';
// import Copyrights from '@/components/Copyrights';

// // import { TrendingUp, BarChart2, Clock8, Briefcase } from 'lucide-react';
// // import MetricCard from '../components/MetricCard';
// // import RadialProgress from '../components/RadialProgress';
// // import LineChart from '../components/LineChart';
// // import BarChart from '../components/BarChart';


// function Dashboard() {
//   const { materialCData, forecastData, materialGRN } = useAppContext();

//   if (materialCData === null && forecastData === null && materialGRN === null) {
//     return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
//         <p className="text-gray-600 mb-6">
//           Please upload your data to view the dashboard and gain insights.
//         </p>
//         <Link
//           to="/upload"
//           className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Upload Data
//         </Link>
//       </div>
//     </div>
//   }

//   return (
//     <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
//       <Sidebar />

//       <main className="flex-1 overflow-auto p-8 pb-0">
//         <div className="mb-8">
//           <h1 className="text-6xl font-mono font-bold text-gray-800">InvOp</h1>
//           <p className="text-gray-600 text-lg">Inventory Optimization</p>
//         </div>

//         {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//           <MetricCard
//             title="Total Count"
//             value="2,543"
//             icon={Briefcase}
//             color="bg-gradient-to-br from-[#24cbd4] to-[#2a64b5]"
//           />
//           <MetricCard
//             title="Total Value"
//             value="$54,239"
//             icon={BarChart2}
//             color="bg-gradient-to-br from-[#5e8dd2] to-[#724cbc]"
//           />

//           <MetricCard
//             title="High Variance Items"
//             value="15.3%"
//             icon={TrendingUp}
//             color="bg-gradient-to-br from-[#F06292] to-[#cf3a2e]"
//           />

//           <MetricCard
//             title="Average Lead Time"
//             value={"10" + " Days"}
//             icon={Clock8}
//             color="bg-gradient-to-br from-[#FFD54F] to-[#dd9731]"
//           />
//         </div> */}

//         {/* <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <div className="rounded-xl p-6 shadow-lg bg-white">
//             <h3 className="mb-4 text-lg font-semibold text-gray-800">Hight Value Items</h3>
//             <div className="flex items-center justify-center">
//               <RadialProgress value={75} color="text-blue-500" />
//             </div>
//           </div>

//           <div className="rounded-xl bg-white p-6 shadow-lg">
//             <h3 className="mb-4 text-lg font-semibold text-gray-800">Value Trend</h3>
//             <div className="h-64">
//               <LineChart
//                 labels={months}
//                 datasets={[
//                   {
//                     label: 'Dataset 1',
//                     data: [10, 100, 20, 300, 30],
//                     borderColor: '#3b82f6',
//                     backgroundColor: '#3b82f620',
//                   },
//                   {
//                     label: 'Dataset 2',
//                     data: [50, 200, 100, 400, 150],
//                     borderColor: '#ef4444',
//                     backgroundColor: '#ef444420',
//                   },
//                   {
//                     label: 'Dataset 3',
//                     data: [58, 20, 108, 300, 180],
//                     borderColor: '#4fb199',
//                     backgroundColor: '#4fb19920',
//                   },
//                 ]}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <div className="rounded-xl bg-white p-6 shadow-lg">
//             <h3 className="mb-4 text-lg font-semibold text-gray-800">Volume Trend</h3>
//             <div className="h-64">
//               <LineChart
//                 labels={months}
//                 datasets={[
//                   {
//                     label: 'Dataset 1',
//                     data: [10, 100, 20, 300, 30],
//                     borderColor: '#3b82f6',
//                     backgroundColor: '#3b82f620',
//                   },
//                   {
//                     label: 'Dataset 2',
//                     data: [50, 200, 100, 400, 150],
//                     borderColor: '#ef4444',
//                     backgroundColor: '#ef444420',
//                   },
//                   {
//                     label: 'Dataset 3',
//                     data: [58, 20, 108, 300, 180],
//                     borderColor: '#4fb199',
//                     backgroundColor: '#4fb19920',
//                   },
//                 ]}
//               />
//             </div>
//           </div>

//           <div className="rounded-xl bg-white p-6 shadow-lg">
//             <h3 className="mb-4 text-lg font-semibold text-gray-800">Monthly Count</h3>
//             <div className="h-64">
//               <BarChart
//                 labels={["A", "B", "C"]}
//                 datasets={[
//                   {
//                     label: 'Dataset 1',
//                     data: [10, 20, 30, 40, 50],
//                     backgroundColor: '#f59e0b',
//                   },
//                   {
//                     label: 'Dataset 2',
//                     data: [15, 25, 35, 45, 55],
//                     backgroundColor: '#3b82f6',
//                   },
//                 ]}
//               />
//             </div>
//           </div>
//         </div> */}

//         <div className="mt-8">
//           <div className="rounded-xl bg-orange-300 p-6 shadow-lg">
//             <h3 className="mb-4 text-lg font-semibold text-gray-800">Material Consumption</h3>
//             <ConsumptionTable products={materialCData} />
//           </div>
//         </div>

//         <div className="mt-8">
//           <div className="rounded-xl bg-purple-300 p-6 shadow-lg">
//             <h3 className="mb-4 text-lg font-semibold text-gray-800 capitalize">Forecasting of material</h3>
//             <ForecastingTable materials={forecastData} />
//           </div>
//         </div>

//         <div className="mt-8">
//           <div className="rounded-xl bg-rose-300 p-6 shadow-lg">
//             <h3 className="mb-4 text-lg font-semibold text-gray-800">Material Consumption & GRN</h3>
//             <MaterialTable materials={materialGRN} />
//           </div>
//         </div>


//         <Copyrights />
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

//@ts-nocheck

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useAppContext } from '@/AppContext';
import Sidebar from '../components/Sidebar';
import ConsumptionTable from '../components/ConsumptionTable';
import MaterialTable from '../components/MaterialTable';
import ForecastingTable from '../components/ForecastingTable';
import { Link } from 'react-router';
import Copyrights from '@/components/Copyrights';

const backendurl = import.meta.env.VITE_BACKEND

function Dashboard() {
  const { materialCData, forecastData, materialGRN, setMaterialCData, setForecastData, setMaterialGRN } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);


  const [currentPageMaterial, setCurrentPageMaterial] = useState(1);
  const [entriesPerPageMaterial, setEntriesPerPageMaterial] = useState(10);
  const [totalPagesMaterial, setTotalPagesMaterial] = useState(1);
  const [totalItemsMaterial, setTotalItemsMaterial] = useState(0);

  const [currentPageForecast, setCurrentPageForecast] = useState(1);
  const [entriesPerPageForecast, setEntriesPerPageForecast] = useState(10);
  const [totalPagesForecast, setTotalPagesForecast] = useState(1);
  const [totalItemsForecast, setTotalItemsForecast] = useState(0);

  const [currentPageConsumption, setCurrentPageConsumption] = useState(1);
  const [entriesPerPageConsumption, setEntriesPerPageConsumption] = useState(10);
  const [totalPagesConsumption, setTotalPagesConsumption] = useState(1);
  const [totalItemsConsumption, setTotalItemsConsumption] = useState(0);

  const [tableVisibleConsumption, setTableVisibleConsumption] = useState<boolean>(false);
  const [tableVisibleForecast, setTableVisibleForecast] = useState<boolean>(false);
  const [tableVisibleMaterial, setTableVisibleMaterial] = useState<boolean>(false);



  const fetchData = async () => {
    try {
      console.log('fetchData');

      setIsLoading(true);


      const { data: data1 } = await axios.get(`${backendurl}/consumption-table`, {
        params: { page: currentPageConsumption, itemsPerPage: entriesPerPageConsumption },
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      setMaterialCData(data1.data);
      setTotalItemsConsumption(data1.totalItems);
      setTotalPagesConsumption(data1.totalPages);


      const { data: data2 } = await axios.get(`${backendurl}/forecast-table`, {
        params: { page: currentPageForecast, itemsPerPage: entriesPerPageForecast },
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      setTotalItemsForecast(data2.totalItems);
      setTotalPagesForecast(data2.totalPages);
      setForecastData(data2.data);


      const { data: data3 } = await axios.get(`${backendurl}/material-summary`, {
        params: { page: currentPageMaterial, itemsPerPage: entriesPerPageMaterial },
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      setTotalItemsMaterial(data3.totalItems);
      setTotalPagesMaterial(data3.totalPages);
      const updatedGRN = data3.data
        .map(item => ({
          ...item,
          supplier: item.supplier ? item.supplier.match(/\b\d+\b/g)?.join(", ") || "N/A" : "N/A" // Handle null or undefined cases
        }));

      setMaterialGRN(updatedGRN);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPageMaterial, entriesPerPageMaterial, currentPageForecast, entriesPerPageForecast, currentPageConsumption, entriesPerPageConsumption]);



  if (isLoading) {
    return (
      <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
        <Sidebar />

        <main className="flex-1 overflow-auto p-8 pb-0">
          <div className="mb-8">
            <h1 className="text-6xl font-mono font-bold text-gray-800">InvOp</h1>
            <p className="text-gray-600 text-lg">Inventory Optimization</p>
          </div>

          <h1>Loading...</h1>
        </main>
      </div>
    );
  }

  if (materialCData == null || forecastData == null || materialGRN == null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">
            Start the process in the uploads page.
          </p>
          <Link
            to="/upload"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go to Uploads
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="flex h-screen bg-gradient-to-tl from-white to-[#bfe3fc]">
      <Sidebar />

      <main className="flex-1 overflow-auto p-8 pb-0">
        <div className="mb-8">
          <h1 className="text-6xl font-mono font-bold text-gray-800">InvOp</h1>
          <p className="text-gray-600 text-lg">Inventory Optimization</p>
        </div>

        <div className="mt-8">
          <div className="rounded-xl bg-orange-300 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Material Consumption</h3>
            <ConsumptionTable tableVisible={tableVisibleConsumption} setTableVisible={setTableVisibleConsumption} products={materialCData} totalItemsConsumption={totalItemsConsumption} currentPage={currentPageConsumption} setCurrentPage={setCurrentPageConsumption} entriesPerPage={entriesPerPageConsumption} setEntriesPerPage={setEntriesPerPageConsumption} totalPages={totalPagesConsumption} />
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-xl bg-purple-300 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 capitalize">Forecasting of material</h3>
            <ForecastingTable tableVisible={tableVisibleForecast} setTableVisible={setTableVisibleForecast} materials={forecastData} totalItemsForecast={totalItemsForecast} currentPage={currentPageForecast} setCurrentPage={setCurrentPageForecast} entriesPerPage={entriesPerPageForecast} setEntriesPerPage={setEntriesPerPageForecast} totalPages={totalPagesForecast} />
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-xl bg-rose-300 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Material Consumption & GRN</h3>
            <MaterialTable tableVisible={tableVisibleMaterial} setTableVisible={setTableVisibleMaterial} fetchData={fetchData} totalItemsMaterial={totalItemsMaterial} materials={materialGRN} currentPage={currentPageMaterial} setCurrentPage={setCurrentPageMaterial} entriesPerPage={entriesPerPageMaterial} setEntriesPerPage={setEntriesPerPageMaterial} totalPages={totalPagesMaterial} />
          </div>
        </div>

        <Copyrights />
      </main>
    </div >
  );
}

export default Dashboard;
