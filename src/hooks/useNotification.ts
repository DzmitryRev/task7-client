import React, { useEffect, useState } from "react";

export default function useNotification() {
  const [notification, setNotification] = useState("");
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  }, [notification, setNotification]);
  return { notification, setNotification };
}
