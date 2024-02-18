export const HOST = "http://127.0.0.1:4000";

// main-routes
const AUTH_ROUTE = `${HOST}/api/auth`;

// subroutes
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ONBOARD_NEW_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
