/* user-model js */

// 3rd party
var $ = require('jquery');
var Backbone = require('backbone');



// local

var Credentials = Backbone.Model.extend({
  urlRoot: '/api/login/'
});


var UserModel = Backbone.Model.extend({
  urlRoot: '/api/signup/',
  auth: function(){
    var self = this;
    var token = self.get('token');
    if(typeof(token) !== "undefined"){
      $.ajaxSetup({
        headers: {
          'Authorization': 'Token ' + token
        }
      });
    }
  }
});




module.exports = {
  Credentials: Credentials,
  UserModel: UserModel
};
