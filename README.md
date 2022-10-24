# Linear-Depression

## Pre-commit

The pre-commit hook is managed by pre-commit. It is a versatile way of managing the pre-commit tool but it also permits you to run the script on arbitrary files without committing. The module will take charge for installing your required dependencies (such as code-style tools: prettier, eslint, etc.) and will run them on the files you want to commit.

Install pre-commit package by running

```bash
pip install pre-commit
```

Once installed, run the following for a one-time setup

```bash
pre-commit install
```

Afterwards the hook should run the next commit you will attempt!

## Testing

The testing is done using jest. To run the tests, run the following command

```bash
npm run test
```

You can use vscode to run the tests as well.

---

## Admin Dashboard

Access the admin dashboard by going to the following url

```
http://localhost:PORT/admin
```

![Admin Dashboard](docs/AdminDashboard.png)
