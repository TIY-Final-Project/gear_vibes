/* review-detail jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Button = require('react-bootstrap/lib/Button');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
var ResponsiveEmbed = require('react-bootstrap/lib/ResponsiveEmbed');
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
    review.fetch().then(function(data){
      self.setState({review: review});
    });
  },
  render: function(){

    var detailJumbotron = {
      backgroundImage: 'url(' + this.state.review.get('review_images') + ')',
      borderRadius: 0,
      paddingLeft: 0,
      paddingRight: 0,
    }

    return (
      <div>
        <Jumbotron className="detail-jumbotron" style={detailJumbotron}>
          <div className="detail-jumbotron-inner row-fluid">
            <div className="detail-title col-md-9">
              <h1>{this.state.review.get('title')}</h1>
              <p className="detail-author-wrapper">
                <span className="detail-by">by </span>
                <span className="detail-author">
                  {this.state.review.get('author_name')}
                </span>
                <span className="detail-date">
                  {this.state.review.get('created_at')}
                </span>
              </p>
            </div>
            <div className="detail-scroll-wrapper col-md-3">
              <div className="detail-scroll">
                <span className="">Scroll to read</span>
                <span className="detail-scroll-border"></span>
              </div>
            </div>
          </div>
        </Jumbotron>
        <section className="detail-body-section container">
          <div className="detail-body row">
            <div className="detail-text-outer col-xs-6">
              <div className="detail-intro-header">
                <span className="detail-cat">
                  {this.state.review.get('category_long_form')}
                </span>
              </div>
              <p className="review-text-content">
                {this.state.review.get('intro')}
              </p>
            </div>
            <div className="review-sidebar col-xs-6">
              <div className="review-video-wrapper">
                <iframe className="video embed-responsive-item" src={this.state.review.get('video_url')}></iframe>
              </div>
            </div>
          </div>
          <div className="bq-outer row">
            <div className="bq-wrapper">
              <blockquote>
                <h1>
                  "{this.state.review.get('block_quote')}"
                </h1>
              </blockquote>
            </div>
          </div>
          <div className="detail-second-wrapper row-fluid">
            <div className="second-text-outer col-md-6">
              <p className="second-text-content">
                {this.state.review.get('body')}
              </p>
            </div>
            <div className="rating-table-outer col-md-6">
              <div className="rating-table-wrapper">
                <ul className="rating-list">
                  <RatingTable review={this.state.review}/>
                </ul>
              </div>
            </div>
          </div>
        </section>
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
      console.log(rating);
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
