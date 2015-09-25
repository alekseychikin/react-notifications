var React = require('../bower_components/react/react.js');

var LOW_TYPE = 'low';

var Notifications = React.createClass({
  getInitialState: function ()
  {
    return {
      data: [
        {
          desc: 'Спасибо, что вы есть!',
          type: 'low',
          id: 'not1',
          readed: false
        },
        {
          desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
          type: 'hight',
          id: 'not2',
          readed: false
        },
        {
          desc: 'Идите нахер!',
          type: 'low',
          id: 'not3',
          readed: false
        },
        {
          desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
          type: 'hight',
          id: 'not4',
          readed: true
        },
        {
          desc: 'Вы получили купон на скидку 7%!',
          type: 'hight',
          id: 'not5',
          readed: false
        },
        {
          desc: 'Вы удалили свою шару, поэтому хрен вам, а не купон! Убейтесь головой об стену. Читайте внимательнее правила. Какой же вы неудачник, всему нашему офису стыдно за вас. Фу бля, весь день испоганил :(',
          type: 'hight',
          id: 'not6',
          readed: true
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
      return notification.readed === false;
    });
    var notificationsHighPriority = this.state.data.filter(function (notification)
    {
      return notification.type !== 'low';
    });
    var boundCloseNotification = this.handleCloseNotification;
    return (
      <div className="notifications">
        <NotificationList closeNotification={this.handleCloseNotification} data={notificationsUnReaded} />
        <NotificationList closeNotification={this.handleCloseNotification} data={notificationsHighPriority} listType="history" />
      </div>
    );
  }
});

var NotificationList = React.createClass({
  render: function ()
  {
    var listType = this.props.listType || 'newbox';
    var notificationLength = this.props.data.length;
    var closeNotification = this.props.closeNotification;
    var notificationNodes = this.props.data.map(function (notification, index)
    {
      return (
        <Notification closeNotification={closeNotification} notification={notification} notificationLength={notificationLength} key={index} />
      );
    });
    var className = 'notifications__list' + (listType === 'history' ? ' notifications__list--history' : '');
    return (
      <div className={className}>
        {notificationNodes}
      </div>
    );
  }
});

var Notification = React.createClass({
  handCloseNotification: function ()
  {
    this.props.closeNotification(this.props.notification);
  },
  render: function ()
  {
    var rightElement;
    if (this.props.notification.type === LOW_TYPE) {
      rightElement = (
        <div className="notifications__button notifications__button--close">
          <button className="notifications__close" onClick={this.handCloseNotification}></button>
        </div>
      )
    }
    else {
      rightElement = (
        <div className="notifications__button notifications__button--show-next">{this.props.notificationLength}</div>
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
