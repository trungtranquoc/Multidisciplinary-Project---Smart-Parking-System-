import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { defaultPersonalData, samplePrintedFiles, parkingHistory } from "../../hardData";
import ParkingHistoryItem from "../../components/ParkingHistoryItem";
import PageTransitionBar from "../../components/PageTransitionBar";
// import UserService from "../../API/user";

const ParkingHistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [parkings, setParkings] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      setIsLoading(false);
    }

    setMaxPage(5);
    setParkings(parkingHistory);
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
      <Header pageName="Parking History" description="View your parking history here."/>
      
      <div className="w-full flex flex-col items-start p-5 bg-white rounded-lg drop-shadow space-y-2">
        <p className="text-2xl font-bold text-black mb-3">Parking History</p>
        <div className="w-full flex flex-row">
          <p className="w-[13%] flex items-start text-gray-dark font-medium text-lg">Date</p>
          <p className="w-[13%] flex items-start text-gray-dark font-medium text-lg">Motorbike</p>
          <p className="w-[12%] flex items-start text-gray-dark font-medium text-lg">Enter time</p>
          <p className="w-[12%] flex items-start text-gray-dark font-medium text-lg">Exit time</p>
          <p className="w-[27%] flex items-start text-gray-dark font-medium text-lg">Parking lot</p>
          <p className="w-[23%] flex items-start text-gray-dark font-medium text-lg">Responsible staff</p>
        </div>
        <div className="w-full h-[1px] bg-gray-dark"/>
        <div className="w-full space-y-3 flex flex-col">
          {parkings.map((item) =>
            (
              <ParkingHistoryItem {...item} />
            ))
          }
        </div>

        <div className="flex justify-center w-full py-2">
          <PageTransitionBar current={page} setPage={setPage} maxPage={maxPage}/>
        </div>
      </div>
    </div>
  );
};

export default ParkingHistoryPage;