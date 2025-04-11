import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { ReactComponent as AvtSvg } from "../../assets/svgs/Avatar.svg";
import { ReactComponent as PrinterSvg } from "../../assets/svgs/printer.svg";
import { ReactComponent as BookSvg } from "../../assets/svgs/book.svg";
import PrintingHistoryItem from "../../components/PrintingHistoryItem";
import { defaultPersonalData, samplePrintedFiles } from "../../hardData";
// import UserService from "../../API/user";

const PersonalInformationPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState(null)
  const [printingHistory, setPrintingHistory] = useState([])
  const [studentId, setStudentId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch data here
      // await UserService.getPersonalInformation()
      // .then((res) => {
      //   const fetchPersonalInfo = res.data;

      //   console.log(res)

      //   setPersonalInfo(fetchPersonalInfo);
      // }).catch((err) => {
      //   console.error(err);
      //   setPersonalInfo(defaultPersonalData);
      // })

      // await UserService.getPrintingHistory()
      // .then((res) => {
      //   const fetchPrintingHistory = res.data;
      //   setPrintingHistory(fetchPrintingHistory)
      // }).catch((err) => {
      //   console.error(err);
      //   setPrintingHistory(samplePrintedFiles);
      //   alert("Connect to Backend fail ! Use default mode instead !")
      // })
      
      setPrintingHistory(samplePrintedFiles);
      setPersonalInfo(defaultPersonalData);
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
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full overflow-y-auto max-h-screen h-screen">
      <Header pageName="Personal Information" description="This is your main page."/>
      <div className="flex flex-row space-x-6 w-full">
        <div className="flex flex-col space-y-8 w-[42%]">
          <div className="flex flex-col space-y-3 p-4 w-full items-center bg-white rounded-lg drop-shadow">
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
              <p className="text-xl font-bold text-black">Falculty</p>
              <text className="bg-gray rounded-lg text-gray-dark font-normal px-3 py-[10px] w-full justify-start text-base">
                {personalInfo.faculty}
              </text>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
            <PrinterSvg className="w-20 h-20" fill="#0388B4" />
            <div className="flex flex-col space-y-[6px] items-end">
              <p className="text-xl font-bold text-blue">Number of A4 left</p>
              <p className="text-3xl font-bold text-black">{personalInfo.numberOfA4}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center p-6 w-full bg-white rounded-lg drop-shadow" >
            <div className="flex flex-col space-y-[6px] items-start">
              <p className="text-xl font-bold text-blue">Number of printed documents</p>
              <p className="text-3xl font-bold text-black">{personalInfo.numberOfPrintedDocs}</p>
            </div>
            <BookSvg className="w-20 h-20" fill="#0388B4" />
          </div>
        </div>

        <div className="flex flex-col space-y-6 items-start h-[740px] flex-nowrap overflow-y-scroll w-[58%] p-4 bg-white rounded-lg drop-shadow">
          <p className="text-2xl font-bold text-blue">Printing History</p>
          {printingHistory.map((item) => {
            return (
              <PrintingHistoryItem printTime={item.time} docName={item.fileName} page={item.pages} 
                                  place={item.printer} copies={item.copy}/>
            )})} 
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPage;