import React from "react";

const TabPanel = (props) => {
  const { index, value, children, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const Tab = ({
  tabList = [],
  className = "",
  onChange = () => {},
  activeTab = "",
}) => {
  if (tabList.length <= 0) return null;
  const handleActiveTab = (e, tab) => {
    onChange(tab);
    const element = e.target;
    element.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return (
    <>
      <div
        className={`flex whitespace-nowrap overflow-x-auto scrollbar-hidden gap-2 ${className}`}
      >
        {tabList.map((tab) => (
          <div
            className={`cursor-pointer py-2 px-6 border-b-2 text-sm lg:text-lg font-semibold flex-shrink-0 ${
              activeTab === tab.value
                ? "border-b-black border-solid pointer-events-none"
                : "border-b-transparent text-gray-400"
            }`}
            key={tab.value}
            onClick={(e) => handleActiveTab(e, tab.value)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {tabList.map((tab, index) => (
        <TabPanel index={index} value={activeTab} key={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  );
};

export default Tab;
