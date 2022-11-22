const path = require("path");
module.exports = {
    webpack: {
        alias: {
            "@internals/pages": path.resolve(__dirname, "src/pages")
        }
    }
};
