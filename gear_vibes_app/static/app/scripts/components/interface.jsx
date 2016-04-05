/* interface jsx */

// 3rd party
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');


// local
var LoginComponent = require('./login.jsx');


var Interface = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (

      <LoginComponent />

    )
  }
});




module.exports = Interface;
