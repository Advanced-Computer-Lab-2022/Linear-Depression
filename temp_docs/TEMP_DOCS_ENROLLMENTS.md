### Enrollments

### Get enrollment

```http
GET /enrollments/:enrollmentId
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

---

### Update enrollment

```http
PUT /enrollments/:enrollmentId
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

| Body       | Type     | Description             |
| :--------- | :------- | :---------------------- |
| `progress` | `number` | Progress of the course. |
| `lessons`  | `array`  | Array of lessons.       |

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
