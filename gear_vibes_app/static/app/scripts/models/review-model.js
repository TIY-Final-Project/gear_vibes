/* user-model js */

// 3rd party
var $ = require('jquery');
var Backbone = require('backbone');



// local


var ReviewsModel = Backbone.Model.extend({

});


var ReviewsCollection = Backbone.Collection.extend({
  model: ReviewsModel,
  url: '/api/reviews/'
});



module.exports = {
  ReviewsModel: ReviewsModel,
  ReviewsCollection: ReviewsCollection
};
