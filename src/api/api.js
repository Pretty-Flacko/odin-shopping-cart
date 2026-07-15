const PRODUCTS_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
	const response = await fetch(PRODUCTS_URL);

	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}

	return response.json();
}
