import { formatDateTime } from "../utils/functions"

// Personal information page
export const defaultPersonalData = {
    name: "Default user",
    studentId: "9999999",
    email: "default@hcmut.edu.vn",
    phone: "0123456789",
    bike_certificate: "66 - 000527",
    register_bike: "SA - 59B.10125",
    account_due: "27/06/2026",
    last_parking: "20:16PM 05/04/2025",
}

export const defaultStudentStatistic = {
    last_30_day_parking: "97h 23m",
    last_30_day_use: 22,
    average_parking_duration: "3h 10m",
}

// System monitoring page
export const lightDeviceStatus = [
    { name: "Light A-1", id: "LA-1", status: true},
    { name: "Light A-2", id: "LA-2", status: false}, 
    { name: "Light B-1", id: "LB-1", status: false}, 
    { name: "Light B-2", id: "LB-2", status: true}, 
    { name: "Light C-1", id: "LC-1", status: true},  
    { name: "General Lamp 1", id: "LG-1", status: true}, 
    { name: "General Lamp 2", id: "LC-1", status: true}, 
]

export const venlitationDeivceStatus = [
    { name: "Ven A-1", id: "VA-1", status: true},
    { name: "Ven A-2", id: "VA-2", status: false}, 
    { name: "Ven B-1", id: "VB-1", status: false}, 
    { name: "Ven B-2", id: "VB-2", status: true}, 
    { name: "Ven C-1", id: "VC-1", status: false},  
    { name: "Ven C-2", id: "VC-2", status: false},
]

export const parkingHistory = [
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
    { date: "07-04-2025", day_in_week: "Mon", bike: "SA - 59B.10125", enter: "14:10", exit: "16:05", parking_lot: "Entrance 3 - To Hien Thanh Parking Lot", responsible: "Tran Quoc B" },
]

// export {samplePrintedFiles, sampleWaitingFiles, sampleAllowedFormats}