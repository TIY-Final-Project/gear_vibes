/* dashboardEdit jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local


var DashboardEdit = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      first_name: '',
      last_name: '',
      bio: '',
      facebook_link: '',
      twitter_link: '',
      instagram_link: ''
    }
  },
  handleSubmit: function(){
    
  },
  render: function(){
    return (
      <div className="col-xs-6 col-xs-offset-3 text-center">
        <form onSubmit={this.handleSubmit} method="PUT">
          <Input type="file" help="Upload Profile Picture" />
          <Input type="text" placeholder="First name" valueLink={this.linkState('first_name')}/>
          <Input type="text" placeholder="Last name" valueLink={this.linkState('last_name')}/>
          <Input type="textarea" placeholder="Bio" valueLink={this.linkState('bio')}/>
          <Input type="url" placeholder="Facebook" valueLink={this.linkState('facebook_link')}/>
          <Input type="url" placeholder="Twitter" valueLink={this.linkState('twitter_link')}/>
          <Input type="url" placeholder="Instagram" valueLink={this.linkState('instagram_link')}/>
          <ButtonInput type="submit" value="Update Profile" />
        </form>
      </div>
    )
  }
});




module.exports = DashboardEdit;
