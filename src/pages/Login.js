import React, { Component } from 'react';
import {createRequestToken, login} from '../api';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            isSubmitting: false,
            username: '',
            password: ''
        };
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    submit() {
        createRequestToken().then(({data}) => {
            console.log(data);
            if (data.success) {
                login(this.state.username, this.state.password, data.request_token).then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        this.props.loadSession(response.data.request_token);
                    }
                })
            }
        })
    }
    componentDidMount() {
        this.submit();
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">
                        Login
                    </h1>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" onChange={this.handleInputChange} value={this.state.username} name="username" type="text" placeholder="Username"/>
                            <span className="icon is-small is-left">
                              <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" onChange={this.handleInputChange} value={this.state.password} name="password" type="password" placeholder="Password"/>
                            <span className="icon is-small is-left">
                              <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="control">
                        <button className="button is-primary" onClick={this.submit}>Submit</button>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;
