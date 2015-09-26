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

ListNotifications.addListener('change-unreaded-count', function (value)
{
  console.log('unreaded notifications', value);
});

var data = [
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
];

var Notifications = require('../notifications/notifications.jsx');
