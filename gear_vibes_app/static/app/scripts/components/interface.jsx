/* interface jsx */

// 3rd party
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');


// local
var AccountComponent = require('./account.jsx');


var Interface = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  login: function(e){
    e.preventDefault();
    
  },
  signUp: function(e){
    e.preventDefault();

  },
  render: function(){
    return (

      <AccountComponent login={this.login} signUp={this.signUp}/>

    )
  }
});




module.exports = Interface;
