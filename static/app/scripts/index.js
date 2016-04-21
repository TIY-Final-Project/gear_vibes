/* main js */

// 3rd party
window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone')
var React = require('react');
var ReactDOM = require('react-dom');

// CSRFtoken
var csrftoken = $("input[name='csrfmiddlewaretoken']").val();

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
if(localStorage.getItem('token')){
  $.ajaxSetup({
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
      },
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
  });
}


// local
var Interface = require('./components/interface.jsx');
var userModel = require('./models/user-model');
var router = require('./router');

var user = new userModel.UserModel();

var currentUser = localStorage.getItem('username');



Backbone.history.start();


ReactDOM.render(
  React.createElement(Interface, {user: user, router: router, currentUser: currentUser}),
  document.getElementById('app')
);
