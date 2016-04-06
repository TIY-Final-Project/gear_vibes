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
    'dashboard': 'dashboard',
    'dashboard/createreview': 'createreview'
  },
  home: function(){
    this.current = 'home';
  },
  account: function(){
    this.current = 'account';
  },
  login: function(){

  },
  dashboard: function(){
    this.current = 'dashboard';
  },
  createreview: function(){
    this.current = 'createreview';
  }

});




module.exports = new Router();
