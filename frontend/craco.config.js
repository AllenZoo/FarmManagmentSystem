const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@assets": path.resolve(__dirname, "src/assets"),
			"@components": path.resolve(__dirname, "src/components"),
			"@config": path.resolve(__dirname, "src/config"),
			"@contexts": path.resolve(__dirname, "src/contexts"),
			"@controllers": path.resolve(__dirname, "src/controllers"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@src": path.resolve(__dirname, "src"),
		},
	},
	jest: {
		configure: {
			moduleNameMapper: {
				"@assets/(.*)": "<rootDir>/src/assets/$1",
				"@components/(.*)": "<rootDir>/src/components/$1",
				"@config/(.*)": "<rootDir>/src/config/$1",
				"@contexts/(.*)": "<rootDir>/src/contexts/$1",
				"@controllers/(.*)": "<rootDir>/src/controllers/$1",
				"@pages/(.*)": "<rootDir>/src/pages/$1",
				"@utils/(.*)": "<rootDir>/src/utils/$1",
				"@src/(.*)": "<rootDir>/src/$1",
			},
		},
	},
};
