import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../constants/data";

// Define the structure of a single transaction
interface Transaction {
  imgUrl: string;
  Store_Name: string;
  Name: string;
  Country: string;
  Level: string;
  Time: number;
  Paid: string;
  Transaction_Mode: string;
  flag: string;
}

// Define the structure of the slice state
interface TransactionsState {
  transactions: Transaction[];
  searchTerm: string; // State to hold the current search term
  activeMode: string; // State to hold the current active mode
}

// Define the initial state
const initialState: TransactionsState = {
  transactions: Transaction,
  searchTerm: "", // Initialize search term
  activeMode: "Online", // Initialize active mode
};

// Create the slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
    removeTransaction(state, action: PayloadAction<number>) {
      state.transactions = state.transactions.filter(
        (_, index) => index !== action.payload
      );
    },
    updateTransaction(
      state,
      action: PayloadAction<{ index: number; updatedTransaction: Transaction }>
    ) {
      const { index, updatedTransaction } = action.payload;
      state.transactions[index] = {
        ...state.transactions[index],
        ...updatedTransaction,
      };
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload; // Update search term
    },
    setActiveMode(state, action: PayloadAction<string>) {
      state.activeMode = action.payload; // Update active mode
    },
  },
});

// Selector to get filtered transactions based on search term and active mode
export const selectFilteredTransactions = (state: {
  transactions: TransactionsState;
}) => {
  const { transactions, searchTerm, activeMode } = state.transactions;

  // Filter by active mode first
  const filteredByMode = transactions.filter(
    (transaction) => transaction.Transaction_Mode === activeMode
  );

  // Then filter by search term
  if (!searchTerm) return filteredByMode;

  return filteredByMode.filter((transaction) =>
    transaction.Store_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Export actions and reducer
export const {
  addTransaction,
  removeTransaction,
  updateTransaction,
  setSearchTerm,
  setActiveMode,
} = transactionSlice.actions;

export default transactionSlice.reducer;
