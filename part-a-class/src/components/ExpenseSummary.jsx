import React, { Component } from 'react';
import { formatCurrency, CATEGORIES } from '../utils/formatters';

/**
 * ExpenseSummary Component (Class Component)
 * Advanced requirement: Statistics breakdown by category with percentage bars.
 */
class ExpenseSummary extends Component {
  render() {
    const { allExpenses } = this.props;

    const totalOverall = allExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const categoryStats = Object.keys(CATEGORIES).map((catName) => {
      const items = allExpenses.filter((item) => item.category === catName);
      const sum = items.reduce((total, item) => total + (Number(item.amount) || 0), 0);
      const percentage = totalOverall > 0 ? Math.round((sum / totalOverall) * 100) : 0;
      return {
        category: catName,
        meta: CATEGORIES[catName],
        count: items.length,
        totalAmount: sum,
        percentage,
      };
    });

    return (
      <div className="card summary-card">
        <div className="summary-header">
          <div>
            <h3 className="summary-title">📊 Thống Kê Chi Tiêu Theo Loại</h3>
            <span className="summary-subtitle">Phân tích dòng tiền thực tế theo từng danh mục</span>
          </div>
          <div className="summary-grand-total">
            <span className="summary-grand-total-label">Tổng chi tiêu toàn bộ:</span>
            <span className="summary-grand-total-value">{formatCurrency(totalOverall)}</span>
          </div>
        </div>

        <div className="summary-grid">
          {categoryStats.map((stat) => (
            <div
              key={stat.category}
              className="summary-item"
              style={{ borderLeftColor: stat.meta.color }}
            >
              <div className="summary-item-header">
                <span className="summary-item-name">
                  {stat.meta.icon} {stat.category}
                </span>
                <span className="summary-item-count">{stat.count} khoản</span>
              </div>

              <div className="summary-item-body">
                <span className="summary-item-amount" style={{ color: stat.meta.color }}>
                  {formatCurrency(stat.totalAmount)}
                </span>
                <span className="summary-item-percent">{stat.percentage}%</span>
              </div>

              {/* Progress bar */}
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.meta.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ExpenseSummary;
