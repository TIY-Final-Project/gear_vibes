/* review-detail jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Button = require('react-bootstrap/lib/Button');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local
var models = require('../models/review-model.js');




var ReviewDetail = React.createClass({
  getInitialState: function(){
    return {
      review: new models.ReviewsModel()
    }
  },
  componentWillMount: function(){
    var self = this;
    var review = new models.ReviewsModel({id: this.props.router.reviewId});
    console.log('first review:', review);
    review.fetch().then(function(data){
      self.setState({review: review});
    });
  },
  render: function(){
    console.log(this.state.review);
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
                <RatingTable review={this.state.review}/>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
});



var RatingTable = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var ratings = this.props.review.get('rating');

    // If no ratings then return an empty div
    if(!ratings){
      return (<div className="hide" />);
    }

    var ratingList = ratings.map(function(rating){
      return (
        <li key={rating.title}>
          <div><span>{rating.title}</span><span>{rating.value}</span></div>
          <ProgressBar now={rating.value*10} />
        </li>
      );
    });

    return (
      <div>
        {ratingList}
      </div>
    )
  }
});




module.exports = ReviewDetail;
