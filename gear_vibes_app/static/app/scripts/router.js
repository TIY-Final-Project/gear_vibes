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
  home: function(){
    this.current = 'home';
  },
  account: function(){
    this.current = 'account';
  },
  dashboard: function(){
    this.current = 'dashboard';
  },
  createreview: function(){
    this.current = 'createreview';
  },
  reviewDetail: function(id){
    this.current = 'reviewDetail';
    this.reviewId = id;
  }

});




module.exports = new Router();
