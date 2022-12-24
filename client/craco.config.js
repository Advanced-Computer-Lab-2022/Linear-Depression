const path = require("path");
module.exports = {
    webpack: {
        alias: {
            "@internals/components": path.resolve(__dirname, "src/components"),
            "@internals/config": path.resolve(__dirname, "src/config/config.ts"),
            "@internals/contexts": path.resolve(__dirname, "src/contexts"),
            "@internals/hooks": path.resolve(__dirname, "src/hooks"),
            "@internals/media/*": path.resolve(__dirname, "src/media/*"),
            "@internals/pages": path.resolve(__dirname, "src/pages"),
            "@internals/pages/*": path.resolve(__dirname, "src/pages/*"),
            "@internals/services": path.resolve(__dirname, "src/services"),
            "@internals/types": path.resolve(__dirname, "src/types"),
            "@internals/modals": path.resolve(__dirname, "src/components/modals"),
            "@internals/redux": path.resolve(__dirname, "src/redux"),
            "@internals/api": path.resolve(__dirname, "src/api"),
            "@internals/handlers": path.resolve(__dirname, "src/handlers"),
            "@internals/utils": path.resolve(__dirname, "src/utils")
        }
    }
};
