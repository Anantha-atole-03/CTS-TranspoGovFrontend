import React, { useState, useEffect, useRef } from "react";
import { useRole } from "../../hooks/useRole";
import UserManagement from "../features/user/UserManagement";
import SidebarLayout from "../../components/SidebarLayout";
import "./Dashboard.css";
import { FaUserCog, FaChartBar, FaCog, FaFileAlt, FaBell } from "react-icons/fa";
import { BiSolidBell } from "react-icons/bi";
import { Col, Row } from "react-bootstrap";
import ProgramsResources from "../features/programs_resources/ProgramsResources";
import Reports from "../features/reports/Reports";
import Notifications from "../features/notification/Notifications";
import { ROLES } from "../../config/roleConfig";

const iconMap = {
  users: <FaUserCog />,
  "programs-resources": <FaFileAlt />,
  reports: <FaChartBar />,
  notifications: <FaBell />,
  settings: <FaCog />,
};

const UserDashboard = () => {
  const { user } = useRole();
  const [activeKey, setActiveKey] = useState("users");

  const [showPopup, setShowPopup] = useState(false);

  // ✅ OUTSIDE CLICK HANDLER
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const renderContent = () => {
    switch (activeKey) {
      case "users":
        return <UserManagement />;
      case "programs-resources":
        return <ProgramsResources />;
      case "reports":
        return <Reports />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <h4>Settings</h4>;
      default:
        return null;
    }
  };

  return (
    <SidebarLayout
      menuItems={Object.keys(iconMap).map(key => ({
        key,
        label: key.replace(/-/g, " "),
      }))}
      activeKey={activeKey}
      onSelect={setActiveKey}
      iconMap={iconMap}
    >
      <Row className="mb-4 align-items-center justify-content-between">
        <Col>
          <h1>Welcome, {user?.name}!</h1>
          <p>{user?.role}</p>
        </Col>

        <Col xs="auto" className="d-flex gap-3">
          {/* ✅ BELL */}
          <BiSolidBell
            size={24}
            style={{ cursor: "pointer" }}
            onClick={() => setShowPopup(prev => !prev)}
          />
        </Col>
      </Row>

      {/* ✅ POPUP */}
      {showPopup && (
        <div ref={panelRef}>
          <Notifications isPopup={true} />
        </div>
      )}

      <hr />

      {renderContent()}
    </SidebarLayout>
  );
};

export default UserDashboard;