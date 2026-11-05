import React from 'react';
import ExpenseItem from './ExpenseItem';
import { formatCurrency } from '../utils/formatters';

/**
 * ExpenseList Component (Function Component)
 * Handles loading, error states, and displays expense items and bottom total line.
 */
const ExpenseList = ({
  expenses,
  onDeleteExpense,
  selectedCategory,
  totalFilteredAmount,
  loading,
  error,
  onRetry,
  isUsingFallback,
}) => {
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

      {/* Thông báo trạng thái lỗi (Error state) */}
      {error && (
        <div className="error-banner">
          <div className="error-banner-content">
            <span className="error-banner-icon">⚠️</span>
            <div className="error-banner-text">
              <strong>Thông báo API:</strong> {error}
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-outline" onClick={onRetry}>
            🔄 Thử lại
          </button>
        </div>
      )}

      {/* Thông báo chế độ dự phòng bộ nhớ cục bộ */}
      {isUsingFallback && !error && (
        <div className="info-banner">
          <span>ℹ️ Đang hoạt động ở chế độ lưu trữ cục bộ (Local Cache Mode).</span>
        </div>
      )}

      {/* Trạng thái đang tải (Loading state) */}
      {loading && expenses.length === 0 ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p className="loading-text">Đang tải dữ liệu từ MockAPI...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📂</div>
          <h3 className="empty-state-title">Chưa có khoản chi nào</h3>
          <p className="empty-state-text">
            {selectedCategory !== 'All'
              ? `Không tìm thấy khoản chi nào thuộc loại "${selectedCategory}". Hãy thử đổi bộ lọc hoặc thêm khoản chi mới.`
              : 'Danh sách chi tiêu đang trống. Hãy nhập khoản chi ở form phía trên!'}
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

      {/* Dòng tổng tiền ở chân danh sách theo yêu cầu đề bài */}
      <div className="list-footer-total">
        <div className="footer-total-left">
          <span className="footer-total-badge">🔢 {expenses.length} khoản chi</span>
          <span className="footer-total-desc">
            {selectedCategory === 'All'
              ? 'Tổng tất cả chi tiêu'
              : `Tổng chi tiêu (${selectedCategory})`}
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
};

export default ExpenseList;
