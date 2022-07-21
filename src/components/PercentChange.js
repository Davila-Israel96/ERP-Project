/**
 * @description reusable function to calculate the percentage change
 * from previous year to the current year to use in chart pages.
 * @param {data array}
 * @returns array with percentage change from previous year to current
 */

export function PercentChange(data) {
	const percentChangeArr = [];
	let percentChange;
	let difference;
	for (let item of data) {
		const { row, previous, current } = item;
		difference = current - previous;
		percentChange = (difference / previous) * 100;
		percentChangeArr.push({
			name: row,
			y: Math.abs(difference),
			z: Math.abs(percentChange),
		});
	}
	return percentChangeArr;
}
