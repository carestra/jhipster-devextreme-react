import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IActivityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ActivityDetail = (props: IActivityDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { activityEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="pacificApp.activity.detail.title">Activity</Translate> [<b>{activityEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="pacificApp.activity.title">Title</Translate>
            </span>
          </dt>
          <dd>{activityEntity.title}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="pacificApp.activity.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>{activityEntity.startDate ? <TextFormat value={activityEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="pacificApp.activity.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{activityEntity.endDate ? <TextFormat value={activityEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="recurrenceRule">
              <Translate contentKey="pacificApp.activity.recurrenceRule">Recurrence Rule</Translate>
            </span>
          </dt>
          <dd>{activityEntity.recurrenceRule}</dd>
        </dl>
        <Button tag={Link} to="/activity" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/activity/${activityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ activity }: IRootState) => ({
  activityEntity: activity.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);
