window.ListNotifications = (function ()
{
  var events = [];
  return {
    addListener: function (event, cb)
    {
      events.push({event: event, cb: cb});
    },
    addNotification: function (notification)
    {
      this.trigger('add-notification', notification);
    },
    showHistory: function ()
    {
      this.trigger('show-history');
    },
    hideHistory: function ()
    {
      this.trigger('hide-history');
    },
    toggleHistory: function ()
    {
      this.trigger('toggle-history');
    },
    trigger: function (event, data)
    {
      events.forEach(function (eventItem)
      {
        if (eventItem.event === event) {
          eventItem.cb(data);
        }
      });
    }
  };
})();

var data = [
  {
    desc: 'Спасибо, что вы есть!',
    type: 'low'
  },
  {
    desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
    type: 'hight',
  },
  {
    desc: 'Идите нахер!',
    type: 'low'
  },
  {
    desc: 'Обратите внимание, по правилам, в следующем конкурсе вы сможете участвовать после 12:00, 27 ноября',
    type: 'hight',
    cb: function ()
    {
      console.log('Wow');
    }
  },
  {
    desc: 'Вы получили купон на скидку 7%!',
    type: 'hight'
  },
  {
    desc: 'Вы удалили свою шару, поэтому хрен вам, а не купон! Убейтесь головой об стену. Читайте внимательнее правила. Какой же вы неудачник, всему нашему офису стыдно за вас. Фу бля, весь день испоганил :(',
    type: 'hight'
  }
];

var Notifications = require('../notifications/notifications.jsx');
var NotificationCounts = require('../notification-counts/notification-counts.jsx');
var i = 0;
var makenotification = function ()
{
  setTimeout(function ()
  {
    ListNotifications.addNotification({
      desc: data[i].desc,
      type: data[i].type,
      cb: data[i].cb
    });
    i++;
    if (i == data.length) {
      i = 0;
    }
    makenotification();
  }, Math.random() * 3000 + 4000);
};
makenotification();
