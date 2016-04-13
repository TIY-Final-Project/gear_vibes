/* userProfileModel js */

// 3rd party
var Backbone = require('backbone');



// local


var UserProfile = Backbone.Model.extend({
  urlRoot: '/api/myprofile/'
});






module.exports = {
  "UserProfile": UserProfile
};
