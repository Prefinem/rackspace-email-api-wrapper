import crypto from 'crypto';
import https from 'https';

const rackspace = {
	hostname: 'api.emailsrvr.com',
	key: '',
	secret: '',
	userAgent: 'rackspace-email-api-wrapper',
	version: 'v1',
};

const getYear = (date = new Date()) => date.getFullYear();
const getMonth = (date = new Date()) => (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1);
const getDay = (date = new Date()) => (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
const getHours = (date = new Date()) => (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours());
const getMinutes = (date = new Date()) => (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
const getSeconds = (date = new Date()) => (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
const getTime = (date = new Date()) => `${getYear(date)}${getMonth(date)}${getDay(date)}${getHours(date)}${getMinutes(date)}${getSeconds(date)}`;

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

export const init = (key, secret) => {
	rackspace.key = key;
	rackspace.secret = secret;
};

export const api = (method, url, data) =>
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

export default {
	api,
	init,
};
