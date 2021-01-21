import React from "react";
import { connect } from "react-redux";
import { createArticle, showAlert, getUser, redirect } from "../redux/actions";
import { Alert } from "./Alert";

class ArticleForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			body: "",
			user: getUser(),
			articlesCounter: 1,
		};
	}

	addArticle = (event) => {
		event.preventDefault();

		const { title } = this.state;
		const { body } = this.state;
		const { user } = this.state;
		let { articlesCounter } = this.state;

		if (!title.trim() || !body.trim()) {
			return this.props.showAlert("Fields can't be empty!");
		} else if (user === null) {
			return redirect("http://localhost:3000/login/");
		}
		this.setState({articlesCounter: this.state.articlesCounter+1})

		const newArticle = {
			userId: user.id,
			id: this.state.articlesCounter,
			title,
			body,
		};

		this.props.createArticle(newArticle);
		this.setState({ title: "", body: "" });
	};

	changeInputValue = (event) => {
		this.setState((prev) => ({
			...prev,
			...{
				[event.target.name]: event.target.value,
			},
		}));
	};

	render() {
		return (
			<form onSubmit={this.addArticle}>
				{this.props.alert && <Alert alertText={this.props.alert} />}

				<div className="form-group">
					<label htmlFor="title">Article Title</label>
					<input
						placeholder="Title"
						type="text"
						className="form-control"
						name="title"
						value={this.state.title}
						onChange={this.changeInputValue}
						id="title"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="body">Article Body</label>
					<textarea
						className="form-control"
						placeholder="Body"
						id="body"
						rows="3"
						name="body"
						value={this.state.body}
						onChange={this.changeInputValue}
					></textarea>
				</div>

				<button type="submit" className="btn btn-primary">
					Add
				</button>
			</form>
		);
	}
}

const mapDispatchToProps = {
	createArticle,
	showAlert,
};

const mapStateToProps = (state) => ({
	alert: state.app.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);
