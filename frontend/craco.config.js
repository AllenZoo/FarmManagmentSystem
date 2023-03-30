const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@src": path.resolve(__dirname, "src"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@controllers": path.resolve(__dirname, "src/controllers"),
			"@pages": path.resolve(__dirname, "src/pages"),
		},
	},
  jest: {
    configure: {
      moduleNameMapper: {
        "@src/(.*)": "<rootDir>/src/$1",
        "@assets/(.*)": "<rootDir>/src/assets/$1",
        "@components/(.*)": "<rootDir>/src/components/$1",
        "@config/(.*)": "<rootDir>/src/config/$1",
        "@controllers/(.*)": "<rootDir>/src/controllers/$1",
        "@pages/(.*)": "<rootDir>/src/pages/$1",
      },
    },
  }
};
