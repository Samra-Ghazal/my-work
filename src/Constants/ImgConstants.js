let Images = {
  LOGO_IMG: require("../Assets/Images/banner.png").default,
  DASHBOARD_IMAGE: require("../Assets/Images/banner.png").default,
  DEFAULT_USER_IMG: require("../Assets/Images/banner.png").default,
  BACKGROUND_IMG: require("../Assets/Images/banner.png").default,
};

export default Images;

export const DEVICE_ID = "39.32.254.23";
export const BASE_URL = " https://genericformsapi-preprod.findanexpert.net";
export const LIVE_SERVICE_INVENTORY_BASE_URL =
  `${process.env.REACT_APP_BASE_URL_EXPERT}`;

export const STAGING_SERVICE_INVENTORY_SBASE_URL =
  `${process.env.REACT_APP_BASE_URL_EXPERT}`;

export const LIVE_STAFF_BASE_URL =
  `${process.env.REACT_APP_BASE_URL}/`;

export const STAGING_STAFF_BASE_URL =
  `${process.env.REACT_APP_BASE_URL_EXPERT}`
