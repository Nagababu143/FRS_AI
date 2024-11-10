import { IHomeService } from '../Interfaces/IHomeService';

export const HOME_SCREEN_MOCK_DATA:IHomeService[] = [
    {
        id:'1',
        serviceIcon:require('../Assets/Icons/woman_face.png'),
        serviceName:'AWW/AWH',
        serviceSubTitle:'Enrollment',
    },
    {
        id:'2',
        serviceIcon:require('../Assets/Icons/woman_face.png'),
        serviceName:'THR',
    },
    {
        id:'3',
        serviceIcon:require('../Assets/Icons/data_error.png'),
        serviceName:'Unsynced Attendance Data',
    },
    {
        id:'4',
        serviceIcon:require('../Assets/Icons/logout_icon.png'),
        serviceName:'Logout',
    },
];
