### Reports

### Get all user's reports

```http
GET /me/reports
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>

<summary>
Response
</summary>

```json
{
    "reports": [
        {
            "_id": "63aeb2dd728c859d4601ac08",
            "userId": "63847b66f067f8a676dd1df3",
            "courseId": "63abefa6485cfbc7e2c4ac6c",
            "threadId": {
                "_id": "63aeb2dd728c859d4601ac07",
                "updatedAt": "2022-12-30T09:44:28.084Z"
            },
            "type": "Financial",
            "subject": "Refund didn't come through",
            "description": "I have requested a refund but still didn't come through.",
            "seen": false,
            "status": "Pending",
            "createdAt": "2022-12-30T09:43:57.993Z",
            "updatedAt": "2022-12-30T09:43:57.993Z",
            "__v": 0
        }
    ]
}
```

</details>

---

### Get a specific report

```http
GET /me/reports/:reportId
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>

<summary>
Response
</summary>

```json
{
    "report": {
        "_id": "63aeb2dd728c859d4601ac08",
        "userId": {
            "_id": "63847b66f067f8a676dd1df3",
            "firstName": "Mohammad",
            "lastName": "Omar",
            "__t": "Instructor"
        },
        "courseId": "63abefa6485cfbc7e2c4ac6c",
        "threadId": {
            "_id": "63aeb2dd728c859d4601ac07",
            "reportId": "63aeb2dd728c859d4601ac08",
            "replies": [
                {
                    "userId": {
                        "_id": "63ada239aef4bb883ee72eb2",
                        "firstName": "Admin",
                        "lastName": "ElAdmoon",
                        "__t": "Admin"
                    },
                    "message": "The refund will be processed within 3-5 business days.",
                    "createdAt": "2022-12-30T09:44:28.083Z",
                    "_id": "63aeb2fc728c859d4601ac5d"
                }
            ],
            "createdAt": "2022-12-30T09:43:58.169Z",
            "updatedAt": "2022-12-30T09:44:28.084Z",
            "__v": 0
        },
        "type": "Financial",
        "subject": "Refund didn't come through",
        "description": "I have requested a refund but still didn't come through.",
        "seen": true,
        "status": "Resolved",
        "createdAt": "2022-12-30T09:43:57.993Z",
        "updatedAt": "2022-12-30T09:43:57.993Z",
        "__v": 0
    }
}
```

</details>

---

### Create a new report

```http
POST /me/reports
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

| Body          | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `courseId`    | `string` | Id of the course.                       |
| `type`        | `string` | **Required** Type of the report.        |
| `subject`     | `string` | **Required** Subject of the report.     |
| `description` | `string` | **Required** Description of the report. |

<details>
<summary>
Response
</summary>

```json
{
    "report": {
        "userId": "63aac5c4ee11bad5c3c2e6bc",
        "threadId": "63b1bf1f11c8cc4b8c62cccc",
        "type": "Technical",
        "subject": "Video not playing",
        "description": "The video is not playing",
        "seen": true,
        "status": "Pending",
        "_id": "63b1bf1f11c8cc4b8c62cccd",
        "createdAt": "2023-01-01T17:13:03.600Z",
        "updatedAt": "2023-01-01T17:13:03.600Z",
        "__v": 0
    }
}
```

</details>

---

### Post a reply to a report

```http
POST /me/reports/:reportId

```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

| Body      | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `message` | `string` | **Required** Message of the reply. |

<details>
<summary>
Response
</summary>

```json
{
    "thread": {
        "_id": "63b1bf1f11c8cc4b8c62cccc",
        "reportId": "63b1bf1f11c8cc4b8c62cccd",
        "replies": [
            {
                "userId": "63847b66f067f8a676dd1df3",
                "message": "now pay $8",
                "createdAt": "2023-01-01T17:19:56.261Z",
                "_id": "63b1c0bc11c8cc4b8c62ccd3"
            }
        ],
        "createdAt": "2023-01-01T17:13:03.750Z",
        "updatedAt": "2023-01-01T17:19:56.262Z",
        "__v": 0
    }
}
```

</details>

---

### Get report thread

```http
GET /me/report-thread/:threadId
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Response
</summary>

```json
{
    "thread": {
        "_id": "63b1bf1f11c8cc4b8c62cccc",
        "reportId": "63b1bf1f11c8cc4b8c62cccd",
        "replies": [
            {
                "userId": "63847b66f067f8a676dd1df3",
                "message": "now pay $8",
                "createdAt": "2023-01-01T17:19:56.261Z",
                "_id": "63b1c0bc11c8cc4b8c62ccd3"
            }
        ],
        "createdAt": "2023-01-01T17:13:03.750Z",
        "updatedAt": "2023-01-01T17:19:56.262Z",
        "__v": 0
    }
}
```

</details>
