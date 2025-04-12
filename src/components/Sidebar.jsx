import React from "react";
import { ReactComponent as SpsoLogo } from "../assets/svgs/spso_name.svg"
import SideBarLink from "./SideBarLink";
import { ReactComponent as PersonalSvg } from "../assets/svgs/personal_icon.svg";
import { ReactComponent as HistorySvg } from "../assets/svgs/log.svg";
import { ReactComponent as LogoutSvg } from "../assets/svgs/log_out.svg";
import { ReactComponent as DashboardSvg } from "../assets/svgs/dashboard.svg"
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem('studentId')
    navigate('/')
  }

  return (
    <div 
        className="flex flex-col space-y-6 h-screen w-96 p-6 text-base items-center bg-white bg-center font-normal text-black"
    >
      <a href="student_information">
        <SpsoLogo className="w-48 h-auto mb-6" />
      </a>
      <ul className="flex flex-col w-full items-left">
        <SideBarLink name="Dashboard" hrefLink="/user/dashboard" Icon={DashboardSvg} /> 
        <SideBarLink name="Personal Information" hrefLink="/user/student_information" Icon={PersonalSvg} />
        <SideBarLink name="Parking History" hrefLink="/user/parking_history" Icon={HistorySvg} />
      </ul>
      <div className="w-full h-[1px] bg-gray-dark"/>
      <div onClick={logout} className="flex flex-row space-x-3 justify-left px-4 py-3 text-red font-normal w-full cursor-pointer">
          <LogoutSvg color="red" />
          <p>Log out</p>
      </div>
    </div>
  );
};

export default Sidebar;