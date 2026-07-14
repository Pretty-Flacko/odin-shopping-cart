import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { CartProvider, useCart } from "../../context/CartContext";
import ProductCard from "./ProductCard";

const product = {
	id: 1,
	title: "Test Product",
	price: 19.99,
	image: "test-image.jpg",
};

function CartTestComponent() {
	const { cart } = useCart();

	return (
		<p>
			{cart[0]?.title} - {cart[0]?.quantity}
		</p>
	);
}

describe("ProductCard", () => {
	it("displays product information", () => {
		render(
			<CartProvider>
				<ProductCard product={product} />
			</CartProvider>,
		);

		expect(
			screen.getByRole("heading", {
				name: "Test Product",
			}),
		).toBeInTheDocument();

		expect(screen.getByText("$19.99")).toBeInTheDocument();

		expect(
			screen.getByRole("img", {
				name: "Test Product",
			}),
		).toBeInTheDocument();
	});

	it("renders quantity selector", () => {
		render(
			<CartProvider>
				<ProductCard product={product} />
			</CartProvider>,
		);

		expect(screen.getByRole("spinbutton")).toBeInTheDocument();
	});

	it("adds the selected quantity to the cart", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<>
					<ProductCard product={product} />
					<CartTestComponent />
				</>
			</CartProvider>,
		);

		const input = screen.getByRole("spinbutton");

		await user.clear(input);
		await user.type(input, "3");

		await user.click(
			screen.getByRole("button", {
				name: "Add To Cart",
			}),
		);

		expect(screen.getByText("Test Product - 3")).toBeInTheDocument();
	});

	it("does not add to cart when quantity is invalid", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<>
					<ProductCard product={product} />
					<CartTestComponent />
				</>
			</CartProvider>,
		);

		const input = screen.getByRole("spinbutton");

		await user.clear(input);
		await user.type(input, "0");

		await user.click(
			screen.getByRole("button", {
				name: "Add To Cart",
			}),
		);

		expect(screen.queryByText("Test Product - 0")).not.toBeInTheDocument();
	});

	it("disables Add To Cart when quantity is invalid", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<ProductCard product={product} />
			</CartProvider>,
		);

		const input = screen.getByRole("spinbutton");

		await user.clear(input);
		await user.type(input, "0");

		expect(
			screen.getByRole("button", {
				name: "Add To Cart",
			}),
		).toBeDisabled();
	});

	it("enables Add To Cart when quantity is valid", () => {
		render(
			<CartProvider>
				<ProductCard product={product} />
			</CartProvider>,
		);

		expect(
			screen.getByRole("button", {
				name: "Add To Cart",
			}),
		).toBeEnabled();
	});
});
