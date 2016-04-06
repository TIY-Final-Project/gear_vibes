/* router js */

// 3rd party
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

//local


var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'account': 'account',
    'login': 'login',
    'userdash': 'userdash',
    'userdash/createreview': 'createreview'
  },
  home: function(){

  },
  account: function(){
    this.current = 'account';
  },
  login: function(){

  },
  userdash: function(){

  },
  createreview: function(){

  }

});




module.exports = new Router();
