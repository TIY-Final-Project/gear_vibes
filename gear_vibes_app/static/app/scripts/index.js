/* main js */

// 3rd party
window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone')
var React = require('react');
var ReactDOM = require('react-dom');


// local
var Interface = require('./components/interface.jsx');
var userModel = require('./models/user-model');
var router = require('./router');

var user = new userModel.UserModel();



Backbone.history.start();


ReactDOM.render(
  React.createElement(Interface, {user: user, router: router}),
  document.getElementById('app')
);
