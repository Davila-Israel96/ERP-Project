import { React, useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

export const Navbar = () => {
	const [chartType, setChartType] = useState("bar");
	const [showLinks, setShowLinks] = useState(false);
	const linksContainerRef = useRef(null);
	const linksRef = useRef(null);

	// checks heights of links to adjust size of container
	useEffect(() => {
		const linksHeight = linksRef.current.getBoundingClientRect().height;
		if (showLinks) {
			linksContainerRef.current.style.height = `${linksHeight + 20}px`;
		} else {
			linksContainerRef.current.style.height = "0px";
		}
	}, [showLinks]);

	// toggle only shows in window under 800px
	const toggleButtons = () => {
		setShowLinks(!showLinks);
	};

	return (
		<>
			<nav>
				<div className="nav-center">
					<div className="nav-header">
						<img className="logo" src="/logov2.png" alt="logo" />
						<h1 className="navbar-heading">DIBTech Financial Analyzer</h1>
						<button className="nav-toggle" onClick={toggleButtons}>
							<FaBars />
						</button>
					</div>
					<div className="links-container" ref={linksContainerRef}>
						<ul className="links" ref={linksRef}>
							<li>
								<Link className="page-link" to="/accounts">
									Accounts
								</Link>
							</li>
							<li>
								<Link className="page-link" to="/assets">
									Assets
								</Link>
							</li>
							<li>
								<Link className="page-link" to="/liabilities">
									Liabilities
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="btn-container">
				<button
					className="chart-type-btn"
					type="button"
					onClick={() => setChartType("bar")}>
					BAR
				</button>
				<button
					className="chart-type-btn"
					type="button"
					onClick={() => setChartType("column")}>
					COLUMN
				</button>
				<button
					className="chart-type-btn"
					type="button"
					onClick={() => setChartType("polygon")}>
					POLYGON
				</button>
			</div>
			<Outlet context={chartType} />
		</>
	);
};

export default Navbar;
