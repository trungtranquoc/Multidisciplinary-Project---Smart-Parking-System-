import { Route, Routes } from "react-router-dom"
import Adminsidebar from "../../components/AdminSidebar"
import { Suspense, lazy } from "react"

const RealTimeManagementPage = lazy(() => import("../../pages/admin/RealTimeManagementPage"))
const DashboardPage = lazy(() => import("../../pages/admin/DashboardPage"))
const MonitoringPage = lazy(() => import("../../pages/admin/MonitoringPage"))
const ParkingHistoryPage = lazy(() => import("../../pages/admin/ParkingHistoryPage"))

const AdminRoute = () => {
    return (
        <div className="flex h-full">
            <Adminsidebar />
            <Routes>
                <Route 
                    path="real_time_management"
                    element={
                        <Suspense>
                            <RealTimeManagementPage />
                        </Suspense>
                    }
                />
                <Route
                    path="dashboard"
                    element={
                        <Suspense>
                            <DashboardPage />
                        </Suspense>
                    }
                />
                
                <Route 
                    path="monitoring"
                    element={
                        <Suspense>
                            <MonitoringPage />
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

export default AdminRoute;