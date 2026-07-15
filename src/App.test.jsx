import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";

import { CartProvider } from "./context/CartContext";
import { routes } from "./router";
import * as api from "./api/api";
import testProducts from "./pages/Shop/Shop.test-data";

vi.mock("./api/api");

beforeEach(() => {
	api.getProducts.mockReset();
	api.getProducts.mockResolvedValue(testProducts);
});

function renderWithRouter(path) {
	const router = createMemoryRouter(routes, {
		initialEntries: [path],
	});

	return render(
		<CartProvider>
			<RouterProvider router={router} />
		</CartProvider>,
	);
}

describe("App routes", () => {
	it("renders home page", () => {
		renderWithRouter("/");

		expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
	});

	it("renders shop page", async () => {
		renderWithRouter("/shop");

		expect(
			await screen.findByRole("heading", { name: "Shop" }),
		).toBeInTheDocument();
	});

	it("renders cart page", () => {
		renderWithRouter("/cart");

		expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
	});
});
