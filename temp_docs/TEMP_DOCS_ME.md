### Me

### My courses

```http
  GET /me/courses
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
    "courses": [
        {
            "_id": "63aef6afd3303e06746e3e17",
            "title": "Docker Tutorial for Beginners",
            "description": "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. The service has both free and premium tiers. The software that hosts the containers is called Docker Engine.",
            "instructor": {
                "_id": "6384904acf1b15bc21323b81",
                "firstName": "Ibrahim",
                "lastName": "Abou Elenein",
                "__t": "Instructor",
                "id": "6384904acf1b15bc21323b81"
            },
            "subject": "docker",
            "price": 100,
            "averageRating": 0,
            "ratings": [],
            "totalHours": 0,
            "enrollmentsCount": 1,
            "discount": 0,
            "activePromotion": {
                "_id": "63aff8901abdb0eceface57f",
                "name": "t",
                "startDate": "2022-12-24T00:00:00.000Z",
                "endDate": "2023-01-07T00:00:00.000Z",
                "discountPercent": 12,
                "status": "Active",
                "id": "63aff8901abdb0eceface57f"
            },
            "lessons": [],
            "status": "closed",
            "createdAt": "2022-12-30T14:33:20.331Z",
            "updatedAt": "2022-12-31T08:53:37.426Z",
            "__v": 0,
            "thumbnail": "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg",
            "id": "63aef6afd3303e06746e3e17",
            "currency": "USD"
        }
    ]
}
```

</details>

### List my enrollments

```http
  GET /me/enrollments
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
    "enrollment": [
        {
            "_id": "63aed9d94073c1fce7942775",
            "courseId": "63a6241205424927cbfab326",
            "traineeId": "63aece85d4bc1b83e09cb687",
            "progress": 0,
            "lessons": [
                {
                    "lessonId": "63a6255249c44631dc3a1044",
                    "isVideoWatched": false,
                    "exercisesStatus": [
                        {
                            "exerciseId": "63a6258c465fff5c68c15d16",
                            "isCompleted": false,
                            "_id": "63aed9da4073c1fce794277c"
                        }
                    ],
                    "_id": "63aed9da4073c1fce794277b"
                }
            ],
            "__v": 0
        }
    ]
}
```

</details>

### Create a new enrollment

```http
  POST /me/enrollments
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `courseId`      | `string` | **Required**. course id.                      |

<details>
<summary>
Response
</summary>

```json
{
    "enrollment": {
        "courseId": "63aff9641abdb0eceface5c9",
        "traineeId": "63aece85d4bc1b83e09cb687",
        "progress": 0,
        "_id": "63b003bda014ee9567f07138",
        "lessons": [],
        "__v": 0
    }
}
```

</details>

### Get your refund requests

```http
  GET /me/enrollments/:enrollmentId/refunds
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be individual trainee to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "refundRequest": {
        "traineeId": "63aece85d4bc1b83e09cb687",
        "enrollmentId": "63b003bda014ee9567f07138",
        "refundAmount": 100,
        "status": "PENDING",
        "_id": "63b0081fa014ee9567f07152",
        "__v": 0
    }
}
```

</details>

### Create a new refund request

```http
  POST /me/enrollments/:enrollmentId/refunds
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be individual trainee to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "refundRequest": {
        "traineeId": "63aece85d4bc1b83e09cb687",
        "enrollmentId": "63b003bda014ee9567f07138",
        "refundAmount": 100,
        "status": "PENDING",
        "_id": "63b0081fa014ee9567f07152",
        "__v": 0
    }
}
```

</details>

### Delete a refund request

```http
  DELETE /me/enrollments/:enrollmentId/refunds/
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be individual trainee to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "refundRequest": {
        "_id": "63b0081fa014ee9567f07152",
        "traineeId": "63aece85d4bc1b83e09cb687",
        "enrollmentId": "63b003bda014ee9567f07138",
        "refundAmount": 100,
        "status": "PENDING",
        "__v": 0
    }
}
```

</details>
