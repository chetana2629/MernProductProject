import { create } from "zustand";
const API_BASE_URL = "http://localhost:5000"; 

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch(`${API_BASE_URL}/api/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		try {
			const res = await fetch(`${API_BASE_URL}/api/products`);
			if (!res.ok) throw new Error("Failed to fetch products");

			const data = await res.json();
			set({ products: data.data });
		} catch (error) {
			console.error("Error fetching products:", error.message);
		}
	},


	deleteProduct: async (pid) => {
		try {
			const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message);

			set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
			return { success: true, message: data.message };
		} catch (error) {
			console.error("Error deleting product:", error.message);
			return { success: false, message: error.message };
		}
	},


	updateProduct: async (pid, updatedProduct) => {
		try {
			const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedProduct),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message);

			set((state) => ({
				products: state.products.map((product) => (product._id === pid ? data.data : product)),
			}));

			return { success: true, message: data.message };
		} catch (error) {
			console.error("Error updating product:", error.message);
			return { success: false, message: error.message };
		}
	},
}));