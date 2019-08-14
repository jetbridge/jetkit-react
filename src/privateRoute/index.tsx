import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { isLoggedIn } from 'axios-jwt'

interface IPrivateRotueProps extends RouteProps {
  fallbackRoute: string
}

function PrivateRoute(props: IPrivateRotueProps) {
  if (isLoggedIn) {
    return <Route {...props} />
  }
  return <Redirect to={props.fallbackRoute} />
}

export default PrivateRoute
