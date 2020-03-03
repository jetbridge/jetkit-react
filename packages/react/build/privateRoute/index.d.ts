/// <reference types="react" />
import { RouteProps } from 'react-router';
interface IPrivateRouteProps extends RouteProps {
    fallbackRoute: string;
}
declare function PrivateRoute(props: IPrivateRouteProps): JSX.Element;
export default PrivateRoute;
