var React = require('../bower_components/react/react.js');

var Notifications = React.createClass({
  getInitialState: function ()
  {
    return {
      data: [
        {
          desc: 'Спасибо, что вы есть!',
          type: 'low'
        },
        {
          desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
          type: 'hight'
        },
        {
          desc: 'Идите нахер!',
          type: 'low'
        },
        {
          desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
          type: 'hight'
        },
        {
          desc: 'Вы получили купон на скидку 7%!',
          type: 'hight'
        },
        {
          desc: 'Вы удалили свою шару, поэтому хрен вам, а не купон! Убейтесь головой об стену. Читайте внимательнее правила. Какой же вы неудачник, всему нашему офису стыдно за вас. Фу бля, весь день испоганил :(',
          type: 'hight'
        }
      ]
    };
  },
  render: function ()
  {
    return (
      <NotificationLists data={this.state.data} />
    );
  }
});

var NotificationLists = React.createClass({
  render: function ()
  {
    var notificationsLowPriorityNodes = this.props.data.filter(function (notification)
    {
      return notification.type === 'low';
    }).map(function (notification, index)
    {
      notification = [notification];
      return (
        <div className="notifications__contain" key={index}>
          <NotificationList data={notification} />
        </div>
      );
    });
    var notificationsHighPriority = this.props.data.filter(function (notification)
    {
      return notification.type !== 'low';
    });
    return (
      <div className="notifications">
        {notificationsLowPriorityNodes}
        <div className="notifications__contain">
          <NotificationList data={notificationsHighPriority} />
        </div>
      </div>
    );
  }
});

var NotificationList = React.createClass({
  render: function ()
  {
    var notificationNodes = this.props.data.map(function (notification, index)
    {
      return (
        <Notification notification={notification} key={index} />
      );
    });
    return (
      <div className="notifications__list">
        {notificationNodes}
      </div>
    );
  }
});

var Notification = React.createClass({
  render: function ()
  {
    return (
      <div className="notifications__item">
        {this.props.notification.desc}
      </div>
    );
  }
});

React.render(<Notifications />, document.body.getElementsByClassName('notifications')[0]);
