import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { isLoggedIn } from 'axios-jwt'

interface IPrivateRouteProps extends RouteProps {
  fallbackRoute: string
}

function PrivateRoute(props: IPrivateRouteProps) {
  if (isLoggedIn()) {
    return <Route {...props} />
  }
  return <Redirect to={props.fallbackRoute} />
}

export default PrivateRoute
