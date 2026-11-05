import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem';
import { formatCurrency } from '../utils/formatters';

/**
 * ExpenseList Component (Class Component)
 * Renders the list of filtered expenses and bottom total bar.
 */
class ExpenseList extends Component {
  render() {
    const { expenses, onDeleteExpense, selectedCategory, totalFilteredAmount } = this.props;

    return (
      <div className="card list-card">
        <div className="card-header list-card-header">
          <div>
            <h2 className="card-title">
              <span className="card-title-icon">📝</span> Danh Sách Khoản Chi
            </h2>
            <span className="card-subtitle">
              Đang hiển thị {expenses.length} khoản chi{' '}
              {selectedCategory !== 'All' ? `thuộc loại "${selectedCategory}"` : ''}
            </span>
          </div>

          <div className="list-header-total">
            <span className="list-header-total-label">Tổng hiển thị:</span>
            <span className="list-header-total-value">
              {formatCurrency(totalFilteredAmount)}
            </span>
          </div>
        </div>

        {expenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📂</div>
            <h3 className="empty-state-title">Chưa có khoản chi nào</h3>
            <p className="empty-state-text">
              {selectedCategory !== 'All'
                ? `Không có khoản chi nào thuộc loại "${selectedCategory}". Hãy thêm khoản chi mới hoặc chọn loại khác.`
                : 'Bạn chưa có khoản chi nào trong danh sách. Hãy thêm khoản chi đầu tiên ở form bên trên!'}
            </p>
          </div>
        ) : (
          <ul className="expense-list">
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={onDeleteExpense}
              />
            ))}
          </ul>
        )}

        {/* Dòng tổng tiền ở cuối danh sách theo yêu cầu đề bài */}
        <div className="list-footer-total">
          <div className="footer-total-left">
            <span className="footer-total-badge">🔢 {expenses.length} khoản chi</span>
            <span className="footer-total-desc">
              {selectedCategory === 'All' ? 'Tổng tất cả chi tiêu' : `Tổng chi tiêu (${selectedCategory})`}
            </span>
          </div>
          <div className="footer-total-right">
            <span className="footer-total-label">TỔNG TIỀN:</span>
            <span className="footer-total-amount">
              {formatCurrency(totalFilteredAmount)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpenseList;
