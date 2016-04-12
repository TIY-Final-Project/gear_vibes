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
    'dashboard': 'dashboard',
    'dashboard/reviews/create': 'createreview',
    'dashboard/reviews/:id': 'reviewDetail'
  },
  requireLogin: function(){
    var currentUser = localStorage.getItem("username");
      if (!currentUser) {
        this.navigate('account', {trigger: true});
      }
  },
  home: function(){
    this.current = 'home';
  },
  account: function(){
    this.current = 'account';
    var currentUser = localStorage.getItem("username");
      if (currentUser) {
        this.navigate('dashboard', {trigger: true});
      }
  },
  dashboard: function(){
    this.current = 'dashboard';
    this.requireLogin();
  },
  createreview: function(){
    this.current = 'createreview';
    this.requireLogin();
  },
  reviewDetail: function(id){
    this.current = 'reviewDetail';
    this.reviewId = id;
  }

});




module.exports = new Router();
