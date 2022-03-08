const localConstants = {
  API_BASE_URL: "http://localhost:8000",
};

const developmentConstants = {
  API_BASE_URL: "https://jiva-backend-staging.herokuapp.com",
};

const productionConstants = {
  API_BASE_URL: "https://jiva-backend.herokuapp.com",
};

let constants = null;

switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
  case "local":
    constants = localConstants;
    break;
  case "develop":
    constants = developmentConstants;
    break;
  case "production":
    constants = productionConstants;
    break;
  default:
    constants = developmentConstants;
}

export default constants;
