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

var Dashboard = React.createClass({
  getInitialState: function(){
    return {
      profile: new models.UserProfile()
    }
  },
  componentWillMount: function(){
    var self = this;
    var profile = new models.UserProfile();
    profile.fetch().then(function(data){
      self.setState({profile: profile});
    });
  },
  render: function(){
    return (
      <div>

        <div className="profile-header row-fluid">

          <div className="avatar-wrapper col-xs-3">
            <Image src="https://unsplash.it/300/300/?random" responsive />
          </div>
          <div className="header-content col-xs-9">
            <h1>Brandon Emerson</h1>
            <p>Vibing since Sep 06, 2011</p>
          </div>
        </div>

          <div className="dash-content row-fluid">
            <div className="dash-sidebar-wrapper col-xs-3">
              <div className="total-posts">
                <h3>20</h3>
                <p>posts</p>
              </div>
              <div className="bio">
                <h3>About <span>Brandon</span></h3>
                <p>
                  Special cloth alert. The key to success is to keep your head above the water, never give up. They never said winning was easy. Some people can’t handle success, I can. Learning is cool, but knowing is better, and I know the key to success. In life there will be road blocks but we will over come it. They don’t want us to eat. Wraith talk. Stay focused. The other day the grass was brown, now it’s green because I ain’t give up. Never surrender.
                </p>
              </div>
              <div className="profile-catagories">
                <h3>Contributed to</h3>
                <p>Music Gear</p>
              </div>
            </div>
            <div className="posts-content col-xs-9">
              <h1>Reviews</h1>
              <ul className="posts-list">
                <li className="posts-list-item">
                  <span className="posts-list-catagory">Mobile Tech</span>
                  <div className="post-title-wrapper">
                    <h3 className="post-item-title">
                      <a href="#">Apple&#39;s iPad Review</a>
                    </h3>
                  </div>
                  <span className="post-item-time">2 days ago</span>
                </li>
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


module.exports = Dashboard;
