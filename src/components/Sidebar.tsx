// import { Home, BarChart2, Users, Settings, HelpCircle } from 'lucide-react';
// import { Link } from 'react-router';

// const Sidebar = () => {
//   const menuItems = [
//     { icon: Home, label: 'Dashboard', to: '/' },
//     { icon: BarChart2, label: 'Analytics', to: '/upload' },
//     { icon: Users, label: 'Customers', to: '/login' },
//     { icon: Settings, label: 'Settings', to: '/upload' },
//     { icon: HelpCircle, label: 'Help', to: '/upload' },
//   ];

//   return (
//     <div className="flex h-screen w-16 flex-row md:flex-col items-center bg-blue-50 py-8">
//       {menuItems.map(({ icon: Icon, label, to }) => (
//         <Link
//           key={label}
//           to={to}
//           className="mb-4 rounded-lg p-3 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600"
//         >
//           <Icon className="h-6 w-6" />
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Sidebar;

import { Home, BarChart2, Users, Settings, HelpCircle, Upload } from 'lucide-react';
import { Link } from 'react-router';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', to: '/' },
    { icon: Upload, label: 'Upload', to: '/upload' },
    { icon: Users, label: 'Login', to: '/login' },
    { icon: Settings, label: 'Settings', to: '/upload' },
  ];

  return (
    <div>
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex h-screen w-20 flex-col items-center bg-blue-50 py-8">
        {menuItems.map(({ icon: Icon, label, to }) => (
          <Link
            key={label}
            to={to}
            className="mb-4 rounded-lg p-3 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600"
          >
            <Icon className="h-6 w-6 mx-auto" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>

      {/* Floating bottom nav for smaller screens */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around bg-blue-50 p-4 shadow-md">
        {menuItems.map(({ icon: Icon, label, to }) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center text-gray-600 transition-colors hover:text-blue-600"
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
