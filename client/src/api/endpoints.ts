import { config } from "@internals/config";

// TODO: Implement a generic Network class that handles all the network requests and utilizes this endpoints structure
const ENDPOINTS = {
    getUserReports: {
        url: `${config.API_URL}/me/reports`,
        method: "GET"
    },

    getReport: (reportId: string) => ({
        url: `${config.API_URL}/me/reports/${reportId}`,
        method: "GET"
    }),

    addReport: {
        url: `${config.API_URL}/me/reports`,
        method: "POST"
    },

    addThreadReply: (reportId: string) => ({
        url: `${config.API_URL}/me/reports/${reportId}`,
        method: "POST"
    })
};

export default ENDPOINTS;
