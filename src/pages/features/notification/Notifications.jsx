import React, { useEffect, useState } from "react";
import {
  getUserNotifications,
  markAsRead,
  pushNotification
} from "../../../axios/notification_api";
import "./Notifications.css";
import { useRole } from "../../../hooks/useRole";

const Notifications = ({ isPopup = false }) => {
  const { user } = useRole();
  const userId = user?.id;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const [formData, setFormData] = useState({
    targetUserId: "",
    email: "",
    message: "",
    category: "PROGRAM"
  });

  const fetchNotifications = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await getUserNotifications(userId);
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 8000);
    return () => clearInterval(interval);
  }, [userId]);

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
  );

  const handleRead = async (id) => {
    await markAsRead(id);
    setNotifications(prev =>
      prev.map(n =>
        n.notificationId === id ? { ...n, status: "READ" } : n
      )
    );
  };

  const handleSend = async () => {
    try {
      await pushNotification({
        userId: Number(formData.targetUserId),
        email: formData.email,
        message: formData.message,
        category: formData.category
      });
      alert("✅ Sent");
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  // ✅ POPUP MODE
  if (isPopup) {
    return (
      <div className="popup-panel">
        <h4>🔔 Notifications</h4>

        <div className="popup-scroll">
          {sortedNotifications.map((n) => (
            <div key={n.notificationId} className="popup-item">
              <span className="category">{n.category}</span>
              <p>{n.message}</p>

              {n.status === "UNREAD" && (
                <button onClick={() => handleRead(n.notificationId)}>
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ FULL PAGE
  return (
    <div className="notification-container">

      <div className="send-box">
        <h3>Send Notification</h3>

        <input
          placeholder="User ID"
          value={formData.targetUserId}
          onChange={(e) =>
            setFormData({ ...formData, targetUserId: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option>PROGRAM</option>
          <option>ROUTE</option>
          <option>TICKET</option>
          <option>COMPLIANCE</option>
        </select>

        <button onClick={handleSend}>Send</button>
      </div>

      <button onClick={() => setShowAll(true)}>
        Show My All Notifications
      </button>

      {showAll && (
        <div className="notification-grid">
          {sortedNotifications.map((n) => (
            <div
              key={n.notificationId}
              className={`notification-card ${n.status === "READ" ? "read" : ""}`}
            >
              <p>{n.message}</p>
              <span>{n.category}</span>

              {n.status === "UNREAD" && (
                <button onClick={() => handleRead(n.notificationId)}>
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;