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


var Dashboard = React.createClass({
  render: function(){
    return (
      <div>

        <div className="profile-header row-fluid">

          <div className="avatar-wrapper col-xs-3">
            <Image src="https://unsplash.it/300/300/?random" responsive />
          </div>
          <div className="col-xs-9">
            <h1>Brandon Emerson</h1>
            <p>Vibing since Sep 06, 2011</p>
          </div>
        </div>  

          <div className="dash-content row-fluid">
            <div className="dash-sidebar-wrapper col-xs-3">

            </div>
          </div>

          <div className="row-fluid">
            <div className="create-wrapper col-xs-6">
              <ButtonInput onClick={this.props.createReview} value="Create Review"/>
            </div>
            <div className="logout-wrapper col-xs-6">
              <ButtonInput onClick={this.props.logout} value="Logout"/>
            </div>
          </div>




      </div>


    )
  }
});


module.exports = Dashboard;
