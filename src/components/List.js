import React, { Component } from 'react';
import Movie from './Movie';

export default class List extends Component {
    render() {
        return (
            <div className="columns is-multiline">
                {!this.props.movies ? 'wait' : this.props.movies.map(movie => (<Movie own={this.props.own} key={movie.id} movie={movie}/>))}
            </div>
        );
    }
}



