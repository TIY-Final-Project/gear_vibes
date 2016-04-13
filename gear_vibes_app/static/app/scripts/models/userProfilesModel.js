/* userProfilesModel js */

// 3rd party
var Backbone = require('backbone');



// local


var UserProfiles = Backbone.Model.extend({
  urlRoot: '/api/userprofiles/'
});
