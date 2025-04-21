import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { defaultPersonalData, defaultStudentStatistic } from "../../hardData";

import { ReactComponent as AvtSvg } from "../../assets/svgs/Avatar.svg";
import { ReactComponent as BookSvg } from "../../assets/svgs/book.svg";
import { ReactComponent as HistorySvg } from "../../assets/svgs/query_builder.svg";
import { ReactComponent as BikeSvg } from "../../assets/svgs/motorcycle.svg";
import { ReactComponent as HourglassSvg } from "../../assets/svgs/hourglass_empty.svg";
import UserService from "../../API/user";
import { formatDate, formatDateTime } from "../../utils/functions";

const PersonalInformationPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [studentId, setStudentId] = useState(null)
  const [personalInfo, setPersonalInfo] = useState(null)
  const [studentStatistic, setStudentStatistic] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch data here
      await UserService.getPersonalInformation()
      .then((res) => {
        const fetchPersonalInfo = res.data;

        console.log(res)

        setPersonalInfo(fetchPersonalInfo);
      }).catch((err) => {
        setPersonalInfo(defaultPersonalData);
        alert("Connect to Backend fail: " + err)
      })

      setStudentStatistic(defaultStudentStatistic);
      const studentId = localStorage.getItem('studentId');
      setStudentId(studentId);
      setIsLoading(false);
    }

    fetchData();
  }, [])

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
      <Header pageName="Personal Information" description="This is your main page."/>
      
      <div className="flex flex-row space-x-8 w-full">
        <div className="flex flex-col space-y-8 w-[42%]">
          <div className="flex flex-col space-y-3 p-5 w-full items-center bg-white rounded-lg drop-shadow">
            <div className="flex flex-row space-x-3 w-full justify-start items-center">
              <AvtSvg fill="#679F38" className="w-28 h-28"/>
              <p className="text-2xl font-bold text-blue">{personalInfo.name}</p>
            </div>
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Student Id</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {studentId}
              </text>
            </div>
            
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Email</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {personalInfo.email}
              </text>
            </div>
            
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Phone number</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {personalInfo.phone}
              </text>
            </div>
          </div>

          <div className="flex flex-col space-y-3 p-5 w-full items-start bg-white rounded-lg drop-shadow">
            <p className="text-2xl font-bold text-blue">Parking Information</p>
            
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Motorbike Registration Certificate</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {personalInfo.bike_certificate || "No bike certificate"}
              </text>
            </div>
            
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Registered Bike</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
              {personalInfo.register_bike || "No registered bike"}
              </text>
            </div>
            
            <div className="flex flex-col w-full justify-start space-y-2">
              <p className="text-xl font-bold text-black">Account Due</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {formatDate(personalInfo.account_due)}
              </text>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6 items-start flex-nowrap w-[58%] bg-none rounded-lg drop-shadow">
           
          <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
            <HistorySvg className="w-20 h-20" fill="#0388B4" />
            <div className="flex flex-col space-y-[6px] items-end">
              <p className="text-xl font-bold text-blue">Last 30 days total parking time</p>
              <p className="text-3xl font-bold text-black">{studentStatistic.last_30_day_parking}</p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
            <div className="flex flex-col space-y-[6px] items-start">
              <p className="text-xl font-bold text-blue">Last 30 days total use</p>
              <p className="text-3xl font-bold text-black">{studentStatistic.last_30_day_use}</p>
            </div>
            <BookSvg className="w-20 h-20" fill="#0388B4" />
          </div>
          
          <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
            <BikeSvg className="w-20 h-20" fill="#0388B4" />
            <div className="flex flex-col space-y-[6px] items-end">
              <p className="text-xl font-bold text-blue">Average parking duration</p>
              <p className="text-3xl font-bold text-black">{studentStatistic.average_parking_duration}</p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
            <div className="flex flex-col space-y-[6px] items-start">
              <p className="text-xl font-bold text-blue">Last parking</p>
              <p className="text-3xl font-bold text-black">{formatDateTime(personalInfo.last_parking)}</p>
            </div>
            <HourglassSvg className="w-20 h-20" fill="#0388B4" />
          </div>

          <div className="flex flex-col items-start bg-[#0485B0] w-full p-6 rounded-lg drop-shadow space-y-5">
            <p className="text-2xl font-bold text-white">Reporting</p>
            <p className="text-lg font-normal text-white">Report losing item or system error and tracking your report status.</p>
            <div className="w-full flex flex-row justify-between items-end">
              <div className="px-12 py-3 bg-[#4DA2BE] cursor-pointer rounded-lg drop-shadow">
                <p className="text-xl font-bold text-white">New Report</p>
              </div>
              <p className="text-base font-normal text-white underline italic">No reporting is made yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPage;