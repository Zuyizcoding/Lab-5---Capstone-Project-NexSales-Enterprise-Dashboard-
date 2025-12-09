export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Toys",
];

const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }).map((_, index) => {
    const quantity = Math.floor(Math.random() * 100);

    return {
      id: `prod-${index + 1}`,
      name: `Product ${index + 1}`,
      price: parseFloat((Math.random() * 1000).toFixed(2)),
      quantity,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      status:
        quantity === 0
          ? "Out of Stock"
          : quantity < 10
          ? "Low Stock"
          : "In Stock",
    };
  });
};

export const fetchInventoryAPI = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateProducts(5000));
    }, 2000); // 2-second delay
  });
};
