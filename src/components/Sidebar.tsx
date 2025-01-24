import React from 'react';
import { Home, BarChart2, Users, Settings, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Users, label: 'Customers' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="flex h-screen w-16 flex-col items-center bg-blue-50 py-8">
      {menuItems.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="mb-4 rounded-lg p-3 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600"
          title={label}
        >
          <Icon className="h-6 w-6" />
        </button>
      ))}
    </div>
  );
}

export default Sidebar;