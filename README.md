# stock-track-frontend (v0.1.0 In Progress)

Frontend part of small stock price tracker webapp using NuxtJS, apollo graphql, and bootstrap vue. Backend script information can be found in this [Repository](https://github.com/bobbykim89/stock-track-backend)

## Scripts

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Dependencies

@nuxtjs/apollo\
@nuxtjs/moment\
axios\
bootstrap-vue\
graphql-tag\
js-cookie\
jwt-decode

## Changes

1. Searches stock symbols from alpha vantage API and fetches stock price info from finnhub API, due to search accuracy issue in finnhub API.
2. Vuex store prevents having favorite stocks list from having duplication. It will send error alert and stop the currnet process.
3. Add todo list tab and the data will be handled in separate vuex store.
4. Data from backend will have GraphQL form, and they will be stored/handled in Vuex store.
5. Private routes added, and user needs to login to access / and /todo route.
6. Todo List orders, colors changes dynamically based on status of completion and task type.
7. Search bar added on todo section to filter certain todo.

## Known Issues

N/A

## Update Log

N/A
