var debug = false;

export function tcoTotal(
	variant,
	years,
	miles,
	payment,
	interestRate,
	depreciationRate,
	fuelCost,
	insuranceYear,
	maintenanceYear
) {

	var fuel = tcoFuel(variant, fuelCost, years, miles);
	var interest = tcoInterest(variant, interestRate, payment, years);
	var depreciation = tcoDepreciation(variant, depreciationRate);
	var insurance = tcoInsuranceTotal(variant, years, insuranceYear);
	var maintenance = tcoMaintenanceTotal(variant, years, maintenanceYear);
	var tax = tcoTaxTotal(variant, years);
	var subventions = tcoSubventions(variant);

	var tco =
		parseInt(fuel.toFixed(0)) +
		parseInt(interest.toFixed(0)) +
		parseInt(depreciation.toFixed(0)) +
		parseInt(insurance.toFixed(0)) +
		parseInt(maintenance.toFixed(0)) +
		parseInt(tax.toFixed(0)) -
		parseInt(subventions.toFixed(0));

	return tco;
}

export function tcoDepreciation(variant, depreciationRate, years) {
	const price = variant.price.value;
	var cost = (price * depreciationRate) / 100;

	if (debug) {
		console.log("Depreciation_____________________________________");
		console.log(cost);
	}

	return cost;
}

export function tcoFuel(variant, price, years, miles) {
	const fuel = variant.fuel.value;
	var cost = (fuel / 10) * price * years * miles;
	if (debug) {
		console.log("Fuel_____________________________________");
		console.log(cost);
	}
	return cost;
}

export function tcoInterest(variant, interestRate, payment, years) {
	var total = 0;
	if (payment === 100 || (interestRate === 0 && payment >= 0) || years === 0) {
		return total;
	} else if (payment >= 0 && payment < 100) {
		const price = variant.price.value;
		var amountBorrowed = price * (1 - payment / 100);
		var months = 12 * years;
		var interestRateMonthly = interestRate / 100 / 12;

		//console.log("Borrowed: " + amountBorrowed);
		//console.log("Months: " + months);
		//console.log("Interest rate: " + interestRateMonthly);

		var compound = 1 - Math.pow(1 + interestRateMonthly, months * -1);
		total =
			(interestRateMonthly * amountBorrowed * months) / compound -
			amountBorrowed;

		//console.log(compound);
		return total;
	}
	if (debug) {
		console.log("Interest_____________________________________");
		console.log(total);
	}
}

export function tcoTaxTotal(variant, years) {
	const type = variant.type.swe;
	var total = 0;
	if ((type === "Bensin" || type === "Diesel") && years >= 3) {
		total = tcoMalusYear(variant) * 3 + tcoTaxYear(variant) * years;
		if (debug) {
			console.log("Tax_____________________________________");
			console.log(total);
		}
		return total;
	} else if ((type === "Bensin" || type === "Diesel") && years < 3) {
		total = tcoMalusYear(variant) * years + tcoTaxYear(variant) * years;
		if (debug) {
			console.log("Tax_____________________________________");
			console.log(total);
		}
		return total;
	} else {
		total = tcoTaxYear(variant) * years;
		if (debug) {
			console.log("Tax_____________________________________");
			console.log(total);
		}
		return total;
	}
}

export function tcoMalusTotal(variant, years) {
	var type = variant.type.swe;
	var total = 0;
	if ((type === "Bensin" || type === "Diesel") && years >= 3) {
		total = tcoMalusYear(variant) * 3;
		if (debug) {
			console.log("MalusTotal_____________________________________");
			console.log(total);
		}
		return total;
	} else if ((type === "Bensin" || type === "Diesel") && years < 3) {
		total = tcoMalusYear(variant) * years;
		if (debug) {
			console.log("MalusTotal_____________________________________");
			console.log(total);
		}
		return total;
	} else {
		if (debug) {
			console.log("MalusTotal_____________________________________");
			console.log(total);
		}
		return total;
	}
}

export function tcoTaxYear(variant) {
	const emissions = variant.emissions.value;
	const type = variant.type.swe;

	var total = 0;
	/* Grundbelopp för alla bilar */
	var baseAmount = 360;

	total += baseAmount;

	/* Koldioxidbaserad fordonsskatt */
	if (emissions > 111) {
		/* Koldioxidbelopp */
		var emissionsTax = 0;

		/* 22 per gram */
		if (
			type === "Etanol" ||
			type === "E85" ||
			type === "Biogas" ||
			type === "Naturgas"
		) {
			emissionsTax += 11 * (emissions - 111);
		} else {
			emissionsTax += 22 * (emissions - 111);
		}

		if (type === "Diesel") {
			/* Bränsletillägg */
			var fuelTax = emissions * 13.52;
			/* Miljötilägg  */
			var enviroTax = 250;

			total += fuelTax + emissionsTax + enviroTax;
			return total;
		} else {
			total += emissionsTax;
			return total;
		}
	} else {
		return total;
	}
}

export function tcoMalusYear(variant) {
	const emissions = variant.emissions.value;
	const type = variant.type.swe;

	/* Förhöjd fordonsskatt */
	var malus = 0;

	var diff = 0;

	/* Malus */
	if ((type === "Diesel" || type === "Bensin") && emissions > 95) {
		/* Grundbelopp för alla bilar */
		var baseAmount = 360;

		/* Koldioxidbelopp */
		var emissionsTax = 0;

		if (type === "Diesel") {
			if (emissions <= 140) {
				/* 82 kr per gram */
				emissionsTax += 82 * (emissions - 95);
				//console.log(emissionsTax);
			}
			if (emissions > 140) {
				/* 82 per fram mellan 95-140 */
				emissionsTax += 82 * (140 - 95);

				/* 107 kr per gram */
				emissionsTax += 107 * (emissions - 140);
				//console.log(107 * (emissions - 140));
			}
			var fuelTax = emissions * 13.52;
			/* Miljötilägg  */
			var enviroTax = 250;

			malus = baseAmount + fuelTax + emissionsTax + enviroTax;

			diff = malus - tcoTaxYear(variant);

			return diff;
		} else if (type === "Bensin") {
			if (emissions <= 140) {
				/* 82 kr per gram */
				emissionsTax += 82 * (emissions - 95);
				//console.log(emissionsTax);
			}
			if (emissions > 140) {
				/* 82 per fram mellan 95-140 */
				emissionsTax += 82 * (140 - 95);

				/* 107 kr per gram */
				emissionsTax += 107 * (emissions - 140);
				//console.log(107 * (emissions - 140));
			}

			malus = baseAmount + emissionsTax;

			diff = malus - tcoTaxYear(variant);

			return diff;
		}
	} else {
		return malus;
	}
}
export function tcoInsuranceYear(variant) {
	var total = 3000;
	return total;
}

export function tcoMaintenanceYear(variant) {
	var total = 1000;
	return total;
}

export function tcoInsuranceTotal(variant, years, insuranceYear) {
	var total = insuranceYear * years;
	if (debug) {
		console.log("Insurance_____________________________________");
		console.log(total);
	}
	return total;
}

export function tcoMaintenanceTotal(variant, years, maintenanceYear) {
	var total = maintenanceYear * years;
	if (debug) {
		console.log("Maintenance_____________________________________");
		console.log(total);
	}
	return total;
}

export function tcoSubventions(variant) {
	/* Bonus */
	const emissions = variant.emissions.value;
	const price = variant.price.value;
	const type = variant.type.swe;

	var bonus = 0;

	if (type === "El" || type === "Laddhybrid") {
		if (emissions === 0) {
			if (60000 > price * 0.25) {
				bonus = price * 0.25;
				if (debug) {
					console.log("Subventions_____________________________________");
					console.log(bonus);
				}
				return bonus;
			} else {
				bonus = 60000;
				if (debug) {
					console.log("Subventions_____________________________________");
					console.log(bonus);
				}
				return bonus;
			}
		} else if (emissions <= 70) {
			bonus = 60000 - 714 * emissions;
			if (bonus > price * 0.25) {
				bonus = price * 0.25;
				if (debug) {
					console.log("Subventions_____________________________________");
					console.log(bonus);
				}
				return bonus;
			} else {
				if (debug) {
					console.log("Subventions_____________________________________");
					console.log(bonus);
				}
				return bonus;
			}
		} else {
			if (debug) {
				console.log("Subventions_____________________________________");
				console.log(bonus);
			}
			return bonus;
		}
	} else {
		if (debug) {
			console.log("Subventions_____________________________________");
			console.log(bonus);
		}
		return bonus;
	}
}

export function numFormatter(num) {
	var fixedNum = num.toFixed(0);
	var parts = fixedNum.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return parts.join(".");
}


export function getTCOvariables(variant) {
	const type = variant.type.swe;
	const fuelCost = tcoFuelCost(variant.type);
	var variablesObj = {};
	if(type === "El"){
		variablesObj.years = 3;
		variablesObj.miles = 1500;
		variablesObj.payment = 20;
		variablesObj.interestRate = 5;
		variablesObj.depreciationRate = 40;
		variablesObj.maintenanceYear = 1500;
		variablesObj.insuranceYear = 3000;
		variablesObj.fuelCost = fuelCost;
		return variablesObj
	} else if (type === "Bensin" || type === "Diesel" || type === "Laddhybrid"){
		variablesObj.years = 3;
		variablesObj.miles = 1500;
		variablesObj.payment = 20;
		variablesObj.interestRate = 5;
		variablesObj.depreciationRate = 50;
		variablesObj.maintenanceYear = 3000;
		variablesObj.insuranceYear = 3000;
		variablesObj.fuelCost = fuelCost;
		return variablesObj
	}
}

export function tcoFuelCost(type) {
	//console.log(type);
	var fuel = type.swe;
	if (fuel === "Laddhybrid") {
		var mainType = type.types.swe[0];
		//console.log(mainType);
		if (mainType === "El") {
			return 1.8;
		} else if (mainType === "Bensin") {
			return 15.6;
		} else if (mainType === "Diesel") {
			return 15.9;
		}
	} else {
		if (fuel === "El") {
			return 1.8;
		} else if (fuel === "Bensin") {
			return 15.6;
		} else if (fuel === "Diesel") {
			return 15.9;
		}
	}
}
