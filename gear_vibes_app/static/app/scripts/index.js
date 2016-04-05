/* main js */

// 3rd party
var $ = require('jquery');
var Backbone = require('backbone')
var React = require('react');
var ReactDOM = require('react-dom');


// local
var Interface = require('./components/interface.jsx');


Backbone.history.start();


ReactDOM.render(
  React.createElement(Interface),
  document.getElementById('app')
);
