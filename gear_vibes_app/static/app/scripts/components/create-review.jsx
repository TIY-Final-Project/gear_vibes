/* create-review jsx */

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



var CreateReview = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  render: function(){
    return (
      <div className="col-xs-6 col-xs-offset-3 text-center">
        <form>
          <Input className="center-block" type="file" help="Upload your Featured Image" />
          <Input type="text" placeholder="Product Name" />
          <Input type="text" placeholder="Title" />
          <Input type="textarea" placeholder="Body" />
          <Input type="textarea" placeholder="Block Quote" />
          <Input type="select" defaultValue="Category" placeholder="category">
            <option disabled value="Category">Category</option>
            <option value="mus">Music Gear</option>
            <option value="pho">Photography</option>
            <option value="mob">Mobile Tech</option>
          </Input>
          <Input type="text" placeholder="Tags" />
          <ButtonInput value="Add Tag" />
          <h3>Rating Table</h3>
          <Input type="text" placeholder="Rating Type" />
          <Input type="select" defaultValue="Value" placeholder="Rating Value">
            <option disabled value="Value">Value</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Input>
          <ButtonInput value="Add Rating" />
          <Input type="text" placeholder="Video URL" />
          <Input className="center-block" type="file" help="Upload to Gallery" />
          <ButtonInput type="submit" value="Publish Review" />
        </form>
      </div>
    )
  }
});


var TagsFormset = React.createClass({
  render: function(){
    return (
      <div>

      </div>
    )
  }
});



module.exports = CreateReview;
