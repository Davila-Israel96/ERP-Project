import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AccountsChart from "./pages/AccountsChart";
// when using certain modules, they must be imported and initialized separately
/**
 * @description: Main page for application, App will act as the foundation
 * for each type of chart, as well as the Home page for the application.
 */
function App() {
	const [chartType, setChartType] = useState("bar");

	return (
		<div className="App">
			<Navbar />
			<div className="btn-container">
				<button type="button" onClick={() => setChartType("bar")}>
					BAR
				</button>
				<button type="button" onClick={() => setChartType("column")}>
					COLUMN
				</button>
				<button type="button" onClick={() => setChartType("polygon")}>
					POLYGON
				</button>
			</div>
			<Routes>
				<Route path="/" element={<AccountsChart chartType={chartType} />} />
			</Routes>
		</div>
	);
}

export default App;
