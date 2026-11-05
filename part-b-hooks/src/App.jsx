import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import { useFetch } from './hooks/useFetch';
import { formatCurrency } from './utils/formatters';
import './App.css';

/**
 * App Component (Function Component + Hooks)
 * Requirements fulfilled:
 * 1. Rewritten with Function Components, useState, useEffect.
 * 2. Fetches, adds, deletes data via MockAPI with custom hook useFetch (loading + error states).
 * 3. Uses useRef to focus input after add; uses useContext for light/dark mode.
 * 4. Document title updated via useEffect.
 * 5. Advanced: useClock custom hook, statistics by category, debounce search (useDebounce).
 */
function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showClock, setShowClock] = useState(true);

  // Custom hook useFetch for MockAPI integration
  const {
    data: expenses,
    loading,
    error,
    refetch,
    addExpense,
    deleteExpense,
    apiUrl,
    updateApiUrl,
    resetApiUrl,
    isUsingFallback,
  } = useFetch();

  // Filter expenses based on selected category & debounced search term
  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        !searchTerm.trim() ||
        item.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [expenses, selectedCategory, searchTerm]);

  // Calculate filtered total amount
  const totalFilteredAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [filteredExpenses]);

  // Calculate count of expenses per category for filter buttons
  const categoryCounts = useMemo(() => {
    const counts = { All: expenses.length };
    expenses.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [expenses]);

  // Requirement: Update tab document.title with total amount using useEffect
  useEffect(() => {
    const formatted = formatCurrency(totalFilteredAmount);
    const categorySuffix =
      selectedCategory !== 'All' ? ` [${selectedCategory}]` : '';
    document.title = `Chi: ${formatted}${categorySuffix} | Sổ chi tiêu cá nhân (Hooks)`;
    console.log('[useEffect] Cập nhật document.title:', document.title);
  }, [totalFilteredAmount, selectedCategory]);

  const handleToggleClock = useCallback(() => {
    setShowClock((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="app-container">
      {/* Header với đồng hồ (useClock) và chuyển theme (useContext) */}
      <Header
        showClock={showClock}
        onToggleClock={handleToggleClock}
        apiUrl={apiUrl}
        onUpdateApiUrl={updateApiUrl}
        onResetApiUrl={resetApiUrl}
        isUsingFallback={isUsingFallback}
      />

      <main className="app-main">
        {/* Thống kê nâng cao theo từng loại */}
        <ExpenseSummary allExpenses={expenses} />

        {/* Form thêm khoản chi (useRef tự động focus) */}
        <ExpenseForm onAddExpense={addExpense} loading={loading} />

        {/* Bộ lọc theo loại và ô tìm kiếm với debounce 400ms */}
        <ExpenseFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSearchChange={handleSearchChange}
          categoryCounts={categoryCounts}
        />

        {/* Danh sách khoản chi với trạng thái loading & error */}
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={deleteExpense}
          selectedCategory={selectedCategory}
          totalFilteredAmount={totalFilteredAmount}
          loading={loading}
          error={error}
          onRetry={refetch}
          isUsingFallback={isUsingFallback}
        />
      </main>

      <footer className="app-footer">
        <p>
          LTW — Bài thực hành 03 | <strong>Phần B: Function Component + Hooks</strong>
        </p>
        <p className="footer-tip">
          💡 Sử dụng <code>useState</code>, <code>useEffect</code>, <code>useRef</code>,{' '}
          <code>useContext</code>, và các custom hooks (<code>useFetch</code>, <code>useClock</code>,{' '}
          <code>useDebounce</code>).
        </p>
      </footer>
    </div>
  );
}

export default App;
