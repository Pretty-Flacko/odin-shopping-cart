import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import ProductCard from "./ProductCard";

const product = {
	id: 1,
	title: "Test Product",
	price: 19.99,
	image: "test-image.jpg",
};

describe("ProductCard", () => {
	it("displays product information", () => {
		render(<ProductCard product={product} onAddToCart={() => {}} />);

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
		render(<ProductCard product={product} onAddToCart={() => {}} />);

		expect(screen.getByRole("spinbutton")).toBeInTheDocument();
	});

	it("adds the selected quantity to the cart", async () => {
		const user = userEvent.setup();
		const handleAddToCart = vi.fn();

		render(<ProductCard product={product} onAddToCart={handleAddToCart} />);

		const input = screen.getByRole("spinbutton");

		await user.clear(input);
		await user.type(input, "3");

		await user.click(
			screen.getByRole("button", {
				name: "Add To Cart",
			}),
		);

		expect(handleAddToCart).toHaveBeenCalledWith(product, 3);
	});

	it("does not add to cart when quantity is invalid", async () => {
		const user = userEvent.setup();
		const handleAddToCart = vi.fn();

		render(<ProductCard product={product} onAddToCart={handleAddToCart} />);

		const input = screen.getByRole("spinbutton");

		await user.clear(input);
		await user.type(input, "0");

		await user.click(
			screen.getByRole("button", {
				name: "Add To Cart",
			}),
		);

		expect(handleAddToCart).not.toHaveBeenCalled();
	});

	it("disables Add To Cart when quantity is invalid", async () => {
		const user = userEvent.setup();

		render(<ProductCard product={product} onAddToCart={() => {}} />);

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
		render(<ProductCard product={product} onAddToCart={() => {}} />);

		expect(
			screen.getByRole("button", {
				name: "Add To Cart",
			}),
		).toBeEnabled();
	});
});
