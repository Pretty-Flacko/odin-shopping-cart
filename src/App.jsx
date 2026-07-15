import { Outlet } from "react-router";

import Navbar from "./components/Navbar/Navbar";

import styles from "./App.module.css";

function App() {
	return (
		<div className={styles.app}>
			<Navbar cartCount={0} />

			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}

export default App;
