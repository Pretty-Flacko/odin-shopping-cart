import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

import { CartProvider, useCart } from "../../context/CartContext";
import Navbar from "./Navbar";

const product = {
	id: 1,
	title: "Test Product",
	price: 10,
	image: "image.jpg",
};

function CartCountTestComponent() {
	const { addToCart } = useCart();

	return <button onClick={() => addToCart(product, 3)}>Add</button>;
}

describe("Navbar", () => {
	it("renders navigation links", () => {
		render(
			<MemoryRouter>
				<CartProvider>
					<Navbar />
				</CartProvider>
			</MemoryRouter>,
		);

		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Cart (0)" })).toBeInTheDocument();
	});

	it("displays the cart count", async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter>
				<CartProvider>
					<Navbar />
					<CartCountTestComponent />
				</CartProvider>
			</MemoryRouter>,
		);

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByRole("link", { name: "Cart (3)" })).toBeInTheDocument();
	});

	it("links to the correct pages", () => {
		render(
			<MemoryRouter>
				<CartProvider>
					<Navbar />
				</CartProvider>
			</MemoryRouter>,
		);

		expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
			"href",
			"/shop",
		);

		expect(screen.getByRole("link", { name: "Cart (0)" })).toHaveAttribute(
			"href",
			"/cart",
		);
	});
});
