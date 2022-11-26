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
            "@internals/store": path.resolve(__dirname, "src/store.ts")
        }
    }
};
