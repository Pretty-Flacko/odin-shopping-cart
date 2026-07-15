import { Outlet } from "react-router";

import Navbar from "./components/Navbar/Navbar";

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
