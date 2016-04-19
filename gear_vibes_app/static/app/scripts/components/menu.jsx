/* menu jsx */

// 3rd party
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
require('backbone-react-component');


// local



var MenuComponent = React.createClass({

  render: function(){

    if(this.props.toggleMenu){
      return (
        <div className="menu-outer">
          <div className="menu-inner row-fluid">
            
          </div>
        </div>
      )
    }else{
      return (
        <div className="hidden"></div>
      )
    }

  }
});






module.exports = MenuComponent;
