const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./src/server.ts"];

const doc = {
    info: {
        version: "1.0.0",
        title: "API Documentation",
        description: "API Documentation"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
        CorporateTrainee: {
            type: "object",
            properties: {
                firstName: {
                    type: "string"
                },
                lastName: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                hashPassword: {
                    type: "string"
                },
                _id: {
                    type: "string"
                },
                corporate: {
                    type: "string"
                },
                expiredAt: {
                    type: "string"
                },
                status: {
                    type: "string"
                }
            }
        }
    }
};
swaggerAutogen(outputFile, endpointsFiles, doc);
