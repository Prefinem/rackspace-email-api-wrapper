# Rackspace Email API Wrapper

[![npm pack age](https://nodei.co/npm/rackspace-email-api-wrapper.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/rackspace-email-api-wrapper)

[![Version](https://badge.fury.io/js/rackspace-email-api-wrapper.svg)](https://npmjs.org/package/rackspace-email-api-wrapper) [![Build Status](https://travis-ci.org/Prefinem/rackspace-email-api-wrapper.svg)](https://travis-ci.org/Prefinem/rackspace-email-api-wrapper)

[![Maintainability](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/maintainability)](https://codeclimate.com/github/Prefinem/rackspace-email-api-wrapper/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/test_coverage)](https://codeclimate.com/github/Prefinem/rackspace-email-api-wrapper/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/Prefinem/rackspace-email-api-wrapper.svg)](https://greenkeeper.io/)

![Weekly Downloads](https://img.shields.io/npm/dw/rackspace-email-api-wrapper.svg) ![Monthly Downloads](https://img.shields.io/npm/dm/rackspace-email-api-wrapper.svg) ![Yearly Downloads](https://img.shields.io/npm/dy/rackspace-email-api-wrapper.svg)

![Issues](https://img.shields.io/github/issues/Prefinem/rackspace-email-api-wrapper.svg) ![Pull Requests](https://img.shields.io/github/issues-pr/Prefinem/rackspace-email-api-wrapper.svg)

![Dependencies](https://david-dm.org/Prefinem/rackspace-email-api-wrapper.svg) ![Dev Dependencies](https://david-dm.org/Prefinem/rackspace-email-api-wrapper/dev-status.svg)

Rackspace Email API Wrapper is a wrapper for making calls to Rackspace's Email API

[Rackspace Documentation](http://api-wiki.apps.rackspace.com/api-wiki/index.php?title=Main_Page)

## Installation

`yarn install rackspace-email-api-wrapper`

## Getting Started

```javascript
const rackspace = require('rackspace-email-api-wrapper');

rackspace.init(YOUR_USER_KEY, YOUR_SECRET_KEY);

const getCustomer = async () => {
	const response = await rackspace.api('GET', `/customers?startswith=UserName`);

	console.log(response);

	// OR

	rackspace.api('GET', `/customers?startswith=UserName`).then((response) => {
		console.log(repsonse);
	});
};

const createCustomer = async () => {
	const response = await rackspace.api('POST', '/customers', {
		name: 'UserName',
	});

	console.log(response);

	// OR

	rackspace
		.api('POST', '/customers', {
			name: 'UserName',
		})
		.then((response) => {
			console.log(repsonse);
		});
};
```

## API

**init** - init(key, secret)

The init method sets the key and secret used for authenticating the API calls

**api** - api(method, url, payload)

The api method creates a signed request and parses the response. It returns a promise that can be awaited if you are using asycn / await
