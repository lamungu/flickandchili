import React, { Component } from 'react';
import {findMovie} from '../api';
import List from "../components/List";

class SearchMovies extends Component {

    constructor() {
        super();

        this.state = {
            search: '',
            movies: []
        };

        this.submitSearch = this.submitSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    submitSearch() {
        console.log(this.state.search);
        findMovie(this.state.search).then(({data}) => {
            this.setState({
                movies: data.results
            });
        });
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyPress (event) {
      if (event.key === 'Enter') {
          this.submitSearch(event);
      }
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="field">
                        <div className="control is-large">
                            <input className="input is-large" name="search" value={this.state.search} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} type="text" placeholder="Search Movie"/>
                        </div>
                    </div>
                    <List own={false} movies={this.state.movies}/>
                </div>
            </section>
        );
    }
}

export default SearchMovies;
