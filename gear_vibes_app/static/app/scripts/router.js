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
    'dashboard/edit': 'dashboardEdit',
    'dashboard/reviews/create': 'createReview',
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
  dashboardEdit: function(){
    this.current = 'dashboardEdit';
    this.requireLogin();

  },
  createReview: function(){
    this.current = 'createReview';
    this.requireLogin();
  },
  reviewDetail: function(id){
    this.current = 'reviewDetail';
    this.reviewId = id;
    console.log(this.id);
  }

});




module.exports = new Router();
