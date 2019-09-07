# ETHBoston Front End

This is a project for [ETHBoston](https://eth.boston/)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Google Chrome](https://google.com/chrome/)
* [Ganache](https://www.trufflesuite.com/ganache)

## Installation

* `git clone <repository-url>` this repository
* `cd eth-boston-frontend`
* `npm install`

## Running / Development

* `npx ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

## Local development

Follow [these instructions](https://docs.tor.us/developers/getting-started-with-ganache) to get started with Ganache and Torus.

Quick reference:

```
npm install -g ganache-http-proxy
npm install -g ganache-cli
ganache-cli -p 9545
ganache-http-proxy
```

### Code Generators

Make use of the many generators for code, try `npx ember help generate` for more details

### Running Tests

* `npx ember test`
* `npx ember test --server`

### Linting

* `npx npm run lint:hbs`
* `npx npm run lint:js`
* `npx npm run lint:js -- --fix`

### Building

* `npx ember build` (development)
* `npx ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
