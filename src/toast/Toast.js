import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

class Toast extends Component {

	notifySuccessful = calculationName =>
		toast.success(calculationName + "-kalkylen sparades", {
			className: "toast-style",
			position: "top-center",
			autoClose: 4000
		});

	notifyUnsuccessful = calculationName =>
		toast.warn(calculationName + " finns redan, använd ett annat namn", {
			className: "toast-style",
			position: "top-center",
			autoClose: 4000
		});

	render() {
		const { toast } = this.props;
		if (toast !== null) {
			if (toast.notify !== false) {
				if (toast.successful) {
					this.notifySuccessful(toast.calculationName);
					this.props.notified();
				} else if (!toast.successful) {
					this.notifyUnsuccessful(toast.calculationName);
					this.props.notified();
				}
			}
		}
		return (
			<div>
				<ToastContainer />
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		toast: state.tco.toast
	};
};

const mapDispatchToProps = dispatch => ({
	notified: () => dispatch({ type: "NOTIFIED" })
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
