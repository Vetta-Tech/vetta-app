import React from 'react';

import {useToast} from 'react-native-toast-notifications';

export function withToast(Component: any) {
  return function WrappedComponent(props: any) {
    const toastFuncs = useToast();
    return <Component {...props} {...toastFuncs} />;
  };
}
