// src/app/constants/api-endpoints.ts

// Authentication Endpoints
export const LOGIN_ENDPOINT = 'token';
export const LOGOUT_ENDPOINT = 'auth/logout';
export const REGISTER_ENDPOINT = 'auth/register';
export const REFRESH_TOKEN_ENDPOINT = 'auth/refresh';

// User Endpoints
export const GET_USER_PROFILE_ENDPOINT = 'user/profile';
export const UPDATE_USER_PROFILE_ENDPOINT = 'user/profile/update';

// Vehicle Endpoints
export const GET_VEHICLE_LIST_ENDPOINT = 'VehicleList';
export const ADD_VEHICLE_ENDPOINT = 'vehicles/add';
export const UPDATE_VEHICLE_ENDPOINT = 'vehicles/update';
export const DELETE_VEHICLE_ENDPOINT = 'vehicles/delete';

// Other Endpoints
export const GET_STATUS_ENDPOINT = 'status';
export const GET_SETTINGS_ENDPOINT = 'settings';


//Device Key Endpoints 
export const KEY_PRIMARY_IP = "ip0";
export const KEY_PRIMARY_PORT = "port0";
export const KEY_SECONDARY_IP = "ip1";
export const KEY_SECONDARY_PORT = "port1";
export const KEY_EMERGENCY_IP = "ip2";
const KEY_EMERGENCY_PORT = "port2";
const KEY_URL = "url";
const KEY_INTERVAL_IGNITION_ON = "ignOn";
const KEY_INTERVAL_IGNITION_OFF = "ignOff";
const KEY_AVAILABLE_HISTORY = "hisPackets";
const KEY_LAST_PING_PRIMARY = "ip0Ping";
const KEY_LAST_PING_SECONDARY = "ip1Ping";
const KEY_SUCCESS_RATE_PRIMARY = "ip0Success";
const KEY_SUCCESS_RATE_SECONDARY = "ip1Success";
const KEY_RESET_COUNT = "reset";
const KEY_RESERVE_INDEX = "resIndex";