import React, { Component } from "react";

class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", emailValid: false, submitted: false, clearToast: false };

    this.onEmailFormChange = this.onEmailFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleToastClose = this.handleToastClose.bind(this);
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

  handleToastClose() {
    this.setState({ clearToast: true })

  }

  render() {
    return (
      <div className="container">
        <div>
          <form>
            <fieldset>
              <legend>Newsletter</legend>
              <p>
                Please enter your email below to sign up for our newsletter,
                bringing you new Irish made products weekly!
              </p>
              <div className="form-group">
                <label for="email">Email address</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={this.onEmailFormChange}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!this.state.emailValid}
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>

              <br />
              {!this.state.emailValid && (
                <div className="alert alert-warning">
                  <p className="mb-0">Please enter a valid email address.</p>
                </div>
              )}
            </fieldset>
          </form>
        </div>

        {this.state.submitted && !this.state.clearToast && (
          <div
            className="toast-show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="mr-auto">Thank you!</strong>
              <button
                type="button"
                className="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="close"
                onClick={this.handleToastClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="toast-body">
              You have successfully signed up for our newsletter.
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Newsletter;
