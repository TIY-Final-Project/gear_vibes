/* interface jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local



var AccontComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      email: '',
      username: '',
      password: '',
      toggleSignUp: false
    };
  },
  toggleSignUp: function(e){
    e.preventDefault();
    this.setState({toggleSignUp: !this.state.toggleSignUp});
  },
  render: function(){
    return (
      <div>

        <div className="row">
          <div className="login-form-container col-xs-4 col-xs-offset-4">
            <h2 className="text-center">Gear-Vibes</h2>

            <form onSubmit={this.props.login} className="login-form">
              <Input type="username" placeholder="Username" id="login-username" valueLink={this.linkState('username')}/>
              <Input type="password" placeholder="Password" id="login-password" valueLink={this.linkState('password')}/>
              <ButtonInput type="submit" value="Login"/>
            </form>

            <div className="or-container row">
              <div className="col-xs-12">
                <span className="or-border col-xs-5"></span>
                <span className="or-txt col-xs-2 text-center">Or</span>
                <span className="or-border col-xs-5"></span>
              </div>
            </div>

            <div className="other-login-container row">
              <a href={socialAuthUrls.facebook}>
                <button className="center-block">
                  <i className="fa fa-facebook-official" id="facebook-icon"></i>
                  <span className="facebook-txt">Log in with Facebook</span>
                </button>
              </a>
            </div>

            <div className="account-link-container row">
              <p className="text-center">
                <span>Don&#39;t have and account?</span>
                <a> Sign Up</a>
              </p>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="signup-form-container col-xs-4 col-xs-offset-4">

            <div className="other-signup-container row">
              <a href={socialAuthUrls.facebook}>
                <button className="center-block">
                  <i className="fa fa-facebook-official" id="facebook-icon"></i>
                  <span className="facebook-txt">Log in with Facebook</span>
                </button>
              </a>
            </div>

            <div className="or-container row">
              <div className="col-xs-12">
                <span className="or-border col-xs-5"></span>
                <span className="or-txt col-xs-2 text-center">Or</span>
                <span className="or-border col-xs-5"></span>
              </div>
            </div>

            <h2 className="text-center">Gear-Vibes</h2>

            <form onSubmit={this.props.signUp} className="signup-form">
              <Input type="email" placeholder="Email" id="signup-email" valueLink={this.linkState('email')}/>
              <Input type="username" placeholder="Username" id="signup-username" valueLink={this.linkState('username')}/>
              <Input type="password" placeholder="Password" id="signup-password" valueLink={this.linkState('password')}/>
              <ButtonInput type="submit" value="Sign up"/>
            </form>

            <div className="login-link-container row">
              <p className="text-center">
                <span>Already have an account?</span>
                <a> Log in</a>
              </p>
            </div>

          </div>
        </div>
      </div>

    )
  }
});



module.exports = AccontComponent;
