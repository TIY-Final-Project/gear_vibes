/* userReviewsModel js */

// 3rd party
var Backbone = require('backbone');



// local

var UserReviewsModel = Backbone.Model.extend({

});



var UserReviewsCollection = Backbone.Collection.extend({
  model: UserReviewsModel,
  url: '/api/myprofile/reviews/'
});




module.exports = {
  UserReviewsModel: UserReviewsModel,
  UserReviewsCollection: UserReviewsCollection
};
