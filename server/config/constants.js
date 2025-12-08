export const API_CONFIG = {
  ISS_NOW_URL: "http://api.open-notify.org/iss-now.json",
  ISS_PASS_URL: "http://api.open-notify.org/iss-pass.json",
  REQUEST_TIMEOUT: 5000, // 5 seconds
};

export const ISS_CONSTANTS = {
  ORBITAL_ALTITUDE: 408, // Average altitude in km
  ORBITAL_SPEED: 7.66, // Average speed in km/s
  ORBITAL_PERIOD: 5520, // Orbital period in seconds (~92 minutes)
  EARTH_RADIUS: 6371, // Earth radius in km
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
