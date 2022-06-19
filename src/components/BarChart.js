import React from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = ({ chartData }) => {
	return (
		<div>
			<Bar
				data={chartData}
				options={{
					responsive: true,
					plugins: {
						title: {
							display: true,
							text: chartData.row,
						},
						legend: {
							display: true,
							position: 'bottom',
						},
					},
				}}
			/>
		</div>
	);
};
