import React, { useState, useRef, useEffect } from 'react';
import { CATEGORY_LIST } from '../utils/formatters';

/**
 * ExpenseForm Component (Function Component)
 * Requirement: Dùng useRef để focus ô nhập sau khi thêm.
 */
const ExpenseForm = ({ onAddExpense, loading }) => {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Ăn uống',
    date: today,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Requirement: Dùng useRef để focus ô nhập sau khi thêm
  const titleInputRef = useRef(null);

  // Focus ô nhập khi component mount lần đầu
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi của trường đang nhập
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const { title, amount, category, date } = formData;

    if (!title || !title.trim()) {
      newErrors.title = 'Vui lòng nhập nội dung chi tiêu.';
    } else if (title.trim().length < 2) {
      newErrors.title = 'Nội dung phải có ít nhất 2 ký tự.';
    }

    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount)) {
      newErrors.amount = 'Vui lòng nhập số tiền hợp lệ.';
    } else if (numericAmount <= 0) {
      newErrors.amount = 'Số tiền chi tiêu phải lớn hơn 0 ₫.';
    }

    if (!category || !CATEGORY_LIST.includes(category)) {
      newErrors.category = 'Vui lòng chọn loại chi tiêu hợp lệ.';
    }

    if (!date) {
      newErrors.date = 'Vui lòng chọn ngày chi tiêu.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Nếu lỗi ở title thì focus lại title
      if (validationErrors.title) {
        titleInputRef.current?.focus();
      }
      return;
    }

    setSubmitting(true);

    const newExpense = {
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
    };

    try {
      await onAddExpense(newExpense);

      // Reset form sau khi thêm thành công
      setFormData({
        title: '',
        amount: '',
        category: 'Ăn uống',
        date: today,
      });
      setErrors({});

      // Requirement: Dùng useRef để tự động focus lại ô nhập nội dung sau khi thêm
      if (titleInputRef.current) {
        titleInputRef.current.focus();
        console.log('[ExpenseForm] useRef: Đã tự động focus lại vào ô nhập nội dung sau khi thêm!');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: today,
    });
    setErrors({});
    titleInputRef.current?.focus();
  };

  return (
    <div className="card form-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-title-icon">➕</span> Thêm Khoản Chi Mới (Hooks &amp; useRef)
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate className="expense-form">
        <div className="form-grid">
          {/* Nội dung với useRef */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Nội dung chi tiêu <span className="text-danger">*</span>
            </label>
            <input
              ref={titleInputRef}
              type="text"
              id="title"
              name="title"
              className={`form-input ${errors.title ? 'is-invalid' : ''}`}
              placeholder="VD: Cơm trưa, Xăng xe, Giáo trình..."
              value={formData.title}
              onChange={handleChange}
              disabled={submitting || loading}
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
              value={formData.amount}
              onChange={handleChange}
              disabled={submitting || loading}
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>

          {/* Loại */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Loại chi tiêu <span className="text-danger">*</span>
            </label>
            <select
              id="category"
              name="category"
              className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              value={formData.category}
              onChange={handleChange}
              disabled={submitting || loading}
            >
              {CATEGORY_LIST.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          {/* Ngày */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Ngày chi <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className={`form-input ${errors.date ? 'is-invalid' : ''}`}
              value={formData.date}
              onChange={handleChange}
              disabled={submitting || loading}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting || loading}
          >
            {submitting ? '⏳ Đang lưu...' : '💾 Lưu khoản chi (MockAPI)'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={submitting || loading}
          >
            🔄 Nhập lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
