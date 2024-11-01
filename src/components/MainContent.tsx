import React, { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const MainContent: React.FC<AdminLayoutProps> = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

export default MainContent;
