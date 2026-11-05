import React, { Component } from 'react';
import Clock from './Clock';

/**
 * Header Component (Class Component)
 * Contains App title, Clock with toggle visibility to demonstrate mount/unmount.
 */
class Header extends Component {
  render() {
    const { showClock, onToggleClock } = this.props;

    return (
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo-container">
            <span className="header-logo-icon">💰</span>
          </div>
          <div>
            <h1 className="header-title">Sổ Chi Tiêu Cá Nhân</h1>
            <p className="header-subtitle">
              Phần A — React Class Component | Bài thực hành 03 LTW
            </p>
          </div>
        </div>

        <div className="header-controls">
          <button
            type="button"
            className={`btn btn-sm ${showClock ? 'btn-outline' : 'btn-secondary'}`}
            onClick={onToggleClock}
            title={showClock ? 'Ẩn đồng hồ để test componentWillUnmount' : 'Hiện đồng hồ để test componentDidMount'}
          >
            {showClock ? '👁️ Ẩn đồng hồ' : '🕒 Hiện đồng hồ'}
          </button>

          {showClock ? (
            <Clock />
          ) : (
            <div className="clock-hidden-notice">
              ⚠️ Đồng hồ đã unmount (Timer đã dừng)
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
