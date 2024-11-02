import Chart from "../components/LineChart";
import { cardsData } from "../constants/data";
import earthIcon from "../assets/img/earthquake.svg";
import legendIcon from "../assets/img/legend_toggle.svg";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import MapChart from "../components/Map";
import { Col, Row, Select } from "antd";
import { flags } from "../constants/flegs";
import { useState } from "react";
import PieChartComponent from "../components/PieChart";
import TableComponent from "../components/Table";
import Search from "../components/Search";
import { LuCalendarDays } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CretaTaskModal from "../modal/CreatTaskModal";
import {
  selectFilteredTransactions,
  setActiveMode,
  setSearchTerm,
} from "../redux/slices/transactionSlice";
import { sortData } from "../redux/slices/mapSlice";
import {
  getProductsByLimit,
  getTopSellingProducts,
} from "../redux/slices/prodcutsSlice";
import { getTasksByStatus } from "../redux/slices/taskSlice";
import AddProductModal from "../modal/AddProductModal";
import OrderIcon from "../assets/svg/orderIcon";
import WebsiteIcon from "../assets/svg/website";
import BounceIcon from "../assets/svg/bounce";
import StockIcon from "../assets/svg/stock";
import AreaChartComponent from "../components/AreaChart";

const Tab = ["Revenue", "Orders", "Visitors"];
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTaskTab, setActiveTaskTab] = useState<number>(1);
  const [topSellingLimit, setTopSellingLimit] = useState<number>(5);
  const [watchlistLimit, setWatchListLimit] = useState<number>(5);
  const { data: mapData } = useSelector((state: RootState) => state.mapData);
  const { data: products, topSelling } = useSelector(
    (state: RootState) => state.products
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const activeMode = useSelector(
    (state: RootState) => state.transactions.activeMode
  );
  const completedTasks = useSelector((state: RootState) =>
    getTasksByStatus(state, true)
  );
  const todoTasks = useSelector((state: RootState) =>
    getTasksByStatus(state, false)
  );

  const transactions = useSelector(selectFilteredTransactions);
  const handleTabChange = (mode: string) => {
    dispatch(setActiveMode(mode));
  };

  const dispatch = useDispatch();

  // Updates the active tab and sorts data based on the selected metric (revenue, orders, or visitors).
  const handleMapTab = (index: number) => {
    setActiveTab(index);
    if (index === 0) {
      dispatch(sortData("revenue"));
    } else if (index === 1) {
      dispatch(sortData("orders"));
    } else {
      dispatch(sortData("visitors"));
    }
  };

  // Dispatches the top-selling product action with the provided limit.
  const handleTopSellingProduct = (data: number) => {
    setTopSellingLimit(data);
    dispatch(getTopSellingProducts(data));
  };

  // Dispatches the watchlist action with the provided limit.
  const handleTopWatchlist = (data: number) => {
    setWatchListLimit(data);
    dispatch(getProductsByLimit(data));
  };

  //
  const handleSearch = (query: string) => {
    dispatch(setSearchTerm(query));
  };

  const formatTimeAgo = (transactionTimeInSeconds: number) => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds
    const secondsElapsed = currentTimeInSeconds - transactionTimeInSeconds; // Calculate the difference in seconds
    const minutes = Math.floor(secondsElapsed / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    if (hours > 0) {
      return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    }
    if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    }
    return `${secondsElapsed} sec${secondsElapsed > 1 ? "s" : ""} ago`;
  };

  // colums for table
  const columns = [
    {
      title: "Store Name",
      dataIndex: "Store_Name",
      sorter: (a: any, b: any) => a.Store_Name.localeCompare(b.Store_Name),
    },
    {
      title: "Name",
      dataIndex: "Name",
      render: (Name: string, record: any) => {
        return (
          <div>
            <img
              src={record?.imgUrl}
              alt=""
              className="rounded-circle"
              width={30}
              height={30}
            />{" "}
            {Name}
          </div>
        );
      },
      sorter: (a: any, b: any) => a.Name.localeCompare(b.Name),
    },
    {
      title: "Country",
      dataIndex: "Country",
      render: (Country: string, record: any) => {
        return (
          <div>
            <img
              src={record?.flag}
              alt=""
              className=""
              width={25}
              height={25}
            />{" "}
            {Country}
          </div>
        );
      },
      sorter: (a: any, b: any) => a.Country.localeCompare(b.Country),
    },
    {
      title: "Level",
      dataIndex: "Level",
    },
    {
      title: "Paid",
      dataIndex: "Time",
      render: (time: any) => {
        return formatTimeAgo(Number(time));
      },
    },
  ];

  // Helper function to determine the label for the date
  const getDateLabel = (createdDate: string) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];
    const dayBeforeYesterday = new Date(Date.now() - 172800000)
      .toISOString()
      .split("T")[0];

    console.log(today, new Date(createdDate).toISOString().split("T")[0]);

    const createdDateOnly = new Date(createdDate).toISOString().split("T")[0]; // Extracts only "YYYY-MM-DD" part

    if (createdDateOnly === today) return "Today";
    if (createdDateOnly === yesterday) return "Yesterday";
    if (createdDateOnly === dayBeforeYesterday) return `2 day ago`;

    // Return the full date if it's neither today, yesterday, nor the day before yesterday
    return createdDate;
  };

  const formatDateTime = (dateTimeString: any) => {
    // Parse the date string
    const date = new Date(dateTimeString);

    // Format the time
    const options: any = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedTime;
  };

  return (
    <div className="dash-container">
      <p>
        <small>Dashboard</small>
      </p>
      {/* dashboard cards   */}
      <div className="cards-wrapper">
        {cardsData?.map((item: any, index) => {
          return (
            <div key={item?.id} className="col-item">
              <div className="card-title-wrapper">
                <p className="title">{item?.name}</p>
                {index === 0 && <OrderIcon color={"var(--icon)"} />}
                {index === 1 && <StockIcon color={"var(--icon)"} />}
                {index === 2 && <BounceIcon color={"var(--icon)"} />}
                {(index === 3 || index === 4 || index === 5 || index === 6) && (
                  <WebsiteIcon color={"var(--icon)"} dark={darkMode} />
                )}
              </div>
              <div className="data-wrapper ">
                {item?.id === 3 ? (
                  <p>13.5%</p>
                ) : (
                  <p>{item?.data ? item?.data : "--"}</p>
                )}
                {/* {item?.id === 1 && (
                  <>
                    <div className="arrow">
                      <FiArrowDownRight color="#f25c5c" size={18} />
                    </div>
                    <div className="profit-wrapper loss ">
                      <div className="">15%</div>
                    </div>
                  </>
                )}
                {(item?.id === 2 || item?.id === 3) && (
                  <>
                    <div className="arrow">
                      <FiArrowUpRight color="#8fae75" size={18} />
                    </div>
                    <div className="profit-wrapper  profit">
                      <div className="">15%</div>
                    </div>
                  </>
                )} */}

                {item?.progress &&
                  (item?.progress < 0 ? (
                    <>
                      <div className="arrow">
                        <FiArrowDownRight color="#f25c5c" size={18} />
                      </div>
                      <div className="profit-wrapper loss ">
                        <div className="">{item?.progress}%</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="arrow">
                        <FiArrowUpRight color="#8fae75" size={18} />
                      </div>
                      <div className="profit-wrapper  profit">
                        <div className="">{item?.progress}%</div>
                      </div>
                    </>
                  ))}
              </div>
              <div>
                {/* <img src={item?.img} alt="" /> */}
                <AreaChartComponent data={item?.datalive} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Line Chart   */}
      <div className="chart-wrapper">
        <div className="chart-header">
          <div className="chart-header-left">
            <div>
              <p></p> Revenue
            </div>
            <div>
              <p></p>Shipment Cost
            </div>
          </div>
          <div className="chart-header-right">
            <div>
              <img src={legendIcon} alt="icon" height={20} width={20} />
            </div>
            <div>
              <img src={earthIcon} alt="icon" height={20} width={20} />
            </div>
          </div>
        </div>

        <div className="chart-progress-wrapper">
          <span>$100000</span>
          <div className="arrow">
            <FiArrowUpRight color="#8fae75" size={20} />
          </div>
          <div className="progress-wrapper">
            <div className="">+2.78% up from last week</div>
          </div>
        </div>
        <Chart />
      </div>

      {/* Map start  */}
      <div className="wrapper">
        <div className="map">
          <div className="map-header">
            {Tab?.map((item, index) => {
              return (
                <div
                  className={index === activeTab ? "active" : ""}
                  onClick={() => handleMapTab(index)}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <Row>
            <Col xs={24} sm={8} className="">
              <ul className="contry-list">
                {mapData?.map((country) => {
                  return (
                    <li key={country.name}>
                      <img
                        src={flags[country.flag]}
                        alt="img"
                        width={20}
                        height={16}
                      />
                      <div className="country-info">
                        <p>{country?.name}</p>
                        <p>
                          {activeTab === 0
                            ? country?.revenuePercentage
                            : activeTab === 1
                            ? country?.ordersPercentage
                            : country?.visitorsPercentage}
                          %
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Col>
            <Col xs={24} sm={16} order={1}>
              <MapChart />
            </Col>
          </Row>
        </div>
        <div className="pieChart">
          <div className="map-header">
            <div>Devices usage</div>
          </div>
          <PieChartComponent />
        </div>
      </div>

      {/* Taska and Table   */}
      <div className="wrapper">
        <div className="task-wrapper">
          <div className="pb-3 d-flex justify-content-between ">
            <div className="tabs-wrapper">
              <div
                className={1 === activeTaskTab ? "active" : ""}
                onClick={() => setActiveTaskTab(1)}
              >
                To-Do
              </div>
              <div
                className={2 === activeTaskTab ? "active" : ""}
                onClick={() => setActiveTaskTab(2)}
              >
                Completed
              </div>
            </div>
            <div className="create-task" onClick={() => setIsModalOpen(true)}>
              Create Task
            </div>
          </div>
          <div className="task-details-wrapper">
            {(activeTaskTab === 1 ? todoTasks : completedTasks).map(
              (task: any, index) => (
                <div key={index}>
                  {index === 0 ||
                  getDateLabel(
                    activeTaskTab === 1
                      ? todoTasks[index - 1].createdDate
                      : completedTasks[index - 1].createdDate
                  ) !== getDateLabel(task.createdDate) ? (
                    <div className="separator">
                      <p></p>
                      <p>{getDateLabel(task.createdDate)}</p>
                      <p></p>
                    </div>
                  ) : null}

                  <div className="task-card">
                    <div>
                      <div className="left">
                        <button>SALES</button>
                        <p>
                          <LuCalendarDays size={14} /> Due{" "}
                          {new Date(task?.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="right">WW</div>
                    </div>
                    <div className="title">
                      <h5>{task.title}</h5>
                      <span>{formatDateTime(task?.createdDate)}</span>
                    </div>
                    <div className="task-details">{task.description}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="table-wrapper">
          <div className="pb-3 d-flex gap-2">
            <div className="table-tabs">
              <div
                className={`tab ${activeMode === "Online" ? "active" : ""}`}
                onClick={() => handleTabChange("Online")}
              >
                Online
              </div>
              <div
                onClick={() => handleTabChange("Offline")}
                className={`tab ${activeMode === "Offline" ? "active" : ""}`}
              >
                Offline
              </div>
            </div>
            <Search callback={handleSearch} />
          </div>
          <div className="table-container">
            <TableComponent data={transactions} columns={columns} />
          </div>
        </div>
      </div>

      {/* Products listing   */}
      <div className="prodcts-wrapper">
        <div className="product-container">
          <div className="top">
            <div>Top Selling Products ({topSellingLimit})</div>
            <div>
              <Select
                defaultValue={5}
                onChange={handleTopSellingProduct}
                options={[
                  { value: "5", label: 5 },
                  { value: "10", label: 10 },
                  { value: "20", label: 20 },
                ]}
              />
            </div>
          </div>
          <ul className="product-list">
            {topSelling?.map((item) => {
              return (
                <li>
                  <div>
                    <img
                      src={item?.imageUrl}
                      alt="item"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p>{item?.name}</p>
                      <span>Units Sold - {item?.unitsSold}</span>
                    </div>
                  </div>
                  <div>${item?.price}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="product-container">
          <div className="top">
            <div>Product Watchlist ({watchlistLimit})</div>
            <div>
              <Select
                defaultValue={5}
                onChange={handleTopWatchlist}
                options={[
                  { value: "5", label: 5 },
                  { value: "10", label: 10 },
                  { value: "20", label: 20 },
                  { value: "50", label: 50 },
                ]}
              />
              <button
                className="add-btn"
                onClick={() => setIsAddProductModalOpen(true)}
              >
                Add Product
              </button>
            </div>
          </div>
          <ul className="product-list">
            {products?.map((item) => {
              return (
                <li>
                  <div>
                    <img
                      src={item?.imageUrl}
                      alt="item"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p>{item?.name}</p>
                      <span>Units Sold - {item?.unitsSold}</span>
                    </div>
                  </div>
                  <div>${item?.price}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <CretaTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <AddProductModal
        isModalOpen={isAddProductModalOpen}
        setIsModalOpen={setIsAddProductModalOpen}
      />
    </div>
  );
};

export default Dashboard;
