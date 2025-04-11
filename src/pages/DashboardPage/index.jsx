import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { defaultPersonalData, samplePrintedFiles } from "../../hardData";
// import UserService from "../../API/user";

const DashooardPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState(null)
  const [printingHistory, setPrintingHistory] = useState([])
  const [studentId, setStudentId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
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
      <Header pageName="Dashboard Page" description="View your parking statistic here."/>
      
    </div>
  );
};

export default DashooardPage;