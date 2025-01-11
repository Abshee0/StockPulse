import React from 'react';
import { Search } from 'lucide-react';
import { InventoryFilters as FilterType } from '../../types/inventory';
import { useCategories } from '../../hooks/useCategories';
import { useBrands } from '../../hooks/useBrands';
import { useLocations } from '../../hooks/useLocations';
import {useTheme} from '../../contexts/ThemeContext'

interface Props {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
}

function InventoryFilters({ filters, onFilterChange }: Props) {
  const { categories } = useCategories();
  const { brands } = useBrands();
  const { locations } = useLocations();

  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-[#1A1025] text-purple-200' : 'bg-white'} p-4 rounded-lg shadow space-y-4`}>
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-1 top-1 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className={`pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${theme === 'dark' ? 'bg-[#1A1025] text-purple-200' : 'bg-white'}`}
          />
        </div>
        
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className={`rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${theme === 'dark' ? 'bg-[#1A1025] text-purple-200' : 'bg-white'}`}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <select
          value={filters.brand}
          onChange={(e) => onFilterChange({ ...filters, brand: e.target.value })}
          className={`rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-[#1A1025] text-purple-200' : 'bg-white'}`}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>

        <select
          value={filters.location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          className={`rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-[#1A1025] text-purple-200' : 'bg-white'}`}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InventoryFilters;