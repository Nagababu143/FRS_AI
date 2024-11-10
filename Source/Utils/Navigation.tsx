import { NavigationContainerRef} from '@react-navigation/native';
import React from 'react';
import { RootNavigationList } from '../Interfaces/INavigation';

export const navigationRef = React.createRef<NavigationContainerRef<RootNavigationList>>();
export function navigate(name: keyof RootNavigationList) {
    navigationRef.current?.navigate(name);
}
