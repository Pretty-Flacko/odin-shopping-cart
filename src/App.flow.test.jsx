import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { CartProvider } from "./context/CartContext";
import { routes } from "./router";
import * as api from "./api/api";
import testProducts from "./pages/Shop/Shop.test-data";

vi.mock("./api/api");

beforeEach(() => {
	api.getProducts.mockReset();
	api.getProducts.mockResolvedValue(testProducts);
});

function renderApp(path = "/shop") {
	const router = createMemoryRouter(routes, {
		initialEntries: [path],
	});

	return {
		user: userEvent.setup(),
		...render(
			<CartProvider>
				<RouterProvider router={router} />
			</CartProvider>,
		),
	};
}

describe("App flow", () => {
	it("allows a user to add a product and view it in the cart", async () => {
		const { user } = renderApp();

		const productHeading = await screen.findByRole("heading", {
			name: "Backpack",
		});

		const productCard = productHeading.closest("article");

		const addButton = within(productCard).getByRole("button", {
			name: /add to cart/i,
		});

		await user.click(addButton);

		expect(
			screen.getByRole("link", {
				name: /Cart \(1\)/,
			}),
		).toBeInTheDocument();

		await user.click(
			screen.getByRole("link", {
				name: /Cart/,
			}),
		);

		expect(
			await screen.findByRole("heading", {
				name: "Cart",
			}),
		).toBeInTheDocument();

		expect(screen.getByText(testProducts[0].title)).toBeInTheDocument();
	});
});
