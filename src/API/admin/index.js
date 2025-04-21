import adminAPI from "../../config/admin";

const getParkingHistory = async () => {
    const query = "/parking_history"

    return adminAPI.get(query)
}

const getMonitoringData = async () => {
    const query = "/monitor_system"

    return adminAPI.get(query)
}

const toggleMonitoringData = async (id) => {
    const query = `/toggle_device_system?id=${id}`

    return adminAPI.put(query)
}

const getParkingCondition = async () => {
    const query = "/parking_condition"

    return adminAPI.get(query)
}

const getParkingStatus = async () => {
    const query = "/parking_status"

    return adminAPI.get(query)
}

const AdminService = {
    getParkingHistory,
    getMonitoringData,
    toggleMonitoringData,
    getParkingCondition,
    getParkingStatus
}

export default AdminService;