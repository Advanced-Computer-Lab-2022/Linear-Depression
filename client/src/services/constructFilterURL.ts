import { config } from "../config/config";

const constructFilterURL = (searchParams: URLSearchParams) => {
    let apiURL = `${config.API_URL}/courses`;
    const params = searchParams.toString();
    if (params.length > 0) {
        apiURL += `?${params}`;
    }
    return apiURL;
};

export { constructFilterURL };
