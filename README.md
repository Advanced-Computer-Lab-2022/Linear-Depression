# Linear-Depression

## Project Description

An implementation of full stack web application using the MERN stack. The application is a platform for users to manage an online learning platform. The application is built using the `MERN` stack.

## Motivation

This project was created for The GUC `CSEN704 Advanced Computer lab (316)` The lab is a project-based course that aims to teach students

-   Scrum and Agile methodologies
-   Software development best practices
-   Software development tools and techniques
-   Software development process
-   Software Testing
-   latest backend and frontend technologies

## Build Status

-   The project is currently in development.
-   The Unit tests needs modifications.
-   A CI/CD pipeline needs to be migrated to Jenkins.
-   A caching layer needs to be added to the application.
-   A message broker needs to be added to the application to handle asynchronous tasks such as sending emails and notifications.

## Code Style

The code style is enforced using `eslint` and `prettier`. The code style is enforced using `pre-commit` hooks. The code style is enforced using `eslint` and `prettier`. The code style is enforced using `pre-commit` hooks.

## Screenshots

To be added

## Tech/Framework used

-   [React](https://reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Jest](https://jestjs.io/)
-   [Swagger](https://swagger.io/)
-   [Material-UI](https://material-ui.com/)
-   [Stripe](https://stripe.com/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Git](https://git-scm.com/)
-   [Github Actions](github.com/features/actions)
-   [NodeMailer](https://nodemailer.com/about/)
-   [Handlebars](https://handlebarsjs.com/)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-   [Postman](https://www.postman.com/)
-   [VSCode](https://code.visualstudio.com/)
-   [Pre-commit](https://pre-commit.com/)
-   [Mailtrap](https://mailtrap.io/)

## Features

-   User Authentication
-   User Roles
-   User Profile
-   User Courses
-   User Payments
-   User Notifications
-   User Email Notifications
-   User Password Reset
-   REST API
-   REST API Documentation
-   Admin Dashboard
-   Admin Dashboard Authentication
-   Admin Dashboard Users
-   Refund Policy
-   Corporate Policy
-   Terms and Conditions
-   Fuzzy Search
-   Caching
-   Rate Limiting
-   Rating System
-   Reporting System
-

## Code Examples

```typescript
import { sendEmail } from "./sendMailService";

export const sendCertificateEmail = async (email: string, courseName: string, certificatePath: string) => {
    const context = {
        courseName: courseName,
        email: email
    };
    const attachments = [
        {
            filename: "certificate.pdf",
            path: certificatePath,
            contentType: "application/pdf"
        }
    ];
    sendEmail(email, context, "certificateUponCompletion", "Linear Depression | Congrats 🎉", attachments);
};
```

## Stripe in development mode

how to run stripe in development mode

1. update your .env file in both the client and server bu following the .env.example files
2. install the stripe cli

```bash
sudo apt install stripe # for linux
brew install stripe/stripe-cli/stripe # for mac
```

you can refer to this [documentation](https://stripe.com/docs/stripe-cli) for more information

3. login to to stripe cli using stripe api key

```bash
stripe login --api-key sk_test_example
# contact the team for the api key or use your own
```

4. run the stripe cli

```bash
stripe listen --forward-to localhost:PORT/payment/stripe-webhook
# PORT is the port you are running the server on
```

## Pre-commit

The pre-commit hook is managed by pre-commit. It is a versatile way of managing the pre-commit tool but it also permits you to run the script on arbitrary files without committing. The module will take charge of installing your required dependencies (such as code-style tools: prettier, eslint, etc.) and will run them on the files you want to commit.

Install pre-commit package by running

```bash
pip install pre-commit
```

Once installed, run the following for a one-time setup

```bash
pre-commit install
```

Afterwards, the hook should run the next commit you will attempt!

## Testing

The testing is done using jest. To run the tests, run the following command

```bash
npm run test
```

You can use vscode to run the tests as well.

---

## Admin Dashboard

Access the admin dashboard by going to the following URL

```
http://localhost:PORT/admin
```

![Admin Dashboard](docs/AdminDashboard.png)

## API Documentation

The API documentation is done using swagger. To access the documentation, go to the following URL

```
http://localhost:PORT/api-docs
```

![API Documentation](docs/APIDocs.png)

### Generate API Documentation

```bash
> npm run generate-docs
```
