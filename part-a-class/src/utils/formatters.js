/**
 * Format number to Vietnamese Currency string (e.g., 50.000 ₫)
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0 ₫';
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format ISO date string (YYYY-MM-DD) to Vietnamese date format (DD/MM/YYYY)
 * @param {string} dateString
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return dateString;
  return `${day}/${month}/${year}`;
};

/**
 * Get category metadata (icon, color, label)
 */
export const CATEGORIES = {
  'Ăn uống': {
    id: 'Ăn uống',
    label: 'Ăn uống',
    icon: '🍔',
    color: '#f97316',
    bgColor: '#fff7ed',
    borderColor: '#fdba74',
  },
  'Đi lại': {
    id: 'Đi lại',
    label: 'Đi lại',
    icon: '🚗',
    color: '#0284c7',
    bgColor: '#f0f9ff',
    borderColor: '#7dd3fc',
  },
  'Học tập': {
    id: 'Học tập',
    label: 'Học tập',
    icon: '📚',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#86efac',
  },
  'Giải trí': {
    id: 'Giải trí',
    label: 'Giải trí',
    icon: '🎮',
    color: '#9333ea',
    bgColor: '#faf5ff',
    borderColor: '#d8b4fe',
  },
};

export const CATEGORY_LIST = Object.keys(CATEGORIES);
