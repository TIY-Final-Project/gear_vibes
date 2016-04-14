/* userProfileModel js */

// 3rd party
var Backbone = require('backbone');



// local


var UserProfile = Backbone.Model.extend({
  urlRoot: '/api/myprofile/'
});


var UserProfileCollection = Backbone.Collection.extend({
  model: UserProfile,
  url: '/api/myprofile/'
});






module.exports = {
  UserProfile: UserProfile,
  UserProfileCollection: UserProfileCollection
};
