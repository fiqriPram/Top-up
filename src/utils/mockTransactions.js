import { TRANSACTION_STATUS, TRANSACTION_TYPE } from './transactionUtils';

export const mockTransactions = [
  {
    id: 'TRX_1A2B3C',
    game: 'Mobile Legends',
    amount: 50.00,
    date: '2024-01-15T10:30:00',
    status: TRANSACTION_STATUS.SUCCESS,
    type: TRANSACTION_TYPE.TOP_UP,
    description: '250 Diamonds',
    userId: 'USER123'
  },
  {
    id: 'TRX_4D5E6F',
    game: 'PUBG Mobile',
    amount: 100.00,
    date: '2024-01-15T09:15:00',
    status: TRANSACTION_STATUS.PENDING,
    type: TRANSACTION_TYPE.TOP_UP,
    description: '500 UC',
    userId: 'USER123'
  },
  {
    id: 'TRX_7G8H9I',
    game: 'Genshin Impact',
    amount: 75.00,
    date: '2024-01-14T15:45:00',
    status: TRANSACTION_STATUS.FAILED,
    type: TRANSACTION_TYPE.TOP_UP,
    description: '3000 Genesis Crystals',
    userId: 'USER123'
  },
  {
    id: 'TRX_JK1L2M',
    game: 'Free Fire',
    amount: 25.00,
    date: '2024-01-14T12:20:00',
    status: TRANSACTION_STATUS.SUCCESS,
    type: TRANSACTION_TYPE.TOP_UP,
    description: '500 Diamonds',
    userId: 'USER123'
  },
  {
    id: 'TRX_3N4O5P',
    game: 'Mobile Legends',
    amount: 30.00,
    date: '2024-01-13T18:10:00',
    status: TRANSACTION_STATUS.PROCESSING,
    type: TRANSACTION_TYPE.TOP_UP,
    description: '150 Diamonds',
    userId: 'USER123'
  },
  {
    id: 'TRX_6Q7R8S',
    game: 'PUBG Mobile',
    amount: 150.00,
    date: '2024-01-13T14:30:00',
    status: TRANSACTION_STATUS.REFUNDED,
    type: TRANSACTION_TYPE.REFUND,
    description: '750 UC - Payment Issue',
    userId: 'USER123'
  }
];
