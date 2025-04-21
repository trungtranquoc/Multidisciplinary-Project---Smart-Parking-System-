import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { lightDeviceStatus, venlitationDeivceStatus } from "../../../hardData";
import { ReactComponent as LightSvg } from "../../../assets/svgs/highlight.svg";
import { ReactComponent as VenlitationSvg } from "../../../assets/svgs/camera.svg";

// import { defaultPersonalData, samplePrintedFiles } from "../../hardData";
import AdminService from "../../../API/admin";

const MonitoringPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [lightSystem, setLightSystem] = useState([])
  const [ventilationSystem, setVentilationSystem] = useState([])
  const [isUsingAPI, setIsUsingAPI] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await AdminService.getMonitoringData()
        .then((res) => {
          console.log("Monitoring data: ", res.data)
          setLightSystem(res.data.light_system)
          setVentilationSystem(res.data.ventilation_system)
          setIsUsingAPI(true)
        })
        .catch((err) => {
          setLightSystem(lightDeviceStatus);
          setVentilationSystem(venlitationDeivceStatus);

          alert("Error: ", err)
        })
    }

    fetchData();

    setIsLoading(false);
  }, [])

  const toggleStatus = async (id) => {
    console.log("Id of device: ", id)

    setIsLoading(true)

    if (isUsingAPI) {
      await AdminService.toggleMonitoringData(id)
      .then((res) => {
        const id = res.data.id
        const status = res.data.status

        setLightSystem(lightSystem.map((light) => ({
          name: light.name,
          status: light.id === id ? status : light.status,
          id: light.id
        })))
      })
      .catch((err) => {
        console.log("Error: ", err)
      }).finally(() => {
        setIsLoading(false)
      })
    } else {
      const toggleStatus = (status) => {
        return !status; 
      }

      setLightSystem(lightSystem.map((light) => ({
        name: light.name,
        status: light.id === id ? toggleStatus(light.status) : light.status,
        id: light.id
      })))
      setIsLoading(false)
    }
  }
  
  // Loading page
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="font-bold text-4xl text-blue">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-8 bg-gray-100 p-6 w-full overflow-y-auto max-h-screen h-screen">
      <Header pageName="Monitoring Page" description="Monitor the system"/>

      <div className="w-full flex flex-col space-y-6 bg-white drop-shadow rounded-lg p-6">
          <p className="text-2xl font-bold text-blue">Light System</p>

          <div className="w-full grid grid-cols-4 gap-x-6 gap-y-6">
                {lightSystem.map((machine) => (
                  <div
                    key={machine.id}
                    className="flex items-center flex-row justify-between w-full bg-gray-50 border border-gray-300 rounded-lg p-2"
                  >
                    {/* Icon */}
                    <LightSvg className="w-20 h-20" fill="#0388B4" />

                    {/* Printer Info */}
                    <div className="flex flex-col justify-between h-full p-2">
                      <div className="flex">
                        <p className="text-sm font-bold pr-2 w-16">Printer: </p>
                        <p className="text-sm text-[#808080]">{machine.name}</p> {   }
                      </div>
                      <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                      <div className="flex">
                        <p className="text-sm font-bold pr-2 w-16">Status: </p>
                        <p className={`text-sm ${machine.status ? "text-green" : "text-gray-dark"}`}>
                          {machine.status ? "Active" : "Inactive"}
                        </p>
                      </div>
                      <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                      <div className="flex">
                        <p className="text-sm font-bold pr-2 w-16">Notes: </p>
                        <p className="text-sm text-[#808080]">None</p>
                      </div>
                      <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                      <div className="flex pl-[77px]">
                        <button
                          onClick={() => toggleStatus(machine.id)}
                          className={`w-[92px] h-[32px] text-[14px] font-bold text-white rounded-lg ${machine.status ? "bg-blue" : "bg-[#808080]"}`}
                        >
                          {machine.status ? "Stop" : "Active"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          
      <div className="w-full flex flex-col space-y-6 bg-white drop-shadow rounded-lg p-6">
          <p className="text-2xl font-bold text-blue">Light System</p>

          <div className="w-full grid grid-cols-4 gap-x-6 gap-y-6">
                {ventilationSystem.map((machine) => (
                  <div
                    key={machine.id}
                    className="flex items-center flex-row justify-between w-full bg-gray-50 border border-gray-300 rounded-lg p-2"
                  >
                    {/* Icon */}
                    <VenlitationSvg className="w-20 h-20" fill="#0388B4" />

                    {/* Printer Info */}
                    <div className="flex flex-col justify-between h-full p-2">
                      <div className="flex">
                        <p className="text-sm font-bold pr-2 w-16">Printer: </p>
                        <p className="text-sm text-[#808080]">{machine.name}</p> {   }
                      </div>
                      <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                      <div className="flex">
                        <p className="text-sm font-bold pr-2 w-16">Status: </p>
                        <p className={`text-sm ${machine.status ? "text-green" : "text-gray-dark"}`}>
                          {machine.status ? "Active" : "Inactive"}
                        </p>
                      </div>
                      <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                      <div className="flex">
                        <p className="text-sm font-bold pr-2 w-16">Notes: </p>
                        <p className="text-sm text-[#808080]">None</p>
                      </div>
                      <hr className="border-t-[0.5px] border-[#D9D9D9] mb-2" />

                      <div className="flex pl-[77px]">
                        <button
                          onClick={() => toggleStatus(machine.id)}
                          className={`w-[92px] h-[32px] text-[14px] font-bold text-white rounded-lg ${machine.status ? "bg-blue" : "bg-[#808080]"}`}
                        >
                          {machine.status ? "Stop" : "Active"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
    </div>
  );
};

export default MonitoringPage;