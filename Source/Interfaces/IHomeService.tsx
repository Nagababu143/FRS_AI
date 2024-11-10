import { ImageSourcePropType } from 'react-native';

export interface IHomeService{
    id:string;
    serviceIcon:ImageSourcePropType;
    serviceName:string;
    serviceSubTitle?:string;
}
