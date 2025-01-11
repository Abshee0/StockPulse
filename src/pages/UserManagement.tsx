import React from 'react';
import { useUsers } from '../hooks/useUsers';
import {useTheme} from '../contexts/ThemeContext'

function UserManagement() {
  const { users, isLoading, updateUserRole } = useUsers();
  const { theme } = useTheme();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className={`${theme === 'dark' ? 'text-purple-200' : 'text-gray-900'} text-2xl font-semibold text-gray-900`}>User Management</h1>
      
      <div className={`${theme === 'dark' ? 'bg-[#1A1025] text-purple-200' : 'bg-white'} shadow rounded-lg overflow-hidden`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${theme === 'dark' ? 'bg-[#190a29] text-purple-100' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className={`${theme === 'dark' ? 'bg-[#1A1025] text-purple-200 divide-[#2D1F3F]' : 'bg-white divide-gray-200'} divide-y `}>
            {users.map((user) => (
              <tr key={user.id}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-purple-200' : 'text-gray-900'}`}>{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className={`${theme === 'dark' ? 'bg-[#1A1025] text-purple-200 hover:text-purple-600' : 'bg-white'} rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                  >
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {/* Implement password reset */}}
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;