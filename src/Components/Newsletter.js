import React, { Component } from "react";

class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", emailValid: false, submitted: false };

    this.onEmailFormChange = this.onEmailFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail(email) {
    let result = false;
    //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (/^\S+@\S+\.\S+$/.test(String(email).toLowerCase())) {
      result = true;
    }

    this.setState({ emailValid: result });
  }

  onEmailFormChange(event) {
    this.setState({ emailInput: event.target.value });
    this.validateEmail(event.target.value);
    //console.log(this.validateEmail(event.target.value));
  }

  handleSubmit() {
    this.setState({ submitted: true });
  }

  render() {
    return (
      <div className="container">
        <div>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Newsletter</legend>
              <div className="form-group">
                <label for="email">Email address</label>
                <input
                  className="form-control"
                  type="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={this.onEmailFormChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!this.state.emailValid}
                onClick={this.handleSignUpButtonClick}
              >
                Submit
              </button>
              <br />
              {!this.state.emailValid && (
                <alert>PLEASE ENTER A VALID EMAIL ADDRESS</alert>
              )}
              {this.state.emailValid && <alert>THANKS!</alert>}
            </fieldset>
          </form>
        </div>
        
        {this.state.submitted && (
          <div className="alert alert-dismissible alert-success">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>Well done!</strong>
          </div>
        )}
      </div>
    );
  }
}

export default Newsletter;
