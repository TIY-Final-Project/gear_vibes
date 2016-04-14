/* dashboard jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var Image = require('react-bootstrap/lib/Image');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local
var models = require('../models/userProfileModel.js');
var collection = require('../models/userReviewsModel.js');

var Dashboard = React.createClass({
  getInitialState: function(){
    return {
      profile: new models.UserProfile(),
      reviews: new collection.UserReviewsCollection()
    }
  },
  componentWillMount: function(){
    var self = this;
    var profile = new models.UserProfile();
    var reviews = new collection.UserReviewsCollection();
    profile.fetch().then(function(data){
      self.setState({profile: profile});
    });
    reviews.fetch().then(function(data){
      self.setState({reviews: reviews});
    });

  },
  render: function(){
    var profile = this.state.profile;
    var reviews = this.state.reviews;



    if (!profile){
      return (<div className="hide" />);
    }





    return (

      <div>

        <div className="profile-header row-fluid">

          <div className="avatar-wrapper col-xs-3 col-lg-3">
            <Image id="avatar" src={profile.get('profile_photo')} responsive />
          </div>
          <div className="header-content col-xs-9 col-lg-9">
            <h1>{profile.get('first_name')} {profile.get('last_name')}</h1>
            <p>Vibing since {profile.get('joined')}</p>
          </div>
        </div>

          <div className="dash-content row-fluid">
            <div className="dash-sidebar-wrapper col-xs-3 col-lg-3">
              <div className="total-posts">
                <h3>{profile.get('total_posts')}</h3>
                <p>posts</p>
              </div>
              <div className="bio">
                <h3>About <span>{profile.get('first_name')}</span></h3>
                <p>
                  {profile.get('bio')}
                </p>
              </div>
              <div className="profile-catagories">
                <h3>Contributed to</h3>
                <p>Music Gear</p>
              </div>
            </div>
            <div className="posts-content col-xs-9 col-lg-9">
              <h1>Reviews</h1>
              <ul className="posts-list">
                <ReviewListComponent reviews={reviews} />
              </ul>
            </div>
          </div>

          <div className="row-fluid">
            <div className="create-wrapper col-xs-4">
              <ButtonInput onClick={this.props.createReview} value="Create Review"/>
            </div>
            <div className="logout-wrapper col-xs-4">
              <ButtonInput onClick={this.props.logout} value="Logout"/>
            </div>
            <div className="edit-wrapper col-xs-4">
              <ButtonInput onClick={this.props.editDash} value="Edit"/>
            </div>
          </div>
      </div>
    )
  }
});



var ReviewListComponent = React.createClass({
  render: function(){
    var reviews = this.props.reviews;

    if (!reviews){
      return (<div className="hide" />);
    }
    console.log(reviews);
    var reviewListing = reviews.map(function(reviews){
      console.log('IN MAP: ')
    });

    return (
      <li className="posts-list-item">
        <span className="posts-list-catagory">Mobile Tech</span>
        <div className="post-title-wrapper">
          <h3 className="post-item-title">
            <a href="#">Apple&#39;s iPad Review</a>
          </h3>
        </div>
        <span className="post-item-time">2 days ago</span>
      </li>
    )
  }
});



module.exports = Dashboard;
