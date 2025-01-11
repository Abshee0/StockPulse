import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SettingsTable from '../../components/settings/SettingsTable';
import SettingsForm from '../../components/settings/SettingsForm';
import { useUsers } from '../../hooks/useUsers';
import {useTheme} from '../../contexts/ThemeContext';

function UserRoles() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { users, isLoading, updateUserRole } = useUsers();
  const { theme } = useTheme();

  const fields = [
    { 
      name: 'role', 
      label: 'Role', 
      type: 'select', 
      options: [
        { value: 'staff', label: 'Staff' },
        { value: 'manager', label: 'Manager' },
        { value: 'admin', label: 'Admin' }
      ],
      required: true 
    }
  ];

  const handleSubmit = async (formData: any) => {
    if (editingItem) {
      await updateUserRole(editingItem.id, formData.role);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`${theme === 'dark' ? 'text-purple-200' : 'text-gray-900'} text-2xl font-semibold text-gray-900`}>User Roles</h1>
      </div>

      <SettingsTable
        headers={['Email', 'Role']}
        data={users.map(user => ({
          id: user.id,
          name: user.email,
          description: user.role
        }))}
        onEdit={(item) => {
          setEditingItem(item);
          setShowForm(true);
        }}
        onDelete={() => {}} // User deletion not supported
      />

      {showForm && (
        <SettingsForm
          title="Edit User Role"
          fields={fields}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          initialData={editingItem ? { role: editingItem.description } : null}
        />
      )}
    </div>
  );
}

export default UserRoles;