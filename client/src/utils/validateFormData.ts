import * as Yup from "yup";

const validateFormData = (data: any, validationRules: any) => {
    const schema = Yup.object().shape(validationRules);
    return new Promise((resolve, reject) => {
        schema
            .validate(data, { abortEarly: false })
            .then(() => {
                resolve(data);
            })
            .catch((errors) => {
                const validationErrors = new Map();
                errors.inner.forEach((error: any) => {
                    validationErrors.set(error.path, error.message);
                });
                reject(validationErrors);
            });
    });
};

export default validateFormData;
