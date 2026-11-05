import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../utils/formatters';
import useDebounce from '../hooks/useDebounce';

/**
 * ExpenseFilter Component (Function Component)
 * Advanced requirement: Ô tìm kiếm có độ trễ (debounce bằng custom hook useDebounce).
 */
const ExpenseFilter = ({
  selectedCategory,
  onSelectCategory,
  onSearchChange,
  categoryCounts,
}) => {
  // Local state for immediate typing responsiveness
  const [searchInput, setSearchInput] = useState('');

  // Advanced requirement: Debounce search keyword with 400ms delay
  const debouncedSearchTerm = useDebounce(searchInput, 400);

  // Notify parent only when debounced value updates
  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const handleClearSearch = () => {
    setSearchInput('');
    onSearchChange('');
  };

  const filterOptions = [
    { id: 'All', label: 'Tất cả', icon: '📋' },
    ...Object.keys(CATEGORIES).map((key) => ({
      id: key,
      label: CATEGORIES[key].label,
      icon: CATEGORIES[key].icon,
    })),
  ];

  return (
    <div className="filter-section">
      <div className="filter-header">
        <div className="filter-title-group">
          <h3 className="filter-title">🔍 Lọc &amp; Tìm Kiếm (Debounce 400ms)</h3>
          <span className="filter-subtitle">
            {searchInput !== debouncedSearchTerm ? (
              <span className="debounce-indicator">⏳ Đang đợi gõ xong...</span>
            ) : (
              'Tìm kiếm mượt mà không gây lag'
            )}
          </span>
        </div>

        <div className="search-box">
          <span className="search-icon">🔎</span>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm theo nội dung (debounce)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClearSearch}
              title="Xóa tìm kiếm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filter-buttons">
        {filterOptions.map((option) => {
          const count = categoryCounts[option.id] || 0;
          const isActive = selectedCategory === option.id;
          return (
            <button
              key={option.id}
              type="button"
              className={`filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(option.id)}
            >
              <span className="filter-btn-icon">{option.icon}</span>
              <span className="filter-btn-label">{option.label}</span>
              <span className="filter-badge">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseFilter;
