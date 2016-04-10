/* review-model js */

// 3rd party
var Backbone = require('backbone');



// local


var ReviewsModel = Backbone.Model.extend({
  urlRoot: '/api/reviews/'
});


var ReviewsCollection = Backbone.Collection.extend({
  model: ReviewsModel,
  url: '/api/reviews/'
});



module.exports = {
  ReviewsModel: ReviewsModel,
  ReviewsCollection: ReviewsCollection
};
