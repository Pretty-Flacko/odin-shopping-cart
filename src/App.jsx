import { useState } from "react";
import { Outlet } from "react-router";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";

function App() {
	return (
		<>
			<Navbar cartCount={0} />

			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
