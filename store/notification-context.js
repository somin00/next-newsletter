import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, //{title, message, status}
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState();

  const showNotificationHandler = (notificationData) => {
    setNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setNotification(null);
  };

  const context = {
    notification: notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  useEffect(() => {
    if (notification && (notification.status === "success" || notification.status === "error")) {
      const timeoutID = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [notification]);

  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}
export default NotificationContext;
