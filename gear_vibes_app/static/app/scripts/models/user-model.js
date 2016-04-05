/* user-model js */

// 3rd party
var $ = require('jquery');
var Backbone = require('backbone');



// local


var UserModel = Backbone.Model.extend({
  urlRoot: '/api/signup/'
});




module.exports = UserModel;
