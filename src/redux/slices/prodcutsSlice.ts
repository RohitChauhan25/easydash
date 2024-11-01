import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "../../constants/data";

interface Product {
  name: string;
  unitsSold: number;
  price: number;
  imageUrl: string;
}

interface ProductsState {
  initialProducts: Product[];
  data: Product[];
  topSelling: Product[]; // Add topSelling state
}

const initialProducts: Product[] = products;

// Function to get top-selling products
const getInitialSellingProducts = (
  products: Product[],
  limit: number
): Product[] => {
  return [...products]
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, limit);
};

const initialState: ProductsState = {
  initialProducts: initialProducts,
  data: initialProducts.slice(0, 5),
  topSelling: getInitialSellingProducts(initialProducts, 5),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.initialProducts.unshift(action.payload);
      state.data.unshift(action.payload);
      state.data.pop();
    },
    getProductsByLimit: (state, action: PayloadAction<number>) => {
      const limit = action.payload;
      state.data = state.initialProducts.slice(0, limit);
    },
    getTopSellingProducts: (state, action: PayloadAction<number>) => {
      const limit = action.payload;
      // Sort products by unitsSold in descending order and slice to get top-selling products
      state.topSelling = [...state?.initialProducts]
        .sort((a, b) => b.unitsSold - a.unitsSold)
        .slice(0, limit);
    },
  },
});

// Export the actions and reducer
export const { addProduct, getProductsByLimit, getTopSellingProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
