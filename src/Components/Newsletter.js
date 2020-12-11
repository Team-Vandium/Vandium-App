import React, { Component } from "react";
import { GiStarSwirl } from "react-icons/gi";
import { Link } from "react-router-dom";

class Newsletter extends Component {
  /*
   * A newsletter page, where a visitor can sign up for a weekly newsletter.
   * Nothing actually gets emailed to the person.
   * Email address will be validated and checked against existing mailing list.
   * If it's a new address it will be added to the mailing list.
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      emailValid: false,
      emailExists: false,
      submitted: false,
      clearToast: false,
    };

    this.onEmailFormChange = this.onEmailFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleToastClose = this.handleToastClose.bind(this);
  }

  validateEmail(email) {
    let result = false;
    /*
     * Trying various examples of regex to validate the address.
     * Not perfect but does an okay job.
     * from here: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
     */
    //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //if (/^\S+@\S+\.\S+$/.test(String(email).toLowerCase())) {

    const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+_.-]+\.[a-zA-Z]{2,}$/;

    if (re.test(String(email).toLowerCase())) {
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
    // if the email address exists, handle it
    let found = this.props.emails.find(
      (e) => e.address === this.state.emailInput
    );
    // found email address
    if (found !== undefined) {
      //console.log(found.address);
      this.setState({ emailExists: true });
    }
    // new email address
    else {
      //console.log("new email address");
      this.props.addItemToEmails(this.state.emailInput);
    }

    this.setState({ submitted: true });
  }

  handleToastClose() {
    this.setState({ clearToast: true });
  }

  render() {
    return (
      <div className="container">
        <div>
          {!this.state.submitted && (
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
          )}
          {
            // Email submitted and was not already on list
            this.state.submitted && !this.state.emailExists && (
              <p>
                <br />
                Thank you! You will receive the weekly newsletter to{" "}
                {this.state.emailInput}.
                <Link to="/">
                  <br></br>
                  <GiStarSwirl></GiStarSwirl> Start shopping Irish products
                  now...
                </Link>
              </p>
            )
          }
          {
            // Email submitted but already on mailing list
            this.state.submitted && this.state.emailExists && (
              <p>
                <br />
                {this.state.emailInput} is already on our mailing list.
                <br />
                <br />
                {/* Allow the user re-enter if they want to */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      emailInput: "",
                      emailValid: false,
                      emailExists: false,
                      submitted: false,
                    });
                  }}
                >
                  Click here to re-enter.
                </button>
              </p>
            )
          }
        </div>
      </div>
    );
  }
}

export default Newsletter;
