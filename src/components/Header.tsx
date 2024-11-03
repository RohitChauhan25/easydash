import { IoReorderThree } from "react-icons/io5";
import SettingsIcon from "../assets/svg/setting";
import ThemeIcon from "../assets/svg/themeIcon";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../redux/slices/theme";
import { RootState } from "../redux/store";
import profile from "../assets/img/profile.png";

const Header = ({ OpenSidebar }: any) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleChange = () => {
    dispatch(changeTheme(!darkMode));
  };
  return (
    <header className="header">
      <div className="">
        <IoReorderThree size={30} onClick={OpenSidebar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right icon  ">
        <span onClick={() => handleChange()} className="mode-icon">
          <ThemeIcon width={24} height={24} />
        </span>
        <SettingsIcon width={24} height={24} />
        <img
          src={profile}
          alt="profile"
          className="profile-img"
          loading="lazy"
        />
      </div>
    </header>
  );
};

export default Header;
