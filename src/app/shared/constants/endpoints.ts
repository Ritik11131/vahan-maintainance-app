// Authentication Endpoints
export const LOGIN_ENDPOINT = 'token';

// Device Endpoints
export const GET_DEVICES_LIST_ENDPOINT = 'maintenance/api/device';
export const GET_CREATE_DEVICE_ENDPOINT = 'maintenance/api/device';
export const GET_FILTERED_DEVICES_LIST_ENDPOINT = 'maintenance/api/device/configMatchFilter';
export const GET_PING_BY_ID_ENDPOINT = 'maintenance/api/ping';

// State Endpoints
export const GET_STATES_LIST_ENDPOINT = 'maintenance/api/state';

//Backend Endpoints
export const GET_BACKEND_LIST_BY_STATEID_ENDPOINT = 'maintenance/api/backend/ByStateId'
export const CREATE_UPDATE_BACKEND_ENDPOINT = 'maintenance/api/backend'
export const GET_BACKEND_COMMAND_LIST_ENDPOINT = 'maintenance/api/backend/GetBackendCommands'

//Command Key Endpoints
export const GET_COMMAND_KEY_LIST_ENDPOINT = 'maintenance/api/commandkey';
export const UPDATE_COMMAND_TEXT_ENDPOINT = 'maintenance/api/backend/UpdateBackendCommands';

// Vehicle Endpoints
export const GET_VEHICLE_LIST_ENDPOINT = 'VehicleList';

// Other Endpoints
export const GET_STATUS_ENDPOINT = 'status';
export const GET_SETTINGS_ENDPOINT = 'settings';