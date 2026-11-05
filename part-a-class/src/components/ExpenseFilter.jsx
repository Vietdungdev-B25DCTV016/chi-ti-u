import React, { Component } from 'react';
import { CATEGORIES } from '../utils/formatters';

/**
 * ExpenseFilter Component (Class Component)
 * Provides category filter buttons and search input.
 */
class ExpenseFilter extends Component {
  render() {
    const { selectedCategory, onSelectCategory, searchTerm, onSearchChange, categoryCounts } =
      this.props;

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
            <h3 className="filter-title">🔍 Lọc & Tìm Kiếm</h3>
            <span className="filter-subtitle">Phân loại các khoản chi của bạn</span>
          </div>

          <div className="search-box">
            <span className="search-icon">🔎</span>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm theo nội dung..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
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
  }
}

export default ExpenseFilter;
