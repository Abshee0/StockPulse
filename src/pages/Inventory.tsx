import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryFilters from '../components/inventory/InventoryFilters';
import InventoryTable from '../components/inventory/InventoryTable';
import EditItemModal from '../components/inventory/EditItemModal';
import { useInventory } from '../hooks/useInventory';
import { useTheme } from '../contexts/ThemeContext';
import { InventoryItem } from '../types/inventory';

function Inventory() {
  const { theme } = useTheme();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { 
    items,
    filters,
    setFilters,
    sorting,
    setSorting,
    pagination,
    setPagination,
    isLoading 
  } = useInventory();

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`${theme === 'dark' ? 'text-purple-200' : 'text-gray-900'} text-2xl font-semibold`}>Inventory</h1>
        <button
          onClick={() => navigate('/inventory/add')}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Add New Item
        </button>
      </div>

      <InventoryFilters filters={filters} onFilterChange={setFilters} />
      
      <InventoryTable
        items={items}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
        onEdit={handleEdit}  // Pass the handleEdit function to the table so you can edit an item
      />

      {isModalOpen && selectedItem && (
        <EditItemModal
          item={selectedItem}
          onClose={closeModal}
          onSave={() => {
            closeModal();
            // Additional save handling if needed, such as refetching data or updating state
          }}
        />
      )}
    </div>
  );
}

export default Inventory;
