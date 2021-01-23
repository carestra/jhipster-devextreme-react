import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ActivityBooking from "app/activity/member/activity-booking";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/booking`} component={ActivityBooking} />
    </Switch>
  </>
);

export default Routes;
