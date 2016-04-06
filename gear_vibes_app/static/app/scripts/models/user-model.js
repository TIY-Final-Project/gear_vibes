/* user-model js */

// 3rd party
var $ = require('jquery');
var Backbone = require('backbone');



// local

var Credentials = Backbone.Model.extend({
  urlRoot: '/api/login/'
});


var UserModel = Backbone.Model.extend({
  urlRoot: '/api/signup/'
});




module.exports = {
  Credentials: Credentials,
  UserModel: UserModel
};
