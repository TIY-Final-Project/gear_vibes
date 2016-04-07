/* dashboard jsx */

// 3rd party
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local


var Dashboard = React.createClass({
  render: function(){
    return (
      <div>
        <ButtonInput onClick={this.props.createReview} value="Create Review"/>
      </div>
    )
  }
});


module.exports = Dashboard;
