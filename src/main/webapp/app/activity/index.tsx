import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ActivityManager from './manager';
import Member from './member';
import {AUTHORITIES} from "app/config/constants";
import PrivateRoute from "app/shared/auth/private-route";

/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <PrivateRoute path={`${match.url}/manager`} component={ActivityManager} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <ErrorBoundaryRoute path={`${match.url}/member`} component={Member} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
