const crypto = require('crypto');
const https = require('https');
const format = require('date-format');

const rackspace = {
	hostname: 'api.emailsrvr.com',
	key: '',
	secret: '',
	userAgent: 'rackspace-email-api-wrapper',
	version: 'v1',
};

const getTime = (date = new Date()) => format('yyyyMMddhhmmss', date);
const getHash = (time) =>
	crypto
		.createHash('sha1')
		.update(`${rackspace.key}${rackspace.userAgent}${time}${rackspace.secret}`)
		.digest('base64');
const buildSignature = (time = getTime()) => `${rackspace.key}:${time}:${getHash(time)}`;
const buildHeaders = () => ({
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'User-Agent': rackspace.userAgent,
	'X-Api-Signature': buildSignature(),
});
const buildOptions = (method, url) => ({
	headers: buildHeaders(),
	hostname: rackspace.hostname,
	method,
	path: `/${rackspace.version}${url}`,
});

const apiResponse = (response, resolve) => {
	let output = '';

	response.on('data', (chunk) => {
		output += chunk;
	});

	response.on('end', () => {
		try {
			const res = JSON.parse(output);

			resolve(res);
		} catch (error) {
			resolve(output);
		}
	});
};

const init = (key, secret) => {
	rackspace.key = key;
	rackspace.secret = secret;
};

const api = (method, url, data) =>
	new Promise((resolve, reject) => {
		const request = https.request(buildOptions(method, url), (response) => apiResponse(response, resolve));

		request.on('error', (error) => {
			reject(error);
		});

		if (data) {
			request.end(JSON.stringify(data));
		} else {
			request.end();
		}
	});

module.exports = {
	api,
	init,
};
