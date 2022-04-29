/* module.exports = {
    plugins: [require("tailwindcss"), require("autoprefixer")],
}; */

// const tailwindcss = require("tailwindcss");

module.exports = {
    plugins: [
        // require("tailwindcss")("tailwind.config.js"),
        require("tailwindcss"),

        // require("autoprefixer")(),
        require("autoprefixer"),

        require("cssnano")({
            preset: "default",
        }),
    ],
};
