var React = require('../bower_components/react/react.js');

var LOW_TYPE = 'low';

var Notifications = React.createClass({
  componentDidMount: function ()
  {
    window.ListNotifications.addListener('add-notification', this.addNotification);
    window.ListNotifications.addListener('show-history', this.showHistory);
    window.ListNotifications.addListener('hide-history', this.hideHistory);
  },
  getInitialState: function ()
  {
    return {
      data: [],
      unreadedCount: 0,
      showHistory: false
    };
  },
  addNotification: function (notification)
  {
    var date = new Date();
    notification.date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    notification.id = 'not' + this.state.data.length;
    notification.readed = false;
    var unreadedCount = this.state.unreadedCount;
    if (notification.type !== LOW_TYPE) {
      unreadedCount++;
    }
    this.setState({
      data: this.state.data.concat([notification]),
      unreadedCount: unreadedCount
    });
    window.ListNotifications.trigger('change-unreaded-count', unreadedCount);
  },
  showHistory: function ()
  {
    this.setState({showHistory: true});
  },
  hideHistory: function ()
  {
    this.setState({showHistory: false});
  },
  handleCloseNotification: function (notification)
  {
    var unreadedCount = this.state.unreadedCount;
    var newStateData = this.state.data.map(function (item)
    {
      if (item.id === notification.id) {
        item.readed = true;
        if (notification.type !== LOW_TYPE) {
          unreadedCount--;
        }
      }
      return item;
    });
    this.setState({
      data: newStateData,
      unreadedCount: unreadedCount
    });
    window.ListNotifications.trigger('change-unreaded-count', unreadedCount);
  },
  render: function ()
  {
    var showHistory = this.state.showHistory;
    var notificationsUnReaded = this.state.data.filter(function (notification)
    {
      return notification.readed === false && ((notification.type !== LOW_TYPE && showHistory === false) || notification.type === LOW_TYPE);
    });
    var notificationsHighPriority = this.state.data.filter(function (notification)
    {
      return notification.type !== 'low';
    });
    var boundCloseNotification = this.handleCloseNotification;
    return (
      <div className="notifications">
        <NotificationList closeNotification={this.handleCloseNotification} data={notificationsUnReaded} />
        <NotificationList isShowHistory={this.state.showHistory} closeNotification={this.handleCloseNotification} data={notificationsHighPriority} listType="history" />
      </div>
    );
  }
});

var NotificationList = React.createClass({
  render: function ()
  {
    var listType = this.props.listType || 'newbox';
    var closeNotification = this.props.closeNotification;
    var data = this.props.data.reverse()
    var countImportantMessages = 0;
    if (listType !== 'history') {
      data = data.filter(function (notification)
      {
        if (notification.type !== 'low' && countImportantMessages++ > 0) {
          return false;
        }
        return true;
      });
    }
    var historyStyles = {
      display: (listType !== 'history' || this.props.isShowHistory ? 'block' : 'none')
    };
    var notificationNodes = data.map(function (notification, index)
    {
      return (
        <Notification listType={listType} closeNotification={closeNotification} notification={notification} notificationLength={countImportantMessages} key={'notification' + index} />
      );
    });
    var className = 'notifications__list' + (listType === 'history' ? ' notifications__list--history' : '');
    return (
      <div style={historyStyles} className={className}>
        {notificationNodes}
      </div>
    );
  }
});

var Notification = React.createClass({
  handleCloseNotification: function ()
  {
    this.props.closeNotification(this.props.notification);
  },
  render: function ()
  {
    var rightElement;
    if (this.props.listType !== 'history') {
      if (this.props.notification.type === LOW_TYPE || this.props.notificationLength < 2) {
        rightElement = (
          <div className="notifications__button notifications__button--close">
            <button className="notifications__close" onClick={this.handleCloseNotification}></button>
          </div>
        )
      }
      else {
        rightElement = (
          <div className="notifications__button notifications__button--show-next">
            <button className="notifications__read-next" onClick={this.handleCloseNotification}>{this.props.notificationLength}</button>
          </div>
        )
      }
    }
    else {
      rightElement = (
        <div className="notifications__button notifications__button--date">{this.props.notification.date}</div>
      )
    }
    return (
      <div className="notifications__item">
        {rightElement}
        <div className="notifications__desc">{this.props.notification.desc}</div>
      </div>
    );
  }
});

React.render(<Notifications />, document.body.getElementsByClassName('notifications')[0]);
