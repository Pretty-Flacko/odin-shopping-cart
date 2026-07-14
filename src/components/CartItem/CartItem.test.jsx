import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

vi.mock("../../context/CartContext", () => ({
	useCart: vi.fn(),
}));

const mockUpdateQuantity = vi.fn();

const item = {
	id: 1,
	title: "Backpack",
	price: 29.99,
	image: "image.jpg",
	quantity: 2,
};

beforeEach(() => {
	useCart.mockReturnValue({
		updateQuantity: mockUpdateQuantity,
	});

	mockUpdateQuantity.mockClear();
});

describe("CartItem", () => {
	it("displays product information", () => {
		render(<CartItem item={item} />);

		expect(
			screen.getByRole("heading", {
				name: "Backpack",
			}),
		).toBeInTheDocument();

		expect(screen.getByText("$29.99")).toBeInTheDocument();

		expect(screen.getByText("Quantity: 2")).toBeInTheDocument();

		expect(
			screen.getByRole("img", {
				name: "Backpack",
			}),
		).toBeInTheDocument();
	});

	it("updates quantity when increasing", async () => {
		const user = userEvent.setup();

		render(<CartItem item={item} />);

		await user.click(
			screen.getByRole("button", {
				name: "increase quantity",
			}),
		);

		expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
	});

	it("updates quantity when decreasing", async () => {
		const user = userEvent.setup();

		render(<CartItem item={item} />);

		await user.click(
			screen.getByRole("button", {
				name: "decrease quantity",
			}),
		);

		expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
	});

	it("updates quantity when input changes", () => {
		render(<CartItem item={item} />);

		const input = screen.getByRole("spinbutton");

		fireEvent.change(input, {
			target: {
				value: "5",
			},
		});

		expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 5);
	});
});
