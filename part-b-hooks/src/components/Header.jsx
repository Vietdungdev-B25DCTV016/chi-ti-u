import React, { useState } from 'react';
import Clock from './Clock';
import { useTheme } from '../context/ThemeContext';
import ApiConfigModal from './ApiConfigModal';

/**
 * Header Component (Function Component)
 * Demonstrates useContext for dark/light mode toggle.
 */
const Header = ({
  showClock,
  onToggleClock,
  apiUrl,
  onUpdateApiUrl,
  onResetApiUrl,
  isUsingFallback,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo-container">
            <span className="header-logo-icon">⚡</span>
          </div>
          <div>
            <h1 className="header-title">Sổ Chi Tiêu Cá Nhân</h1>
            <p className="header-subtitle">
              Phần B — React Function Component &amp; Hooks | LTW Bài 03
            </p>
          </div>
        </div>

        <div className="header-controls">
          {/* Nút chuyển chế độ Sáng / Tối bằng useContext */}
          <button
            type="button"
            className="btn btn-sm btn-theme"
            onClick={toggleTheme}
            title={`Chuyển sang chế độ ${theme === 'light' ? 'Tối' : 'Sáng'}`}
          >
            {theme === 'light' ? '🌙 Chế độ Tối' : '☀️ Chế độ Sáng'}
          </button>

          {/* Nút cấu hình MockAPI */}
          <button
            type="button"
            className={`btn btn-sm ${isUsingFallback ? 'btn-warning-outline' : 'btn-outline'}`}
            onClick={() => setIsModalOpen(true)}
            title="Cấu hình MockAPI endpoint"
          >
            ⚙️ MockAPI
          </button>

          {/* Nút toggle ẩn/hiện đồng hồ để test hook cleanup */}
          <button
            type="button"
            className={`btn btn-sm ${showClock ? 'btn-outline' : 'btn-secondary'}`}
            onClick={onToggleClock}
            title={showClock ? 'Ẩn đồng hồ để hủy timer của useClock' : 'Hiện đồng hồ'}
          >
            {showClock ? '👁️ Ẩn đồng hồ' : '🕒 Hiện đồng hồ'}
          </button>

          {showClock ? (
            <Clock />
          ) : (
            <div className="clock-hidden-notice">
              ⚠️ Đồng hồ đã ẩn (useClock cleanup đã chạy)
            </div>
          )}
        </div>
      </header>

      <ApiConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUrl={apiUrl}
        onSaveUrl={onUpdateApiUrl}
        onResetUrl={onResetApiUrl}
      />
    </>
  );
};

export default Header;
