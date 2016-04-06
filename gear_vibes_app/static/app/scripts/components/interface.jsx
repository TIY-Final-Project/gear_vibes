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
      console.log(data);
      if (data.success){
        user.set(data.user);
        console.log('success');
      }else{
        console.log('failed');
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
    user.save().then(function(data){
      if (data.success){
        user.set(data.user);
      };
    });
    console.log(user);
  },
  render: function(){
    var currentRoute;
    var routing = this.props.router;
    if (routing.current == 'home'){
      currentRoute = <div>homepage</div>
    } else if (routing.current == 'account'){
      currentRoute = <AccountComponent
                        login={this.login}
                        signUp={this.signUp}
                        router={this.props.router}
                      />
    } else {
      currentRoute = <div>nothing here</div>
    }

    return (
      <div>
        {currentRoute}
      </div>
    )
  }
});




module.exports = Interface;
