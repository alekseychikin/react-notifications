var React = require('../bower_components/react/react.js');

var LOW_TYPE = 'low';

var Notifications = React.createClass({displayName: "Notifications",
  getInitialState: function ()
  {
    return {
      data: [
        {
          desc: 'Спасибо, что вы есть!',
          type: 'low',
          id: 'not1',
          readed: 0
        },
        {
          desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
          type: 'hight',
          id: 'not2',
          readed: 0
        },
        {
          desc: 'Идите нахер!',
          type: 'low',
          id: 'not3',
          readed: 0
        },
        {
          desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
          type: 'hight',
          id: 'not4',
          readed: 1
        },
        {
          desc: 'Вы получили купон на скидку 7%!',
          type: 'hight',
          id: 'not5',
          readed: 0
        },
        {
          desc: 'Вы удалили свою шару, поэтому хрен вам, а не купон! Убейтесь головой об стену. Читайте внимательнее правила. Какой же вы неудачник, всему нашему офису стыдно за вас. Фу бля, весь день испоганил :(',
          type: 'hight',
          id: 'not6',
          readed: 1
        }
      ]
    };
  },
  handleCloseNotification: function (notificationIndex)
  {
    console.log(notificationIndex);
  },
  render: function ()
  {
    var notificationsUnReaded = this.state.data.filter(function (notification)
    {
      return notification.type !== LOW_TYPE;
    });
    var notificationsReaded = this.state.data.filter(function (notification)
    {
      return notification.type !== LOW_TYPE;
    });
    var boundCloseNotification = this.handleCloseNotification.bind(this);
    return (
      React.createElement("div", {className: "notifications"}, 
        React.createElement(NotificationList, {closeNotification: boundCloseNotification, data: notificationsUnReaded}), 
        React.createElement(NotificationList, {closeNotification: boundCloseNotification, data: notificationsReaded, listType: "history"})
      )
    );
  }
});

var NotificationList = React.createClass({displayName: "NotificationList",
  render: function ()
  {
    var notificationLength = this.props.data.length;
    var closeNotification = this.props.closeNotification;
    console.log(closeNotification);
    var notificationNodes = this.props.data.map(function (notification, index)
    {
      return (
        React.createElement(Notification, {closeNotification: closeNotification, notification: notification, notificationLength: notificationLength, key: index})
      );
    });
    return (
      React.createElement("div", {className: "notifications__list"}, 
        notificationNodes
      )
    );
  }
});

var Notification = React.createClass({displayName: "Notification",
  closeNotification: function ()
  {
    this.props.closeNotification(this.props.notification);
  },
  render: function ()
  {
    var rightElement;
    if (this.props.notification.type === LOW_TYPE) {
      rightElement = (
        React.createElement("div", {className: "notifications__button notifications__button--close"}, 
          React.createElement("button", {className: "notifications__close", onClick: this.props.closeNotification})
        )
      )
    }
    else {
      rightElement = (
        React.createElement("div", {className: "notifications__button notifications__button--show-next"}, this.props.notificationLength)
      )
    }
    return (
      React.createElement("div", {className: "notifications__item"}, 
        rightElement, 
        React.createElement("div", {className: "notifications__desc"}, this.props.notification.desc)
      )
    );
  }
});

React.render(React.createElement(Notifications, null), document.body.getElementsByClassName('notifications')[0]);
