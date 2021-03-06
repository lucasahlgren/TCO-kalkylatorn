import React, { Component } from "react";
import { numFormatter } from "../data/tco";

/* Apex charts */
import Chart from "react-apexcharts";

class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [],

			options: {
				colors: [
					"#0074D9",
					"#111111",
					"#85144b",
					"#2ECC40",
					"#FF851B",
					"#FF4136",
					"#40E0D0"
				],

				legend: {
					show: false
				},
				plotOptions: {
					pie: {
						expandOnClick: false
					}
				},

				dataLabels: {
					fontSize: "1rem",
					fontFamily: "Poppins",
					fontWeight: 400
				},
				chart: {
					fontFamily: "Poppins"
				},

				tooltip: {
					enabled: true,

					y: {
						formatter: value => {
							return numFormatter(value) + " kr";
						}
					}
				},

				labels: [
					"Värdeminskning",
					"Bränsle",
					"Lånekostnader",
					"Försäkring",
					"Underhåll",
					"Skatt"
				],
				name: {
					show: true,
					fontSize: "22px",
					fontFamily: "Helvetica, Arial, sans-serif",
					fontWeight: 600
				},

				responsive: [
					{
						breakpoint: 767,
						options: {
							chart: {
								width: "100%",
								height: "auto"
							}
						}
					}
				]
			}
		};
	}

	componentDidMount = () => {
		const {
			depreciation,
			fuel,
			tax,
			maintenance,
			interest,
			insurance
		} = this.props;
		/* {"Värdeminskning", "Bränsle", "Lånekostnader", "Försäkring", "Underhåll", "Skatt"]*/
		var series = [depreciation, fuel, interest, insurance, maintenance, tax];
		console.log(series);
		this.setState({ series: series });
	};

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			const {
				depreciation,
				fuel,
				tax,
				maintenance,
				interest,
				insurance
			} = this.props;
			/* {"Värdeminskning", "Bränsle", "Lånekostnader", "Försäkring", "Underhåll", "Skatt"]*/
			var series = [depreciation, fuel, interest, insurance, maintenance, tax];
			this.setState({ series: series });
		}
	}

	render() {
		return (
				<Chart
					options={this.state.options}
					series={this.state.series}
					type="pie"
					className="pie-chart"
				/>
		);
	}
}

export default PieChart;
