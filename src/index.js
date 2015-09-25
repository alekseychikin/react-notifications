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

var Notifications = require('../notifications/notifications.jsx');
