import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { CartProvider, useCart } from "./CartContext";

const product = {
	id: 1,
	title: "Backpack",
	price: 29.99,
	image: "image.jpg",
};

function TestComponent() {
	const { cart } = useCart();

	return <p>{cart.length}</p>;
}

function AddToCartTestComponent() {
	const { cart, addToCart } = useCart();

	return (
		<>
			<p>Title: {cart[0]?.title}</p>
			<p>Quantity: {cart[0]?.quantity}</p>

			<button onClick={() => addToCart(product, 2)}>Add</button>
		</>
	);
}

function UpdateQuantityTestComponent() {
	const { cart, addToCart, updateQuantity } = useCart();

	return (
		<>
			<p>Quantity: {cart[0]?.quantity}</p>

			<button onClick={() => addToCart(product, 2)}>Add</button>

			<button onClick={() => updateQuantity(product.id, 5)}>Update</button>
		</>
	);
}

function RemoveWithUpdateTestComponent() {
	const { cart, addToCart, updateQuantity } = useCart();

	return (
		<>
			<p>Items: {cart.length}</p>

			<button onClick={() => addToCart(product, 2)}>Add</button>

			<button onClick={() => updateQuantity(product.id, 0)}>Set Zero</button>
		</>
	);
}

function RemoveFromCartTestComponent() {
	const { cart, addToCart, removeFromCart } = useCart();

	return (
		<>
			<p>Items: {cart.length}</p>

			<button onClick={() => addToCart(product, 2)}>Add</button>

			<button onClick={() => removeFromCart(product.id)}>Remove</button>
		</>
	);
}

function CartCountTestComponent() {
	const { cartCount, addToCart } = useCart();

	return (
		<>
			<p>Count: {cartCount}</p>

			<button onClick={() => addToCart(product, 3)}>Add</button>
		</>
	);
}

function CartTotalTestComponent() {
	const { cartTotal, addToCart } = useCart();

	return (
		<>
			<p>Total: {cartTotal}</p>

			<button onClick={() => addToCart(product, 3)}>Add</button>
		</>
	);
}

describe("CartContext", () => {
	it("starts with an empty cart", () => {
		render(
			<CartProvider>
				<TestComponent />
			</CartProvider>,
		);

		expect(screen.getByText("0")).toBeInTheDocument();
	});

	it("adds a product to the cart", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<AddToCartTestComponent />
			</CartProvider>,
		);

		await user.click(
			screen.getByRole("button", {
				name: "Add",
			}),
		);

		expect(screen.getByText("Title: Backpack")).toBeInTheDocument();
		expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
	});

	it("increases quantity when adding an existing product", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<AddToCartTestComponent />
			</CartProvider>,
		);

		const button = screen.getByRole("button", {
			name: "Add",
		});

		await user.click(button);
		await user.click(button);

		expect(screen.getByText("Quantity: 4")).toBeInTheDocument();
	});

	it("updates product quantity", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<UpdateQuantityTestComponent />
			</CartProvider>,
		);

		await user.click(screen.getByRole("button", { name: "Add" }));
		await user.click(screen.getByRole("button", { name: "Update" }));

		expect(screen.getByText("Quantity: 5")).toBeInTheDocument();
	});

	it("removes a product when quantity is updated to zero", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<RemoveWithUpdateTestComponent />
			</CartProvider>,
		);

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByText("Items: 1")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Set Zero" }));

		expect(screen.getByText("Items: 0")).toBeInTheDocument();
	});

	it("removes a product from the cart", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<RemoveFromCartTestComponent />
			</CartProvider>,
		);

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByText("Items: 1")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Remove" }));

		expect(screen.getByText("Items: 0")).toBeInTheDocument();
	});

	it("calculates total item quantity", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<CartCountTestComponent />
			</CartProvider>,
		);

		expect(screen.getByText("Count: 0")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByText("Count: 3")).toBeInTheDocument();
	});

	it("calculates total cart price", async () => {
		const user = userEvent.setup();

		render(
			<CartProvider>
				<CartTotalTestComponent />
			</CartProvider>,
		);

		expect(screen.getByText("Total: 0")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(screen.getByText("Total: 89.97")).toBeInTheDocument();
	});
});
