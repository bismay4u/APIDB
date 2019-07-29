const packageConfig = require('../package.json');

module.exports = {
	name: packageConfig.title,
	version: packageConfig.version,
	packageid: packageConfig.name,
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8888,
	base_url: process.env.BASE_URL || 'http://localhost:8888',

	noauth: [
		"/auth",
		"/auth/register",
		"/auth/forgotpwd",
		"/auth/resetpwd",
		"/ping",
		"/test",
		"/"
	],
	jwt: {
		secret: "Zv7QAeJWhWz6j2kA"
	},
	mail:{
		host: 'email-smtp.us-east-1.amazonaws.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
		    user: "smtp-userid", // generated ses user
		    pass: "smtp-pwd" // generated ses password
		}
	}
};