// Transaction status constants
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  PROCESSING: 'processing',
  REFUNDED: 'refunded'
};

// Transaction type constants
export const TRANSACTION_TYPE = {
  TOP_UP: 'top_up',
  WITHDRAWAL: 'withdrawal',
  REFUND: 'refund'
};

// Format transaction date to local string
export const formatTransactionDate = (date) => {
  const now = new Date();
  const txDate = new Date(date);
  const diffTime = Math.abs(now - txDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  // If less than 1 minute ago
  if (diffMinutes < 1) {
    return 'Just now';
  }
  // If less than 1 hour ago
  if (diffHours < 1) {
    return `${diffMinutes}m ago`;
  }
  // If less than 24 hours ago
  if (diffDays < 1) {
    return `${diffHours}h ago`;
  }
  // If yesterday
  if (diffDays === 1) {
    return `Yesterday at ${txDate.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    })}`;
  }
  // If this year
  if (txDate.getFullYear() === now.getFullYear()) {
    return txDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
  // If different year
  return txDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Format date for group headers
export const formatDateHeader = (date) => {
  const now = new Date();
  const txDate = new Date(date);
  const diffTime = Math.abs(now - txDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // If today
  if (diffDays === 0) {
    return 'Today';
  }
  // If yesterday
  if (diffDays === 1) {
    return 'Yesterday';
  }
  // If this week
  if (diffDays < 7) {
    return txDate.toLocaleDateString('en-US', { weekday: 'long' });
  }
  // If this year
  if (txDate.getFullYear() === now.getFullYear()) {
    return txDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }
  // If different year
  return txDate.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format currency with proper symbol and decimals
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Get status color based on transaction status
export const getStatusColor = (status) => {
  const statusColors = {
    [TRANSACTION_STATUS.PENDING]: '#F59E0B',    // Amber
    [TRANSACTION_STATUS.SUCCESS]: '#10B981',    // Emerald
    [TRANSACTION_STATUS.FAILED]: '#EF4444',     // Red
    [TRANSACTION_STATUS.PROCESSING]: '#3B82F6',  // Blue
    [TRANSACTION_STATUS.REFUNDED]: '#8B5CF6'     // Purple
  };
  return statusColors[status] || '#6B7280';     // Gray default
};

// Get status icon class based on transaction status
export const getStatusIcon = (status) => {
  const statusIcons = {
    [TRANSACTION_STATUS.PENDING]: 'fa-clock',
    [TRANSACTION_STATUS.SUCCESS]: 'fa-check-circle',
    [TRANSACTION_STATUS.FAILED]: 'fa-times-circle',
    [TRANSACTION_STATUS.PROCESSING]: 'fa-spinner',
    [TRANSACTION_STATUS.REFUNDED]: 'fa-undo'
  };
  return statusIcons[status] || 'fa-question-circle';
};

// Generate transaction ID with prefix
export const generateTransactionId = (prefix = 'TRX') => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${randomStr}`.toUpperCase();
};

// Sort transactions by date
export const sortTransactionsByDate = (transactions, ascending = false) => {
  return [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Filter transactions by status
export const filterTransactionsByStatus = (transactions, status) => {
  if (!status) return transactions;
  return transactions.filter(transaction => transaction.status === status);
};

// Filter transactions by date range
export const filterTransactionsByDateRange = (transactions, startDate, endDate) => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

// Calculate total amount for transactions
export const calculateTransactionTotal = (transactions) => {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
};

// Group transactions by date
export const groupTransactionsByDate = (transactions) => {
  return transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};

// Search transactions by query
export const searchTransactions = (transactions, query) => {
  const searchTerm = query.toLowerCase();
  return transactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchTerm) ||
    transaction.description?.toLowerCase().includes(searchTerm) ||
    transaction.game?.toLowerCase().includes(searchTerm)
  );
};

// Validate transaction data
export const validateTransaction = (transaction) => {
  const errors = {};

  if (!transaction.amount || transaction.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!transaction.game) {
    errors.game = 'Game name is required';
  }

  if (!transaction.type || !Object.values(TRANSACTION_TYPE).includes(transaction.type)) {
    errors.type = 'Invalid transaction type';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
