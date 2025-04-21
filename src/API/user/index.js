import userAPI from "../../config/user"

// GET APIs
const getPersonalInformation = async () => {
    const query = "/personal_information"
    return userAPI.get(query)
}

const getParkingHistory = async () => {
    const query = "/parking_history"

    return userAPI.get(query)
}

const getParkingStatus = async () => {
    const query = "/parking_status"

    return userAPI.get(query)
}

const getCurrentParking = async () => {
    const query = "/current_parking"

    return userAPI.get(query)
}

const UserService = {
    getPersonalInformation,
    getParkingHistory,
    getParkingStatus,
    getCurrentParking,
}

export default UserService;