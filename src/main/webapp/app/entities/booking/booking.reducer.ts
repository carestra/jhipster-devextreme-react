import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBooking, defaultValue } from 'app/shared/model/booking.model';

export const ACTION_TYPES = {
  FETCH_BOOKING_LIST: 'booking/FETCH_BOOKING_LIST',
  FETCH_BOOKING: 'booking/FETCH_BOOKING',
  CREATE_BOOKING: 'booking/CREATE_BOOKING',
  UPDATE_BOOKING: 'booking/UPDATE_BOOKING',
  DELETE_BOOKING: 'booking/DELETE_BOOKING',
  RESET: 'booking/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBooking>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BookingState = Readonly<typeof initialState>;

// Reducer

export default (state: BookingState = initialState, action): BookingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BOOKING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BOOKING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BOOKING):
    case REQUEST(ACTION_TYPES.UPDATE_BOOKING):
    case REQUEST(ACTION_TYPES.DELETE_BOOKING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BOOKING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BOOKING):
    case FAILURE(ACTION_TYPES.CREATE_BOOKING):
    case FAILURE(ACTION_TYPES.UPDATE_BOOKING):
    case FAILURE(ACTION_TYPES.DELETE_BOOKING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOOKING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOOKING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOOKING):
    case SUCCESS(ACTION_TYPES.UPDATE_BOOKING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOOKING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/bookings';

// Actions

export const getEntities: ICrudGetAllAction<IBooking> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BOOKING_LIST,
  payload: axios.get<IBooking>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBooking> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOOKING,
    payload: axios.get<IBooking>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBooking> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOOKING,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBooking> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOOKING,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBooking> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOOKING,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
