import React, { Component } from 'react';
import { CATEGORY_LIST } from '../utils/formatters';

/**
 * ExpenseForm Component (Class Component)
 * Handles input and validation for adding a new expense item.
 */
class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().split('T')[0];
    this.state = {
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: today,
      errors: {},
      isSubmitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [name]: value,
      // Clear error for the edited field if user is typing
      errors: {
        ...prevState.errors,
        [name]: '',
      },
    }));
  }

  validateForm() {
    const { title, amount, category, date } = this.state;
    const errors = {};

    if (!title || !title.trim()) {
      errors.title = 'Vui lòng nhập nội dung khoản chi.';
    } else if (title.trim().length < 2) {
      errors.title = 'Nội dung phải có ít nhất 2 ký tự.';
    }

    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount)) {
      errors.amount = 'Vui lòng nhập số tiền hợp lệ.';
    } else if (numericAmount <= 0) {
      errors.amount = 'Số tiền chi tiêu phải lớn hơn 0 ₫.';
    }

    if (!category || !CATEGORY_LIST.includes(category)) {
      errors.category = 'Vui lòng chọn loại khoản chi hợp lệ.';
    }

    if (!date) {
      errors.date = 'Vui lòng chọn ngày chi tiêu.';
    }

    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isSubmitted: true });

    const errors = this.validateForm();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const { title, amount, category, date } = this.state;
    const newExpense = {
      id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    };

    this.props.onAddExpense(newExpense);

    // Reset form after adding
    this.handleReset();
  }

  handleReset() {
    const today = new Date().toISOString().split('T')[0];
    this.setState({
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: today,
      errors: {},
      isSubmitted: false,
    });
  }

  render() {
    const { title, amount, category, date, errors } = this.state;

    return (
      <div className="card form-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="card-title-icon">➕</span> Thêm Khoản Chi Mới
          </h2>
        </div>

        <form onSubmit={this.handleSubmit} noValidate className="expense-form">
          <div className="form-grid">
            {/* Nội dung */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Nội dung chi tiêu <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-input ${errors.title ? 'is-invalid' : ''}`}
                placeholder="VD: Cơm trưa, Xăng xe, Giáo trình..."
                value={title}
                onChange={this.handleChange}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            {/* Số tiền */}
            <div className="form-group">
              <label htmlFor="amount" className="form-label">
                Số tiền (VNĐ) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="1000"
                step="1000"
                className={`form-input ${errors.amount ? 'is-invalid' : ''}`}
                placeholder="VD: 50000"
                value={amount}
                onChange={this.handleChange}
              />
              {errors.amount && <span className="error-message">{errors.amount}</span>}
            </div>

            {/* Loại chi tiêu */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Loại chi tiêu <span className="text-danger">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                value={category}
                onChange={this.handleChange}
              >
                {CATEGORY_LIST.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            {/* Ngày chi */}
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Ngày chi <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className={`form-input ${errors.date ? 'is-invalid' : ''}`}
                value={date}
                onChange={this.handleChange}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              💾 Lưu khoản chi
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleReset}
            >
              🔄 Nhập lại
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
