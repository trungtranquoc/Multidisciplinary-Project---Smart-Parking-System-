import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import SlotProgress from "../../../components/PieChartStatus";
import WorkTimeProgess from "../../../components/WorkingTimeProgress";
import AdminService from "../../../API/admin";
import { formatDayOfWeek, formatHour, formatHour2 } from "../../../utils/functions";
import { hardBikeList, hardParkingStatus } from "../../../hardData";
import PageTransitionBar from "../../../components/PageTransitionBar";

const procecssingBikeData = (data) => {
  return {
    entry: data["No."],
    motorbike: data.bike,
    studentId: data.student_id,
    time: formatHour2(data.enter),
    lot: data.parking_lot,
  };
}

const perPage = 10;

const RealTimeManagementPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lotData, setLotData] = useState(null);
  const [bikeList, setBikeList] = useState(hardBikeList);
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [showParkings, setShowParkings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await AdminService.getParkingStatus().then((res) => {
        setLotData(res.data);
        setBikeList(res.data.list_bike.map((item) => procecssingBikeData(item)));
        setMaxPage(Math.ceil(res.data.list_bike.length / perPage));

        // console.log("Max page: ", Math.ceil(res.data.list_bike.length / perPage));
      }).catch((err) => {
        console.log("Error: ", err);

        setBikeList(hardBikeList);
        setLotData(hardParkingStatus);
        setMaxPage(Math.ceil(hardBikeList.length / perPage));
      }).finally(() => {
        setIsLoading(false);
      })
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Max Page: ", maxPage)
    const start = (page - 1) * perPage;
    const end = start + perPage > bikeList.length ? bikeList.length : start + perPage;
    setShowParkings(bikeList.slice(start, end));
  }, [page, maxPage, bikeList])

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="font-bold text-4xl text-blue">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full overflow-y-auto max-h-screen h-screen">
      <Header pageName="Dashboard Page" description="View your parking statistic here." />
      <div className="dashboard flex flex-col w-full gap-10">
        <div className="status-upper-bar w-full">
          <div className="flex flex-wrap justify-start m-0 gap-4 w-full">
            <div className="flex-1 p-6 rounded-2xl shadow-md border border-gray-200 bg-white space-y-6">
              <h1 className="text-2xl font-bold text-black mb-4">Working time remain</h1>
              <div className="flex items-center justify-center mb-6">
                <WorkTimeProgess total={17 * 60 * 60} work={11 * 60 * 60 + 58 * 60 + 15}/>
              </div>
              <div className="flex justify-around text-sm">
                <div className="flex items-center space-x-2">
                  <span>{formatDayOfWeek(new Date())}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Closing: {formatHour(lotData.closing)}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 rounded-2xl shadow-md border border-gray-200 bg-white space-y-6">
              <h1 className="text-2xl font-bold text-black mb-4">Available slots</h1>
              <div className="flex items-center justify-center mb-6">
                <SlotProgress total={lotData.maximum_slot} available={lotData.available_slot}/>
              </div>
              <div className="flex justify-around text-sm">
                <div className="flex items-center space-x-2 text-green-600">
                  <span className="text-xl">&#9679;</span>
                  <span>Available slots</span>
                </div>
                <div className="flex items-center space-x-2 text-red-600">
                  <span className="text-xl">&#9679;</span>
                  <span>Unavailable slots</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="status-lower-bar w-full">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Real-time Parking Registry</h2>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Entry No.</th>
                  <th className="text-left p-2">Motorbike</th>
                  <th className="text-left p-2">Student Id</th>
                  <th className="text-left p-2">Enter time</th>
                  <th className="text-left p-2">Parking Lot</th>
                </tr>
              </thead>
              <tbody>
                {showParkings.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{item.entry}</td>
                    <td className="p-2">{item.motorbike}</td>
                    <td className="p-2">{item.studentId}</td>
                    <td className="p-2">{item.time}</td>
                    <td className="p-2">{item.lot}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center w-full py-2">
              <PageTransitionBar current={page} setPage={setPage} maxPage={maxPage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeManagementPage;