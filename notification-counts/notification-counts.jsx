var React = require('../bower_components/react/react.js');

var NotificationCounts = React.createClass({
  componentDidMount: function ()
  {
    window.ListNotifications.addListener('change-unreaded-count', this.changeUnreadedCount);
  },
  changeUnreadedCount: function (value)
  {
    this.setState({count: value});
  },
  getInitialState: function ()
  {
    return {
      count: 0
    };
  },
  handleToggleHistory: function ()
  {
    window.ListNotifications.toggleHistory();
  },
  render: function ()
  {
    var notificationCountsContainClassName = 'notification-counts__contain' + (this.state.count > 0 ? ' notification-counts__contain--active' : '');
    var notificationImgSrc = '/notification-counts/notification-counts__img'  + (this.state.count > 0 ? '--active' : '') + '.svg';
    return (
      <div className={notificationCountsContainClassName} onClick={this.handleToggleHistory}>
        <img className="notification-counts__img" src={notificationImgSrc} alt="" />
        <span className="notification-counts__numbers">{this.state.count}</span>
      </div>
    );
  }
});

React.render(<NotificationCounts />, document.body.getElementsByClassName('notification-counts')[0]);
