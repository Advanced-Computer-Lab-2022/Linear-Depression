### Authentication

#### Login

```http
  POST /auth/login
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. user's email    |
| `password` | `string` | **Required**. user's password |

<details>
<summary>
Response
</summary>

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWZmNzlmYTAxNGVlOTU2N2YwNzEwZSIsInVzZXJUeXBlIjozLCJpYXQiOjE2NzI0NzY2NzMsImV4cCI6MTY3Mzc3MjY3M30.SXWK_GY0fzWSVKQYmPe1fTQQbDddJ4AsuoHbUmkjp-Y",
    "userType": 3
}
```

</details>

#### Refresh

```http
  GET /auth/refresh
```

NOTE: this endpoint requires to have jwt cookie set

<details>
<summary>
Response
</summary>

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWZmNzlmYTAxNGVlOTU2N2YwNzEwZSIsInVzZXJUeXBlIjozLCJpYXQiOjE2NzI0Nzc3ODksImV4cCI6MTY3Mzc3Mzc4OX0.XLS1DC6I2IHs93ahkPSDH2UNTXQK9x14AB4szyvBtrs",
    "userType": 3
}
```

</details>

#### Logout

```http
  POST /auth/logout
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Logout successful"
}
```

</details>

#### Forgot Password

```http
  POST /auth/forgot
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. user's email |

<details>
<summary>
Response
</summary>

```json
{
    "success": true
}
```

</details>

#### Reset Password

<!-- TODO: not correct -->

```http
  GET /auth/reset
```

<details>
<summary>
Response
</summary>

```json
{
    "success": true
}
```

```http
  POST /auth/reset
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. user's email |

<details>
<summary>
Response
</summary>

```json
{
    "success": true
}
```

</details>

#### Change Password

```http
  POST /auth/change
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `oldPassword`   | `string` | **Required**. user's old password             |
| `newPassword`   | `string` | **Required**. user's new password             |

<details>
<summary>
Response
</summary>

```json
{
    "success": true
}
```

</details>
