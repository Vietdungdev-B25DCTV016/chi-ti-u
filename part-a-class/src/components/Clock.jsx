import React, { Component } from 'react';

/**
 * Clock Component (Class Component)
 * Demonstrates componentDidMount and componentWillUnmount lifecycle methods.
 * Interval runs every second and cleanly stops when unmounted.
 */
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    };
    this.timerID = null;
  }

  componentDidMount() {
    console.log('[Clock] componentDidMount: Khởi tạo timer mỗi giây.');
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    console.log('[Clock] componentWillUnmount: Hủy timer để tránh rò rỉ bộ nhớ (memory leak).');
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }

  tick() {
    this.setState({
      currentTime: new Date(),
    });
  }

  formatTimeString(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  formatDateString(date) {
    const days = [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  }

  render() {
    const { currentTime } = this.state;

    return (
      <div className="clock-badge">
        <span className="clock-icon" role="img" aria-label="clock">
          ⏱️
        </span>
        <div className="clock-info">
          <span className="clock-time">{this.formatTimeString(currentTime)}</span>
          <span className="clock-date">{this.formatDateString(currentTime)}</span>
        </div>
      </div>
    );
  }
}

export default Clock;
