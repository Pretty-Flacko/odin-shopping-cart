import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { CartProvider, useCart } from "../../context/CartContext";
import Cart from "./Cart";

const product = {
	id: 1,
	title: "Backpack",
	price: 29.99,
	image: "image.jpg",
};

function CartTestComponent() {
	const { addToCart } = useCart();

	return <button onClick={() => addToCart(product, 2)}>Add</button>;
}

describe("Cart", () => {
	it("shows an empty cart message when the cart is empty", () => {
		render(
			<CartProvider>
				<Cart />
			</CartProvider>,
		);

		expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
	});

	it("renders products in the cart", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<Cart />
				<CartTestComponent />
			</CartProvider>,
		);

		await user.click(
			screen.getByRole("button", {
				name: "Add",
			}),
		);

		expect(screen.getByText("Backpack")).toBeInTheDocument();
		expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
	});

	it("shows cart total", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<Cart />
				<CartTestComponent />
			</CartProvider>,
		);

		await user.click(
			screen.getByRole("button", {
				name: "Add",
			}),
		);

		expect(screen.getByText("Total: $59.98")).toBeInTheDocument();
	});
});
