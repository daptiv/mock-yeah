[![Build Status](https://travis-ci.org/daptiv/mock-yeah.png)](https://travis-ci.org/daptiv/mock-yeah)

mock-yeah
=========

- [Mock Api Data](#mock-api-data)
	- [FAQ](#faq)
			- [How can I have a specific return for a given id?](#how-can-i-have-a-specific-return-for-a-given-id)

Mock Api Data
=============

Mock out any endpoint in the Ppm api in a couple simple steps

1. Make a folder that matches your endpoint
    1. If your endpoint is `something/:id
    1. In osx `mkdir -p something/#id`
    1. Hashes strings (#id) are interpreted as route parameters
1. Make a file in your folder named to the method you wish to mock
    1. `touch something/#id/#id.get.json`
    1. supported methods are 'get', 'put', 'post', 'del'
    1. fill in whatever you expect the json to look like from the real api
1. Access your data via `http://ppmspa.dev/something/myweirdid

FAQ
---

#### How can I have a specific return for a given id? ####
1. Just name your file `specificid.get.json`
2. If you have 2 or more route parameters above your folder name it `firstrouteparam.second.get.json`