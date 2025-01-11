import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SettingsTable from '../../components/settings/SettingsTable';
import SettingsForm from '../../components/settings/SettingsForm';
import { useSettingsData } from '../../hooks/settings/useSettingsData';
import {useTheme} from '../../contexts/ThemeContext';

function Categories() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { data, loading, addItem, updateItem, deleteItem } = useSettingsData('categories');
  const { theme } = useTheme();

  const fields = [
    { name: 'name', label: 'Category Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text' }
  ];

  const handleSubmit = async (formData: any) => {
    if (editingItem) {
      await updateItem(editingItem.id, formData);
    } else {
      await addItem(formData);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`${theme === 'dark' ? 'text-purple-200' : 'text-gray-900'} text-2xl font-semibold text-gray-900`}>Categories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </button>
      </div>

      <SettingsTable
        headers={['Name', 'Description']}
        data={data}
        onEdit={(item) => {
          setEditingItem(item);
          setShowForm(true);
        }}
        onDelete={(item) => deleteItem(item.id)}
      />

      {showForm && (
        <SettingsForm
          title={editingItem ? 'Edit Category' : 'Add Category'}
          fields={fields}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          initialData={editingItem}
        />
      )}
    </div>
  );
}

export default Categories;