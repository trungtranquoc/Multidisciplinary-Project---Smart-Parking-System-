import { Route, Routes } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { Suspense, lazy } from "react"

const PersonalInformationPage = lazy(() => import("../../pages/PersonalInformation"))
const DashboardPage = lazy(() => import("../../pages/DashboardPage"))
const ParkingHistoryPage = lazy(() => import("../../pages/ParkingHistoryPage"))

const UserRoute = () => {
    return (
        <div className="flex h-full">
            <Sidebar />
            <Routes>
                <Route 
                    path="dashboard"
                    element={
                        <Suspense>
                            <DashboardPage />
                        </Suspense>
                    }
                />

                <Route 
                    path="student_information"
                    element={
                        <Suspense>
                            <PersonalInformationPage />
                        </Suspense>
                    }
                />
                
                <Route 
                    path="parking_history"
                    element={
                        <Suspense>
                            <ParkingHistoryPage />
                        </Suspense>
                    }
                />
            </Routes>
        </div>
    )
}

export default UserRoute;