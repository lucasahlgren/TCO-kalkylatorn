const initState = {
	calculationsList: [],
	toast: null
};

// Update state based on action
const tcoReducer = (state = initState, action) => {
	var calculationsList = [...state.calculationsList];
	var toast = null;

	switch (action.type) {
		case "ADD_COMPARE":
			console.log(action.payload);
			calculationsList.forEach((calculation, i) => {
				if (calculation.name === action.payload) {
					calculationsList[i].selected = true;
				}
			});
			console.log(calculationsList);
			return { ...state, calculationsList: calculationsList };
		case "REMOVE_COMPARE":
			calculationsList.forEach((calculation, i) => {
				if (calculation.name === action.payload) {
					calculationsList[i].selected = false;
				}
			});
			console.log(calculationsList);
			return { ...state, calculationsList: calculationsList };
		case "ADD_CALCULATION":
			var exist = false;
			calculationsList.forEach(calculation => {
				if (
					calculation.name.toLowerCase() === action.payload.name.toLowerCase()
				) {
					exist = true;
				}
			});
			console.log(action.payload);
			if (!exist) {
				toast = {
					calculationName: action.payload.name,
					notify: true,
					successful: true
				};
				calculationsList.push(action.payload);
			} else {
				toast = {
					calculationName: action.payload.name,
					notify: true,
					successful: false
				};
			}

			return { ...state, calculationsList: calculationsList, toast: toast };

		case "REMOVE_CALCULATION":
			calculationsList.forEach((calculation, i) => {
				if (calculation.name === action.payload) {
					calculationsList.splice(i, 1);
				}
			});
			console.log(calculationsList);
			return { ...state, calculationsList: calculationsList };
		case "NOTIFIED":
			console.log("Notified");
			toast = state.toast;
			toast.notify = false;
			console.log(toast);
			return { ...state, toast: toast };

		default:
			return state;
	}
};

export default tcoReducer;
