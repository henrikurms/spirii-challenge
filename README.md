# Spirii coding challenge

## Description

The data aggregation microservice should collect transactions from transaction API and expose 2 endpoints:

1. Get aggregated data by user Id: balance, earned, spent, payout, paid out
2. Get list of requested payouts (user ID, payout amount), if there are several payouts
   requested by a user, then the amount must be aggregated into one.

As we are only allowed 5 requests per minute at a maximum 1000 transactions, in order to stay up-to date we have to assume
the transaction services does not get more than 5000 new transactions per minute on average. If we get more than 10000 transactions
behind we cannot fetch all the missing transactions in the 2 minutes we are allowed to be delayed.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Test plan

...