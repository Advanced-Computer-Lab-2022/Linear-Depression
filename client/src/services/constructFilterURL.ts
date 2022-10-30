import { config } from "../config/config";

const constructFilterURL = (url: string, searchParams: URLSearchParams) => {
    let apiURL = url;
    const params = searchParams.toString();
    if (params.length > 0) {
        apiURL += `${params}`;
    }
    return apiURL;
};

export { constructFilterURL };
