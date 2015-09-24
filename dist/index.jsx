var React = require('../bower_components/react/react.js');

var Text = React.createClass({
  render: function () {
    render (
      React.createClass('h1', null, ["Hello"])
    )
  }
});

React.render(Text(), document.body);
