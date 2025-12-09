import inventoryReducer, {
  productAdded,
  fetchInventory,
  inventoryAdapter,
} from "../inventorySlice";
import { store } from "../index";

describe("inventorySlice", () => {
  const initialState = inventoryAdapter.getInitialState({
    loading: false,
    error: null as string | null,
  });

  test("should handle initial state", () => {
    expect(inventoryReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  test("should handle productAdded", () => {
    const newProduct = {
      id: "test-1",
      name: "Test Product",
      price: 100,
      quantity: 10,
      category: "Test",
      status: "In Stock" as const,
    };

    const actual = inventoryReducer(initialState, productAdded(newProduct));
    const expected = inventoryAdapter.addOne(initialState, newProduct);

    expect(actual.entities["test-1"]).toEqual(newProduct);
    expect(actual.ids).toContain("test-1");
  });

  test("should handle fetchInventory.pending", () => {
    const action = { type: fetchInventory.pending.type };
    const state = inventoryReducer(initialState, action);
    expect(state.loading).toBe(true);
  });
});
