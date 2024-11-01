import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./slices/mapSlice";
import productsReducer from "./slices/prodcutsSlice";
import transactionReducer from "./slices/transactionSlice";
import taskReducer from "./slices/taskSlice";
import themeReducer from "./slices/theme";

const store = configureStore({
  reducer: {
    mapData: mapReducer,
    products: productsReducer,
    transactions: transactionReducer,
    tasks: taskReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
