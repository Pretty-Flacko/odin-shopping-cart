import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import { routes } from "./router/router";

function renderWithRouter(path) {
	const router = createMemoryRouter(routes, {
		initialEntries: [path],
	});

	return render(<RouterProvider router={router} />);
}

describe("App routes", () => {
	it("renders home page", () => {
		renderWithRouter("/");

		expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
	});

	it("renders shop page", () => {
		renderWithRouter("/shop");

		expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
	});

	it("renders cart page", () => {
		renderWithRouter("/cart");

		expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
	});
});
