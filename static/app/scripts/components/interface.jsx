/* interface jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');


// local

// components
var AccountComponent = require('./account.jsx');
var Dashboard = require('./dashboard.jsx');
var HomePage = require('./homepage.jsx');
var CreateReview = require('./create-review.jsx');
var ReviewDetail = require('./review-detail.jsx');

// models
var models = require('../models/user-model.js');


// CSRFtoken
var csrftoken = $("input[name='csrfmiddlewaretoken']").val();

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});




var Interface = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      router: this.props.router
    }
  },
  componentWillMount: function(){
  this.callback = (function(){
    this.forceUpdate();
  }).bind(this);
  this.state.router.on('route', this.callback);
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },
  createReview: function(e){
    e.preventDefault();
    Backbone.history.navigate('dashboard/reviews/create', {trigger: true});
  },
  createAccount: function(e){
    e.preventDefault();
    Backbone.history.navigate('account', {trigger: true});
  },
  logout:function(e){
    e.preventDefault();
    localStorage.removeItem("username");
    Backbone.history.navigate('', {trigger: true});
  },
  login: function(e){
    e.preventDefault();
    var credentials = new models.Credentials();
    var user = this.props.user;
    var username = $('#login-username').val();
    var password = $('#login-password').val();
    credentials.set("username", username);
    credentials.set("password", password);
    credentials.save().then(function(data){
      if (data.token){
        user.set("token", data.token);
        user.auth();
        localStorage.setItem("username", username)

        Backbone.history.navigate('dashboard', {trigger: true});
      }else{
        console.log('failed');
      };
    });

  },
  signUp: function(e){
    e.preventDefault();
    var user = this.props.user;
    var email = $('#signup-email').val();
    var username = $('#signup-username').val();
    var password = $('#signup-password').val();
    user.set("email", email);
    user.set("username", username);
    user.set("password", password);
    user.save().then(function(data){
      if (data.success){
        user.set(data.user);
      };
    });
    console.log(user);
  },
  render: function(){
    var currentRoute;
    var routing = this.props.router;
    if (routing.current == 'home'){
      currentRoute = <HomePage
                        router={this.props.router}
                        createAccount={this.createAccount}
                      />
    } else if (routing.current == 'account'){
      currentRoute = <AccountComponent
                        login={this.login}
                        signUp={this.signUp}
                        router={this.props.router}
                      />
    } else if (routing.current == 'dashboard'){
      currentRoute = <Dashboard createReview={this.createReview} logout={this.logout}/>
    } else if (routing.current == 'createreview'){
      currentRoute = <CreateReview router={this.props.router}/>
    }else if (routing.current == 'reviewDetail'){
      currentRoute = <ReviewDetail router={this.props.router}/>
    }

    return (
      <div className="row">
        {currentRoute}
      </div>
    )
  }
});




module.exports = Interface;