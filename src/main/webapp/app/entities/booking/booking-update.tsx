import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookingUpdate = (props: IBookingUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bookingEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/booking');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.activityDate = convertDateTimeToServer(values.activityDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...bookingEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pacificApp.booking.home.createOrEditLabel">
            <Translate contentKey="pacificApp.booking.home.createOrEditLabel">Create or edit a Booking</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="booking-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="booking-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="booking-status">
                  <Translate contentKey="pacificApp.booking.status">Status</Translate>
                </Label>
                <AvField id="booking-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="activityTitleLabel" for="booking-activityTitle">
                  <Translate contentKey="pacificApp.booking.activityTitle">Activity Title</Translate>
                </Label>
                <AvField id="booking-activityTitle" type="text" name="activityTitle" />
              </AvGroup>
              <AvGroup>
                <Label id="activityDateLabel" for="booking-activityDate">
                  <Translate contentKey="pacificApp.booking.activityDate">Activity Date</Translate>
                </Label>
                <AvInput
                  id="booking-activityDate"
                  type="datetime-local"
                  className="form-control"
                  name="activityDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.bookingEntity.activityDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="activityIdLabel" for="booking-activityId">
                  <Translate contentKey="pacificApp.booking.activityId">Activity Id</Translate>
                </Label>
                <AvField id="booking-activityId" type="text" name="activityId" />
              </AvGroup>
              <AvGroup>
                <Label id="attendeeIdLabel" for="booking-attendeeId">
                  <Translate contentKey="pacificApp.booking.attendeeId">Attendee Id</Translate>
                </Label>
                <AvField id="booking-attendeeId" type="text" name="attendeeId" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="booking-lastModifiedDate">
                  <Translate contentKey="pacificApp.booking.lastModifiedDate">Last Modified Date</Translate>
                </Label>
                <AvInput
                  id="booking-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.bookingEntity.lastModifiedDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/booking" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  bookingEntity: storeState.booking.entity,
  loading: storeState.booking.loading,
  updating: storeState.booking.updating,
  updateSuccess: storeState.booking.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookingUpdate);
