import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class MovieCard extends React.Component {
  
  state = {
    movie: null,
  };
  
  componentDidMount() {
    
    // var url = window.location.pathname;
    // const id = url.substring(url.lastIndexOf('/') + 1);
    const id = this.props.match.params.id;
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then(response => this.setState(() => ({ movie: response.data })))
    .catch(error => {
      console.error(error);
    });
  }
  
  render() {
    if(!this.state.movie) {
      return <div>Loading movie information...</div>
    }
    console.log(this.state.movie.id);
    
    const { title, director, metascore, stars } = this.state.movie;
    return (
      <div className="movie-card">
        <NavLink to="/" >
        Back to Movie List
        </NavLink> 
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
    );
  }
}
