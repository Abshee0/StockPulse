import React from 'react';
import StockSummary from '../components/dashboard/StockSummary';
import RecentActivity from '../components/dashboard/RecentActivity';
import LowStockAlert from '../components/dashboard/LowStockAlert';
import ExpiringItems from '../components/dashboard/ExpiringItems';
import { useTheme } from '../contexts/ThemeContext';

function Dashboard() {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-6">
      <h1 className={`${theme === 'dark' ? 'text-purple-200' : 'text-gray-900'} text-2xl font-semibold`}>Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StockSummary />
        <LowStockAlert />
        <ExpiringItems />
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;