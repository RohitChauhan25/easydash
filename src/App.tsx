import { useEffect } from "react";
import Routes from "./routes";
import "./styles/main.scss";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
const App = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  return <Routes />;
};

export default App;
