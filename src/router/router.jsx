import { createBrowserRouter } from "react-router";

import App from "../App";

import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";

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
