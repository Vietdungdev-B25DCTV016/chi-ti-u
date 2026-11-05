import React, { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import { initialExpenses } from './data/initialData';
import { formatCurrency } from './utils/formatters';
import './App.css';

/**
 * App Component (Class Component)
 * Requirements fulfilled:
 * 1. Holds state for expenses list (with initial mock data) & selected filter category.
 * 2. Clock runs every second and stops cleanly when hidden (componentDidMount, componentWillUnmount in Clock).
 * 3. Expense form validation, list keys, delete with confirmation, category filtering & total amount line.
 * 4. Tab title (document.title) displays total expenditure and updates via componentDidUpdate.
 * 5. Advanced: Statistics breakdown by category and search support.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: initialExpenses,
      selectedCategory: 'All',
      searchTerm: '',
      showClock: true,
    };

    // Binding methods to class instance
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleToggleClock = this.handleToggleClock.bind(this);
  }

  componentDidMount() {
    console.log('[App] componentDidMount: Khởi tạo tiêu đề tab trình duyệt.');
    this.updateDocumentTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    // 4. Tiêu đề tab hiển thị tổng chi, cập nhật bằng componentDidUpdate
    if (
      prevState.expenses !== this.state.expenses ||
      prevState.selectedCategory !== this.state.selectedCategory ||
      prevState.searchTerm !== this.state.searchTerm
    ) {
      console.log('[App] componentDidUpdate: Cập nhật tiêu đề tab khi state thay đổi.');
      this.updateDocumentTitle();
    }
  }

  /**
   * Tính tổng tiền của danh sách đang hiển thị theo bộ lọc
   */
  calculateFilteredTotal() {
    const filtered = this.getFilteredExpenses();
    return filtered.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }

  /**
   * Tính tổng tiền của toàn bộ danh sách
   */
  calculateOverallTotal() {
    return this.state.expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }

  /**
   * Cập nhật tiêu đề tab document.title
   */
  updateDocumentTitle() {
    const totalFiltered = this.calculateFilteredTotal();
    const formatted = formatCurrency(totalFiltered);
    const categorySuffix =
      this.state.selectedCategory !== 'All' ? ` [${this.state.selectedCategory}]` : '';
    document.title = `Chi: ${formatted}${categorySuffix} | Sổ chi tiêu cá nhân (Class)`;
  }

  handleAddExpense(newExpense) {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses],
    }));
  }

  handleDeleteExpense(id) {
    this.setState((prevState) => ({
      expenses: prevState.expenses.filter((item) => item.id !== id),
    }));
  }

  handleSelectCategory(category) {
    this.setState({ selectedCategory: category });
  }

  handleSearchChange(searchTerm) {
    this.setState({ searchTerm });
  }

  handleToggleClock() {
    this.setState((prevState) => ({
      showClock: !prevState.showClock,
    }));
  }

  getFilteredExpenses() {
    const { expenses, selectedCategory, searchTerm } = this.state;
    return expenses.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        !searchTerm.trim() ||
        item.title.toLowerCase().includes(searchTerm.trim().toLowerCase());
      return matchCategory && matchSearch;
    });
  }

  getCategoryCounts() {
    const { expenses } = this.state;
    const counts = { All: expenses.length };
    expenses.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }

  render() {
    const { selectedCategory, searchTerm, showClock, expenses } = this.state;
    const filteredExpenses = this.getFilteredExpenses();
    const totalFilteredAmount = this.calculateFilteredTotal();
    const categoryCounts = this.getCategoryCounts();

    return (
      <div className="app-container">
        {/* Header với đồng hồ và nút toggle */}
        <Header showClock={showClock} onToggleClock={this.handleToggleClock} />

        <main className="app-main">
          {/* Thống kê nâng cao theo từng loại */}
          <ExpenseSummary allExpenses={expenses} />

          {/* Form thêm khoản chi mới */}
          <ExpenseForm onAddExpense={this.handleAddExpense} />

          {/* Bộ lọc theo loại và ô tìm kiếm */}
          <ExpenseFilter
            selectedCategory={selectedCategory}
            onSelectCategory={this.handleSelectCategory}
            searchTerm={searchTerm}
            onSearchChange={this.handleSearchChange}
            categoryCounts={categoryCounts}
          />

          {/* Danh sách khoản chi với nút xóa và dòng tổng tiền */}
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={this.handleDeleteExpense}
            selectedCategory={selectedCategory}
            totalFilteredAmount={totalFilteredAmount}
          />
        </main>

        <footer className="app-footer">
          <p>
            LTW — Bài thực hành 03 | <strong>Phần A: React Class Component</strong>
          </p>
          <p className="footer-tip">
            💡 Mẹo: Nhấn nút &quot;Ẩn đồng hồ&quot; ở góc trên để quan sát <code>componentWillUnmount</code> giải phóng timer trong Console.
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
