import React from 'react';
import './App.css';
import config from './config';
import Movie from './Movie/Movie';

// const API_TOKEN = '034d8386-ed3b-11e9-81b4-2a2ae2dbcce4';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			genre: '',
			country: '',
			avg_vote: '',
			sort: '',
			error: null
		};
	}

	handleChange = event => {
		const {
			target: { name, value }
		} = event;
		this.setState({ [name]: value });
	};

	handleSubmit(e) {
		e.preventDefault();
		const baseUrl = config.API_URL;

		const params = [];
		if (this.state.genre) {
			params.push(`genre=${this.state.genre}`);
		}
		if (this.state.country) {
			params.push(`country=${this.state.country}`);
		}

		if (this.state.avg_vote) {
			params.push(`avg_vote=${this.state.avg_vote}`);
		}

		if (this.state.sort) {
			params.push(`sort=${this.state.sort}`);
		}

		const query = params.join('&');
		const url = `${baseUrl}?${query}`;

		console.log('url = ', url);

		fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${config.API_TOKEN}`
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then(data => {
				this.setState({
					movies: data,
					error: null
				});
			})
			.catch(err => {
				this.setState({
					error: 'Sorry, could not get Movies at this time.'
				});
			});
	}

	render() {
		//map over all the Movies
		const Movies = this.state.movies.map((movie, i) => {
			return <Movie {...movie} key={i} />;
		});
		return (
			<main className="App">
				<h1>Movies</h1>
				<h2>Search by Genre OR Coutry OR Avg Vote</h2>
				<div className="Movies">
					<form onSubmit={e => this.handleSubmit(e)}>
						<div>
							<label htmlFor="genre">Genre: </label>
							<select
								id="genre"
								name="genre"
								value={this.state.genre}
								onChange={this.handleChange}
							>
								<option value="">None</option>
								<option value="Action">Action</option>
								<option value="Thriller">Thriller</option>
								<option value="War">War</option>
								<option value="Comedy">Comedy</option>
							</select>
						</div>

						<div>
							<label htmlFor="genre">Country: </label>
							<select
								id="country"
								name="country"
								value={this.state.country}
								onChange={this.handleChange}
							>
								<option value="">None</option>
								<option value="United States">United States</option>
								<option value="Italy">Italy</option>
								<option value="Great Britain">Great Britain</option>
							</select>
						</div>

						<div>
							<label htmlFor="avg_vote">Avg Vote: </label>
							<select
								id="avg_vote"
								name="avg_vote"
								value={this.state.avg_vote}
								onChange={this.handleChange}
							>
								<option value="">None</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
							</select>
						</div>

						<div>
							<label htmlFor="sort">Sort: </label>
							<select id="sort" name="sort" onChange={this.handleChange}>
								<option value="">None</option>
								<option value="film_title">Title</option>
								<option value="avg_vote">Avg Vote</option>
							</select>
						</div>

						<button type="submit">Search</button>
					</form>
					<div className="App_error">{this.state.error}</div>
				</div>
				{Movies}
			</main>
		);
	}
}

export default App;
