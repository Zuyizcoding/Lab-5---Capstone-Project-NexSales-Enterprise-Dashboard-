import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { Product, fetchInventoryAPI } from "../api/mockData";
import { RootState } from "./index";

export const inventoryAdapter = createEntityAdapter<Product>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = inventoryAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const response = await fetchInventoryAPI();
    return response;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    productAdded: inventoryAdapter.addOne,
    productUpdated: inventoryAdapter.updateOne,
    productDeleted: inventoryAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        inventoryAdapter.setAll(state, action.payload);
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inventory";
      });
  },
});

export const { productAdded, productUpdated, productDeleted } =
  inventorySlice.actions;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = inventoryAdapter.getSelectors<RootState>((state) => state.inventory);
// Note: We need to register this reducer in store/index.ts for this selector to work

export default inventorySlice.reducer;
