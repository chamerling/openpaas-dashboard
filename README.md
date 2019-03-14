# octopus-dashboard

This project is a 'seed' to be used to create other OpenPaaS web application using Vue.
It provides the layout and some basic components to start coding within minutes. Documentation is available on [http://docs.open-paas.org/frontend/vue/](http://docs.open-paas.org/frontend/vue/)

The seed has been developed using Node 10, please use at least the same.

## Project configuration

You can update the `.env` file to define the OpenPaaS instance to reach, or override it in a new `.env.development.local` file. Current environment variables are:

- `VUE_APP_OPENPAAS_URL`: route to your OpenPaaS instance. Needs to be `http://localhost:8080` in development mode.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development

```
VUE_APP_OPENPAAS_URL=http://localhost:8080 npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```
