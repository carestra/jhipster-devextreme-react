import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ActivityCalendar from "app/activity/manager/activity-calendar";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/calendar`} component={ActivityCalendar} />
    </Switch>
  </>
);

export default Routes;
