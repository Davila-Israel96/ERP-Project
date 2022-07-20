import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AccountsChart from "./pages/AccountsChart";
import AssetsChart from "./pages/AssetsChart";
// when using certain modules, they must be imported and initialized separately
/**
 * @description: Main page for application, App will act as the foundation
 * for each type of chart, as well as the Home page for the application.
 */
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route path="/auth/accounts" element={<AccountsChart />} />
					<Route path="/auth/assets" element={<AssetsChart />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
