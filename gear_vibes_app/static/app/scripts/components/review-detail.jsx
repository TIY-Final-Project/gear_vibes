/* review-detail jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Button = require('react-bootstrap/lib/Button');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local
var models = require('../models/review-model.js');




var ReviewDetail = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      review: new models.ReviewsModel()
    }
  },
  componentWillMount: function(){
    var self = this;
    var review = new models.ReviewsModel({id: this.props.router.reviewId});
    console.log(review);
    review.fetch().then(function(data){
      self.setState({"review": review});
    });
  },
  render: function(){

    return (
      <div>
        <Jumbotron>
          <p>{this.state.review.get('product_name')}</p>
          <h1>{this.state.review.get('title')}</h1>
          <p>{this.state.review.get('category')}</p>
        </Jumbotron>

        <div className="review-body row-fluid">
          <div className="review-text-outer col-xs-7">
            <p className="review-text-content">
              {this.state.review.get('body')}
            </p>
          </div>
          <div className="review-sidebar col-xs-5">
            <div className="bq-wrapper">
              <blockquote>{this.state.review.get('block_quote')}</blockquote>
            </div>
            <div className="review-video-wrapper">
              <img src="https://unsplash.it/435/300/?random"/>
            </div>
            <div className="rating-table-wrapper">
              <ul className="rating-list">
                <li className="rating-list-item">hello</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    )
  }
});




module.exports = ReviewDetail;
