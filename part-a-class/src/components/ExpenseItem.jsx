import React, { Component } from 'react';
import { formatCurrency, formatDate, CATEGORIES } from '../utils/formatters';

/**
 * ExpenseItem Component (Class Component)
 * Represents a single expense row with delete confirmation.
 */
class ExpenseItem extends Component {
  handleDelete = () => {
    const { expense, onDelete } = this.props;
    const confirmMessage = `Bạn có chắc chắn muốn xóa khoản chi:\n"${expense.title}" - ${formatCurrency(expense.amount)} không?`;
    if (window.confirm(confirmMessage)) {
      onDelete(expense.id);
    }
  };

  render() {
    const { expense } = this.props;
    const categoryInfo = CATEGORIES[expense.category] || {
      icon: '🏷️',
      label: expense.category,
      color: '#64748b',
      bgColor: '#f1f5f9',
      borderColor: '#cbd5e1',
    };

    return (
      <li className="expense-item">
        <div className="expense-item-left">
          <div
            className="expense-category-icon-wrapper"
            style={{ backgroundColor: categoryInfo.bgColor, borderColor: categoryInfo.borderColor }}
            title={categoryInfo.label}
          >
            <span className="expense-category-emoji">{categoryInfo.icon}</span>
          </div>

          <div className="expense-item-details">
            <h4 className="expense-item-title">{expense.title}</h4>
            <div className="expense-item-meta">
              <span
                className="expense-badge"
                style={{
                  backgroundColor: categoryInfo.bgColor,
                  color: categoryInfo.color,
                  borderColor: categoryInfo.borderColor,
                }}
              >
                {categoryInfo.icon} {categoryInfo.label}
              </span>
              <span className="expense-date">
                📅 {formatDate(expense.date)}
              </span>
            </div>
          </div>
        </div>

        <div className="expense-item-right">
          <span className="expense-amount">{formatCurrency(expense.amount)}</span>
          <button
            type="button"
            className="btn-delete"
            onClick={this.handleDelete}
            title="Xóa khoản chi này"
            aria-label={`Xóa ${expense.title}`}
          >
            <span className="delete-icon">🗑️</span>
            <span className="delete-text">Xóa</span>
          </button>
        </div>
      </li>
    );
  }
}

export default ExpenseItem;
