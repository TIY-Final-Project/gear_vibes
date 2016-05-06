/* loginOut jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local



var LoginOutComponent = React.createClass({
  login: function(e){
    e.preventDefault();
    Backbone.history.navigate('account', {trigger: true});
  },
  logout:function(e){
    e.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem('token');
    Backbone.history.navigate('', {trigger: true});
    location.reload();
  },
  render: function(){


    if (!this.props.user){
      return (
        <span className="login-container">
          <div className="login-link"><span onClick={this.login} className="login-text">Login</span></div>
          <div className="login-border"></div>
        </span>
      )
    }else{
      return (
        <span className="login-container">
          <div className="login-link">
            <span onClick={this.logout} className="login-text">
              Logout
            </span>
          </div>
          <div className="login-border"></div>
        </span>
      )
    }
  }
});




module.exports = LoginOutComponent;
