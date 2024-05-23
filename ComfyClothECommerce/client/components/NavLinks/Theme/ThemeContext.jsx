import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationColor, setNotificationColor] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleNotificationColor = (color) => {
    switch (color) {
      case "success":
        return "#5A9F68";
      case "failure":
        return "#FFAA1D";
      case "error":
        return "#CE2029";
      default:
        return "";
    }
  };

  const handleTimeout = () => {
    setTimeout(() => setNotification(false), 1000);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        notification,
        setNotification,
        notificationMessage,
        setNotificationMessage,
        notificationColor,
        setNotificationColor,
        handleNotificationColor,
        handleTimeout
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
