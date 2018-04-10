import { IFacadeContainer } from 'najs-facade';
import { DriverProvider } from './providers/DriverProvider';
export declare type BuiltinClasses = {
    FacadeContainer: IFacadeContainer;
    Provider: {
        DriverProvider: typeof DriverProvider;
    };
};
