import React from 'react';
import './Movie.css';

export default function Movie(props) {
	return (
		<div className="Movie">
			<h2>{props.App}</h2>
			<div className="item">
				Title: {props.film_title}
				<br />
				Genre: {props.genre}
				<br />
				Country: {props.country}
				<br />
				Average Vote: {props.avg_vote}
			</div>
		</div>
	);
}
