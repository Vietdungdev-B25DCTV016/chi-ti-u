import React, { useState } from 'react';
import { DEFAULT_MOCKAPI_URL } from '../hooks/useFetch';

const ApiConfigModal = ({ isOpen, onClose, currentUrl, onSaveUrl, onResetUrl }) => {
  const [urlInput, setUrlInput] = useState(currentUrl);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onSaveUrl(urlInput.trim());
      onClose();
    }
  };

  const handleReset = () => {
    onResetUrl();
    setUrlInput(DEFAULT_MOCKAPI_URL);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">⚙️ Cấu Hình MockAPI Endpoint</h3>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-body">
          <p className="modal-desc">
            Bạn có thể tạo một resource <code>expenses</code> trên{' '}
            <a href="https://mockapi.io" target="_blank" rel="noreferrer">
              mockapi.io
            </a>{' '}
            với các trường: <code>title</code>, <code>amount</code>, <code>category</code>, <code>date</code> và dán URL vào đây.
          </p>

          <div className="form-group">
            <label htmlFor="mockapiUrl" className="form-label">
              MockAPI URL Endpoint:
            </label>
            <input
              type="url"
              id="mockapiUrl"
              className="form-input"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://xxx.mockapi.io/api/v1/expenses"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              🔄 Khôi phục mặc định
            </button>
            <button type="submit" className="btn btn-primary">
              💾 Lưu URL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiConfigModal;
