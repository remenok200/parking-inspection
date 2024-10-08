const CONSTANTS = {
  LIMIT: 30,
  SESSION_EXPIRES_TIME: 3600,
  MOBILE_WIDTH: 870,
  QR_CODE_BASE_URL: 'http://localhost:3000',
  GET_IMAGES_BASE_URL: 'http://localhost:5001/images'
}

export const ACTION_TYPES_FILTER = {
  CREATE_PROTOCOL: 'create protocol',
  UPDATE_PROTOCOL: 'update protocol',
  DELETE_PROTOCOL: 'delete protocol',
  CREATE_PARK_OFFICER: 'create park officer',
  UPDATE_PARK_OFFICER: 'update park officer',
  DELETE_PARK_OFFICER: 'delete park officer',
  DISMISS_PARK_OFFICER: 'dismiss park officer',
  RESTORE_PARK_OFFICER: 'restore park officer',
  GET_ALL_PROTOCOL_IMAGES: 'get all protocol images',
  ADD_IMAGES_TO_PROTOCOL: 'add image',
  GET_IMAGE_BY_ID: 'get image by ID',
  DELETE_IMAGES: 'delete image',
  GET_USER_REFRESH_TOKENS: 'get user refresh tokens (sessions)',
  REVOKE_REFRESH_TOKEN: 'revoke refresh token',
  GET_ALL_LOGS: 'get all logs',
  GET_ALL_USER_LOGS: 'get all user logs',
  BAN_USER: 'ban user',
  UNBAN_USER: 'unban user',
  GET_ALL_BANNED_USERS: 'get all banned users',
  GET_ALL_USERS: 'get all users',
  MAKE_ADMIN: 'make user admin',
  REMOVE_ADMIN: 'removed user admin',
  LOGOUT: 'logout'
};

export default CONSTANTS;