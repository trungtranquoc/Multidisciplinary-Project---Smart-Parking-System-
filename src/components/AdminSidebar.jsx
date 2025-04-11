import React from "react";
import { ReactComponent as SpsoLogo } from "../assets/svgs/spso_name.svg"
import SideBarLink from "./SideBarLink";
import { ReactComponent as PersonalSvg } from "../assets/svgs/personal_icon.svg";
import { ReactComponent as HistorySvg } from "../assets/svgs/log.svg";
import { ReactComponent as PrinterSvg } from "../assets/svgs/printer.svg";
import { ReactComponent as DashboardSvg } from "../assets/svgs/dashboard.svg"
import { ReactComponent as LogoutSvg } from "../assets/svgs/log_out.svg"

const AdminSidebar = () => {
  return (
    <div 
        className="flex flex-col space-y-6 h-screen w-96 p-6 text-base items-center bg-cover bg-center font-normal text-black"
    >
      <a href="manage_system">
        <SpsoLogo className="w-48 h-auto mb-6" />
      </a>
      <ul className="flex flex-col w-full items-left"> 
        <SideBarLink name="Real time management" hrefLink="/admin/real_time_management" Icon={PersonalSvg} />
        <SideBarLink name="Dashboard" hrefLink="/admin/dashboard" Icon={DashboardSvg} />
        <SideBarLink name="Monitoring" hrefLink="/admin/monitoring" Icon={PrinterSvg} />
        <SideBarLink name="Parking history" hrefLink="/admin/parking_history" Icon={HistorySvg} />
      </ul>
      <div className="w-full h-[1px] bg-[#0388B4]"/>
      <a href="/" className="flex flex-row space-x-3 justify-left px-4 py-3 text-red font-normal w-full">
          <LogoutSvg color="red" />
          <p>Log out</p>
      </a>
    </div>
  );
};

export default AdminSidebar;