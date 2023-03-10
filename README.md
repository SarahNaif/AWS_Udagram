


# Udagram
Hosting a Full-Stack Application: 
This project is part of the Udacity FullStack JavaScript nanodegree. is provided to you as an alternative starter project 

[![CircleCI](https://circleci.com/gh/SarahNaif/AWS_Udagram.svg?style=shield&circle-token=3a60df13122e7128fbfa3bc502651a3ab150bee1)](<LINK>)

## Link 
http://mybucketfrontend.s3-website-us-east-1.amazonaws.com
http://udagram-api-dev.eba-xzkmvt4f.us-east-1.elasticbeanstalk.com/api/v0/feed

## Configuration Screenshots


### PostgreSQL RDS database

![PostgreSQL RDS database](./documentation/images/DB-RDS.png)


### Elastic Beanstalk Environment

![Elastic Beanstalk Environment](./documentation/images/EB-health.png)

### FrontEnd S3 Bucket

![FrontEnd S3 Bucket](./documentation/images/S3-bucket.png)

### CircleCI Pipeline

![CircleCI Pipeline](./documentation/images/pipeline-1.png)

![CircleCI Pipeline](./documentation/images/Pipeline.png)

![CircleCI Pipeline](./documentation/images/pipeline-ENV.png)

![CircleCI Pipeline](./documentation/images/pipeline-structure.png)

### Digram

![Digram](./documentation/images/digram.png)




### Dependencies

```
- Node v16.13 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

- AWS CLI v2, v1 can work but was not tested for this project

- A RDS database running Postgres.

- A S3 bucket for hosting uploaded pictures.

```

### Installation

Provision the necessary AWS services needed for running the application:

1. In AWS, provision a publicly available RDS database running Postgres. <Place holder for link to classroom article>
1. In AWS, provision a s3 bucket for hosting the uploaded files. <Place holder for tlink to classroom article>
1. Export the ENV variables needed or use a package like [dotnev](https://www.npmjs.com/package/dotenv)/.
1. From the root of the repo, navigate udagram-api folder `cd starter/udagram-api` to install the node_modules `npm install`. After installation is done start the api in dev mode with `npm run dev`.
1. Without closing the terminal in step 1, navigate to the udagram-frontend `cd starter/udagram-frontend` to intall the node_modules `npm install`. After installation is done start the api in dev mode with `npm run start`.

## Testing

This project contains two different test suite: unit tests and End-To-End tests(e2e). Follow these steps to run the tests.

1. `cd starter/udagram-frontend`
1. `npm run test`
1. `npm run e2e`

There are no Unit test on the back-end

### Unit Tests:

Unit tests are using the Jasmine Framework.

### End to End Tests:

The e2e tests are using Protractor and Jasmine.

## Built With

- [Angular](https://angular.io/) - Single Page Application Framework
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework

## License

[License](LICENSE.txt)
