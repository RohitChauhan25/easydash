import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryData {
  flag: string;
  name: string;
  revenue: number;
  orders: number;
  visitors: number;
  revenuePercentage?: number;
  ordersPercentage?: number;
  visitorsPercentage?: number;
}

// Calculate total values for revenue, orders, and visitors
const calculateTotals = (data: CountryData[]) => {
  return {
    totalRevenue: data.reduce((sum, country) => sum + country.revenue, 0),
    totalOrders: data.reduce((sum, country) => sum + country.orders, 0),
    totalVisitors: data.reduce((sum, country) => sum + country.visitors, 0),
  };
};

// Set initial data and calculate percentages based on totals
const initialData: CountryData[] = [
  {
    flag: "GB",
    name: "United Kingdom",
    revenue: 20000,
    orders: 400,
    visitors: 10000,
  },
  { flag: "FR", name: "France", revenue: 17000, orders: 300, visitors: 5500 },
  { flag: "IT", name: "Italy", revenue: 15000, orders: 300, visitors: 9800 },
  { flag: "ES", name: "Spain", revenue: 10000, orders: 250, visitors: 9000 },
  { flag: "PL", name: "Poland", revenue: 8000, orders: 150, visitors: 6700 },
  { flag: "DE", name: "Germany", revenue: 25000, orders: 500, visitors: 1200 },
  { flag: "UA", name: "Ukraine", revenue: 5000, orders: 100, visitors: 25500 },
];

// Calculate percentages and add to initial data
const totals = calculateTotals(initialData);
const initialState = {
  data: initialData
    .map((country) => ({
      ...country,
      revenuePercentage: Math.round(
        (country.revenue / totals.totalRevenue) * 100
      ),
      ordersPercentage: Math.round((country.orders / totals.totalOrders) * 100),
      visitorsPercentage: Math.round(
        (country.visitors / totals.totalVisitors) * 100
      ),
    }))
    .sort((a, b) => b.revenue - a.revenue), // Default sorted by revenue
};

const mapSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.data = action.payload;
    },
    sortData: (
      state,
      action: PayloadAction<"orders" | "revenue" | "visitors">
    ) => {
      const sortBy = action.payload;
      state.data = [...state.data].sort((a, b) => b[sortBy] - a[sortBy]);
    },
  },
});

// Export the actions
export const { addUsers, sortData } = mapSlice.actions;

// Export the reducer
export default mapSlice.reducer;
