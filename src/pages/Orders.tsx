import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { supabase } from '../lib/supabase';
import CreateOrderForm from '../components/orders/CreateOrderForm';
import { useTheme } from '../contexts/ThemeContext';

function Orders() {
  const { orders, isLoading, refetchOrders, markOrderAsReceived } = useOrders();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { theme } = useTheme();

  const handleReceiveOrder = async (orderId: string) => {
    try {
      await markOrderAsReceived(orderId);
    } catch (error) {
      console.error('Error receiving order:', error);
      // You might want to add proper error handling/notification here
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`${theme === 'dark' ? 'text-purple-200' : 'text-gray-900'} text-2xl font-semibold text-gray-900`}>Orders</h1>
        <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Order
          </button>
      </div>
        
        
      
      <div className={`${theme === 'dark' ? 'text-purple-200 bg-[#1A1025]' : 'text-gray-900 bg-white'} shadow rounded-lg overflow-hidden`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${theme === 'dark' ? 'bg-[#190a29] text-purple-100' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Placed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Received</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className={`${theme === 'dark' ? 'bg-[#1A1025] text-purple-200 divide-[#2D1F3F]' : 'bg-white divide-gray-200'} divide-y `}>
            {orders.map((order) => (
              <tr key={order.id} className={`${theme === 'dark' ? 'hover:bg-[#2D1F3F]' : 'hover:bg-gray-50'} `}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm  ${theme === 'dark' ? 'text-purple-200' : 'text-gray-900'}`}>{order.item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.qty_ordered}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.order_placed_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.order_received_date || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'received' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleReceiveOrder(order.id)}
                      className="flex items-center text-green-600 hover:text-green-900"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Mark Received
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateForm && (
        <CreateOrderForm
          onClose={() => setShowCreateForm(false)}
          onOrderCreated={refetchOrders}
        />
      )}
    </div>
  );
}

export default Orders;