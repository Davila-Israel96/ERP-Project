import { React, useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import Polygon from "highcharts/highcharts-more";
import { useOutletContext } from "react-router-dom";
import { Assets } from "../data/Assets";
import { BarColumnChart } from "../components/BarColumnChart";
import { PieChart } from "../components/PieChart";
import { PercentChange } from "../components/PercentChange";
import SplitPie from "../components/SplitPie";

Polygon(Highcharts);
function AssetsChart() {
	const [barChartData, setBarChartData] = useState({});
	const [pieChartData, setPieChartData] = useState({});
	const [totalsData, setTotalsData] = useState();
	let yearRef = useRef(true);
	const chartType = useOutletContext();
	const data = Assets;

	let seriesCurrent = [];
	let currentTotals = [];
	let seriesPrevious = [];
	let previousTotals = [];
	let percentChange = PercentChange(data);
	let categories = [];

	for (let item of data) {
		if (item.name.includes("Total") || item.name.includes("Net Income")) {
			currentTotals.push({
				name: item.row,
				y: item.current,
			});
			previousTotals.push({
				name: item.row,
				y: item.previous,
			});
		} else {
			categories.push(item.row);
			seriesCurrent.push({
				name: item.row,
				y: item.current,
			});
			seriesPrevious.push({
				name: item.row,
				y: item.previous,
			});
		}
	}
	function prepBarChart() {
		// setting up format for both bar and column charts
		// layout similiar so only one statement needed for both
		setBarChartData({
			title: {
				text: "Assets",
				style: { fontSize: "40px", color: "#9FECB9", fontWeight: "bold" },
			},
			subtitle: {
				text: "Subtitle",
			},
			chart: {
				// nullify type at chart level for 'polygon' chart type
				type: `${chartType === "polygon" ? null : chartType}`,
				height: 1200,
				width: 1300,
				backgroundColor: "#ffffff",
			},
			xAxis: {
				type: "category",
				categories: [...categories],
				title: {
					text: null,
				},
				min: 0,
			},
			yAxis: {
				min: -8000,
				title: {
					text: "Value",
				},
				labels: {
					overflow: "justify",
				},
			},
			credits: { enabled: false },
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true,
						// eslint-disable-next-line no-template-curly-in-string
						format: "${y}",
					},
				},
			},
			legend: {
				layout: "vertical",
				align: "right",
				verticalAlign: "top",
				x: -40,
				y: 45,
				borderWidth: 1,
				floating: true,
				backgroundColor:
					Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFFF",
				itemStyle: {
					color: "#ffffff",
				},
			},
			// series is an array of objects set above useEffect
			series: [
				{
					name: "Current",
					data: [...seriesCurrent],
					type: `${chartType === "polygon" ? chartType : ""}`,
					zones: [
						{
							value: 0,
							color: "#FF2800",
						},
						{
							color: "#9FECB9",
						},
					],
					color: `${chartType === "polygon" ? "#9FECB9" : ""}`,
				},
				{
					name: "Previous",
					type: `${chartType === "polygon" ? "scatter" : ""}`,
					data: [...seriesPrevious],
					zones: [
						{
							value: 0,
							color: "#FF2800",
						},
						{
							color: "rgba(28, 190, 131, 1)",
						},
					],
				},
			],
		});
	}

	async function prepPieChart() {
		// kind of a hard coded way to make sure the chart renders something initially.
		if (totalsData === undefined) {
			setTotalsData(currentTotals);
		}
		setPieChartData({
			title: {
				text: `${yearRef.current === true ? "Current Year" : "Previous Year"}`,
				style: { fontSize: "30px", color: "#9FECB9", fontWeight: "bold" },
			},
			chart: {
				type: "pie",
				height: 600,
				width: 850,
			},
			tooltip: {
				pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: "pointer",
					dataLabels: {
						enabled: true,
						format: "<b>{point.name}</b>: {point.percentage:.1f}%",
					},
					showInLegend: true,
				},
			},
			series: [
				{
					data: await totalsData,
				},
			],
		});
	}
	useEffect(() => {
		prepBarChart();
	}, [chartType]);
	useEffect(() => {
		prepPieChart();
	}, [totalsData]);

	// change from current to previous
	function handleChartChange(e) {
		e.preventDefault();
		yearRef.current = !yearRef.current;
		console.log(yearRef.current);

		changeTotals();
	}

	const changeTotals = () => {
		console.log("changeTotals " + yearRef.current);
		if (yearRef.current === true) {
			setTotalsData(currentTotals);
		}
		if (yearRef.current === false) {
			setTotalsData(previousTotals);
		}
	};

	return (
		<div className="chart-container">
			<div className="bar-container">
				<BarColumnChart chartOptions={barChartData} />
			</div>
			<div className="total-title">Yearly Totals</div>
			<div className="pie-container">
				<PieChart className="pie-chart" chartOptions={pieChartData} />
				<div className="pie-btns">
					<button
						className="year-btn"
						type="button"
						onClick={(e) => handleChartChange(e)}>
						Change Year
					</button>
					<p className="description">
						When the form is input, the application separates the lines
						regarding totals and places them into the pie chart pictured here.
					</p>
				</div>
			</div>
			<div className="percent-container">
				<SplitPie
					className="percent-chart"
					values={percentChange}
					minPoint={10}
					maxPoint={800}
					zMax={1000}
				/>
				<p className="percent-desc">
					Form values from each year are compared with a function within the
					application, a percentage change is calculated, then input to the
					chart.
				</p>
			</div>
		</div>
	);
}

export default AssetsChart;
