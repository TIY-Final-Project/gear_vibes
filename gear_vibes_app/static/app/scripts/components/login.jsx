/* interface jsx */

// 3rd party
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');


// local



var LoginComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="login-form-container col-md-4 col-md-offset-4">
            <h2 className="text-center">Gear-Vibes</h2>

            <form className="login-form">
              <input type="text" className="form-control login-username" name="username" placeholder="Username"/>
              <input type="password" className="form-control login-password" name="password" placeholder="Password"/>
              <button className="btn btn-lg btn-primary btn-block">Login</button>
            </form>

            <div className="or-container row">
              <div className="col-md-12">
                <span className="or-border col-md-5"></span>
                <span className="or-txt col-md-2 text-center">Or</span>
                <span className="or-border col-md-5"></span>
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

          </div>
        </div>
      </div>
    )
  }
});



module.exports = LoginComponent;
