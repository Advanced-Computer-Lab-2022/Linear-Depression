import bcrypt from "bcrypt";

const execute = async (request: any) => {
    if (request.payload.password) {
        request.payload = {
            ...request.payload,
            passwordHash: await bcrypt.hash(request.payload.password, 10)
        };

        delete request.payload.password;
    }

    return request;
};

export default execute;
