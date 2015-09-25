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
          readed: false,
          date: '21.09.2015'
        },
        {
          desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
          type: 'hight',
          id: 'not2',
          readed: false,
          date: '22.09.2015'
        },
        {
          desc: 'Идите нахер!',
          type: 'low',
          id: 'not3',
          readed: false,
          date: '23.09.2015'
        },
        {
          desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
          type: 'hight',
          id: 'not4',
          readed: true,
          date: '24.09.2015'
        },
        {
          desc: 'Вы получили купон на скидку 7%!',
          type: 'hight',
          id: 'not5',
          readed: false,
          date: '25.09.2015'
        },
        {
          desc: 'Вы удалили свою шару, поэтому хрен вам, а не купон! Убейтесь головой об стену. Читайте внимательнее правила. Какой же вы неудачник, всему нашему офису стыдно за вас. Фу бля, весь день испоганил :(',
          type: 'hight',
          id: 'not6',
          readed: true,
          date: '26.09.2015'
        }
      ]
    };
  },
  handleCloseNotification: function (notification)
  {
    var newStateData = this.state.data.map(function (item)
    {
      if (item.id === notification.id) {
        item.readed = true;
      }
      return item;
    });
    this.setState({data: newStateData});
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
    var notificationNodes = data.map(function (notification, index)
    {
      return (
        <Notification listType={listType} closeNotification={closeNotification} notification={notification} notificationLength={countImportantMessages} key={'notification' + index} />
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
    if (this.props.listType !== 'history') {
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
