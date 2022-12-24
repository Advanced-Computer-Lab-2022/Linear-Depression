# Linear-Depression

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
