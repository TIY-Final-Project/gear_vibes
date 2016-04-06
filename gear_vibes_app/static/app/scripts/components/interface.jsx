/* interface jsx */

// 3rd party
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');


// local
var AccountComponent = require('./account.jsx');
var models = require('../models/user-model.js');

var csrftoken = $("input[name='csrfmiddlewaretoken']").val();

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});




var Interface = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      router: this.props.router
    }
  },
  login: function(e){
    e.preventDefault();
    var credentials = new models.Credentials();
    var user = this.props.user;
    var username = $('#login-username').val();
    var password = $('#login-password').val();
    credentials.set("username", username);
    credentials.set("password", password);
    credentials.save().then(function(data){
      if (data.success){
        user.set(data.user);
      };
    });

  },
  signUp: function(e){
    e.preventDefault();
    var user = this.props.user;
    var email = $('#signup-email').val();
    var username = $('#signup-username').val();
    var password = $('#signup-password').val();
    user.set("email", email);
    user.set("username", username);
    user.set("password", password);
    user.save().then(fucntion(data){
      if (data.success){
        user.set(data.user);
      };
    });
    console.log(user);
  },
  render: function(){
    return (

      <AccountComponent
        login={this.login}
        signUp={this.signUp}
        page={this.state.router.current}
      />

    )
  }
});




module.exports = Interface;
