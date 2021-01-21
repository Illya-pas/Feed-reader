import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "./Alert";
import { showAlert, authUser } from "../redux/actions";

export const LoginPage = (props) => {
	const alert = useSelector((state) => state.app.alert);
	const dispatch = useDispatch();

	const [data, setData] = React.useState({
		username: "",
		email: "",
	});

	const submitData = (event) => {
		event.preventDefault();

		if (!data.username.trim() || !data.email.trim()) {
			return dispatch(showAlert("Fields can't be empty!"));
		}
		dispatch(authUser(data))
		setData({
			username: "",
			email: "",
		});
	};

	const changeInputValue = (event) => {
		setData((prev) => ({
			...prev,
			...{
				[event.target.name]: event.target.value,
			},
		}));
	};

	return (
		<form
			className="login d-flex flex-column justify-content-center align-items-center "
			onSubmit={(event) => submitData(event)}
		>
			{alert && <Alert alertText={alert} />}

			<div className="form-group">
				<label htmlFor="Username">Username</label>
				<input
					placeholder="Username"
					type="text"
					className="form-control"
					name="username"
					value={data.username}
					onChange={(event) => changeInputValue(event)}
					id="Username"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="Password">Password</label>
				<input
					placeholder="Password"
					type="password"
					className="form-control"
					name="email"
					value={data.email}
					onChange={(event) => changeInputValue(event)}
					id="Password"
				/>
			</div>

			<div>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</div>
		</form>
	);
};
