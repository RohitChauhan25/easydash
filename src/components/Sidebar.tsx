import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import { sideMenu } from "../constants/data";
import SettingsIcon from "../assets/svg/setting";
import dash from "../assets/img/dash2.png";
import { useLayoutEffect, useState } from "react";

function Sidebar({ openSidebarToggle, OpenSidebar, darkMode }: any) {
  const [active, setactive] = useState(0);
  const location = useLocation();
  const currentPath = location?.pathname;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (currentPath === "/orders") {
      setactive(1);
    } else if (currentPath === "/customer") {
      setactive(2);
    } else if (currentPath === "/website") {
      setactive(3);
    } else {
      setactive(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src={logo} alt="logo" />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        {sideMenu?.map((menu, index) => {
          return (
            <li
              className={`sidebar-list-item icon ${
                active === index ? "active-menu" : ""
              } `}
              key={menu?.id}
              onClick={() => setactive(index)}
            >
              <NavLink to={menu?.path}>
                {index === 0 ? (
                  <img
                    src={darkMode ? menu?.icon : dash}
                    alt=""
                    height={20}
                    width={20}
                  />
                ) : (
                  <img src={menu?.icon} alt="" height={20} width={20} />
                )}
                <span className="menu-item">{menu?.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <ul className="sidebar-list setting-list">
        <li className="sidebar-list-item setting-list-item">
          <NavLink to={"/"}>
            <SettingsIcon width={24} height={24} color="#D7D7D7" />
            <span className="menu-item">Setting</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
