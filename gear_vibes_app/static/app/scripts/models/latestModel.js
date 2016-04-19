/* latestModel js */

// 3rd party
var Backbone = require('backbone');



// local




var LatestModel = Backbone.Model.extend({

});




var LatestCollection = Backbone.Collection.extend({
  model: LatestModel,
  url: function(){
    console.log(this.category);
    var categoryQS = this.category ? '?category=' + this.category : '';

    return '/api/reviews/latest/' + categoryQS;
  },
  parse: function(data){
    return data;
  }
});




module.exports = {
  LatestModel: LatestModel,
  LatestCollection: LatestCollection
};
