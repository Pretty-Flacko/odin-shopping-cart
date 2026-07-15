import { createBrowserRouter } from "react-router";

import App from "./App";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";

import { getProducts } from "./api/api";
import testProducts from "./pages/Shop/Shop.test-data";

export const routes = [
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "shop",
				element: <Shop />,
				loader: getProducts,
			},
			{
				path: "cart",
				element: <Cart />,
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default router;
