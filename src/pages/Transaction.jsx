import { useState, useEffect } from 'react';
import {
  formatTransactionDate,
  formatDateHeader,
  formatCurrency,
  getStatusColor,
  getStatusIcon,
  TRANSACTION_STATUS,
  filterTransactionsByStatus,
  filterTransactionsByDateRange,
  searchTransactions,
  groupTransactionsByDate,
  calculateTransactionTotal
} from '../utils/transactionUtils';
import { mockTransactions } from '../utils/mockTransactions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [groupedTransactions, setGroupedTransactions] = useState({});

  useEffect(() => {
    // In a real app, this would be an API call
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  useEffect(() => {
    let filtered = [...transactions];

    // Apply status filter
    if (selectedStatus) {
      filtered = filterTransactionsByStatus(filtered, selectedStatus);
    }

    // Apply date range filter
    if (startDate && endDate) {
      filtered = filterTransactionsByDateRange(
        filtered,
        new Date(startDate),
        new Date(endDate)
      );
    }

    // Apply search filter
    if (searchQuery) {
      filtered = searchTransactions(filtered, searchQuery);
    }

    setFilteredTransactions(filtered);
    setGroupedTransactions(groupTransactionsByDate(filtered));
  }, [transactions, selectedStatus, startDate, endDate, searchQuery]);

  const totalAmount = calculateTransactionTotal(filteredTransactions);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <section className="transaction-section">
          <div className="transaction-page">
            <div className="transaction-header">
              <h1>Transaction History</h1>
              <div className="transaction-summary">
                <span className="total-amount">
                  Total: {formatCurrency(totalAmount)}
                </span>
                <span className="transaction-count">
                  {filteredTransactions.length} transactions
                </span>
              </div>
            </div>

            <div className="transaction-filters">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="status-filter"
              >
                <option value="">All Status</option>
                {Object.values(TRANSACTION_STATUS).map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <div className="date-filters">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="date-input"
                />
                <span>to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>

            <div className="transaction-list">
              {Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
                <div key={date} className="transaction-group">
                  <div className="date-header">
                    {formatDateHeader(dayTransactions[0].date)}
                  </div>
                  {dayTransactions.map((transaction) => (
                    <div key={transaction.id} className="transaction-card">
                      <div className="transaction-icon">
                        <i
                          className={`fas ${getStatusIcon(transaction.status)}`}
                          style={{ color: getStatusColor(transaction.status) }}
                        ></i>
                      </div>
                      <div className="transaction-info">
                        <div className="transaction-game">{transaction.game}</div>
                        <div className="transaction-description">
                          {transaction.description}
                        </div>
                        <div className="transaction-meta">
                          <span className="transaction-id">{transaction.id}</span>
                          <span className="transaction-time">
                            {formatTransactionDate(transaction.date)}
                          </span>
                        </div>
                      </div>
                      <div className="transaction-amount">
                        <div className="amount">
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div
                          className="status-badge"
                          style={{
                            backgroundColor: getStatusColor(transaction.status),
                            opacity: 0.1
                          }}
                        >
                          <span style={{ color: getStatusColor(transaction.status), opacity: 1 }}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Transaction;
