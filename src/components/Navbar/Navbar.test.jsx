import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import Navbar from "./Navbar";

describe("Navbar", () => {
	it("renders navigation links", () => {
		render(
			<MemoryRouter>
				<Navbar cartCount={0} />
			</MemoryRouter>,
		);

		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Cart (0)" })).toBeInTheDocument();
	});

	it("displays the cart count", () => {
		render(
			<MemoryRouter>
				<Navbar cartCount={3} />
			</MemoryRouter>,
		);

		expect(screen.getByRole("link", { name: "Cart (3)" })).toBeInTheDocument();
	});

	it("links to the correct pages", () => {
		render(
			<MemoryRouter>
				<Navbar cartCount={0} />
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
