import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import { sideMenu } from "../constants/data";
import SettingsIcon from "../assets/svg/setting";
import dash from "../assets/img/dash2.png";
import { useLayoutEffect, useState } from "react";
import OrderIcon from "../assets/svg/orderIcon";
import DashboardIcon from "../assets/svg/dashboard";
import WebsiteIcon from "../assets/svg/website";
import CustomerIcon from "../assets/svg/customer";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

function Sidebar({ openSidebarToggle, OpenSidebar }: any) {
  const [active, setactive] = useState(0);
  const location = useLocation();
  const currentPath = location?.pathname;
  const { darkMode } = useSelector((state: RootState) => state.theme);
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
          <img src={logo} alt="logo" loading="lazy" />
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
                {index === 0 && <DashboardIcon color={"var(--icon)"} />}
                {index === 1 && <OrderIcon color={"var(--icon)"} />}
                {index === 2 && (
                  <CustomerIcon color={"var(--icon)"} dark={darkMode} />
                )}
                {index === 3 && <WebsiteIcon color={"var(--icon)"} />}
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
