[![Build Status](https://travis-ci.org/daptiv/mock-yeah.png)](https://travis-ci.org/daptiv/mock-yeah)

mock-yeah
=========

- [Mock Api Data](#mockApiData)
    - [Template Fields](#templateFields)
	- [FAQ](#faq)
		- [How can I have a specific return for a given id?](#specificId)

Mock Api Data <a name="mockApiData"></a>
=============

Mock out any endpoint in a couple simple steps

1. Make a folder that matches your endpoint
    1. If your endpoint is `something/:id
    1. In osx `mkdir -p something/#id`
    1. Hashes strings (#id) are interpreted as route parameters
1. Make a file in your folder named to the method you wish to mock
    1. `touch something/#id/#id.get.json`
    1. supported methods are 'get', 'put', 'post', 'del'
    1. fill in whatever you expect the json to look like from the real api
1. Access your data via `http://mymockserver.dev/something/myweirdid

Template Fields <a name="templateFields"></a>
---------------

URL parameters can be applied to template fields in your mock data.

1. Add a template field to your mock data file. Template fields are identified by surrounding curly braces: `{field}`.
    - The field identifier must be alphanumeric and must not contain any whitespace.
    - The field identifier should match the corresponding URL parameter (case sensitive).
1. Run mock-yeah and access the URL for your mock data.
1. All template field instances will be replaced with the corresponding URL parameter, if present.

    ###Example
    ####person/#personId/#personId.get.json
        {
            id: "{personId}",
            name: "John Doe"
        }
    ####Response of GET http://mymockserver.dev/person/42
        {
            id: "42",
            name: "John Doe"
        }

FAQ <a name="faq"></a>
---

#### How can I have a specific return for a given id? #### <a name="specificId"></a>
1. Just name your file `specificid.get.json`
2. If you have 2 or more route parameters above your folder name it `firstrouteparam.second.get.json`
