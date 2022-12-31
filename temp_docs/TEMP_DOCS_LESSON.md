### Lesson

### Get a specific Lesson

```http
  GET /courses/:courseId/lessons/:lessonId
```

| Parameter       | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

NOTE: you need to be a trainee as well as enrolled in the course to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "lesson": {
        "_id" : ObjectId("63b08018229f88974896da6f"),
        "title" : "Rust for beginners",
        "exercises" : [ ],
        "totalHours" : 23,
        "video" : {
                "title" : "Rust for beginners",
                "videoLink" : "https://www.youtube.com/watch?v=gvgBUY8iNO4",
                "description": "Rust is a multi-paradigm, general-purpose programming language. Rust emphasizes performance, type safety, and concurrency."
        },
        "__v" : 0
    }
}
```

</details>

### Create a new Lesson

```http
  POST /courses/:courseId/lessons
```

| Parameter       | Type            | Description                                                     |
| :-------------- | :-------------- | :-------------------------------------------------------------- |
| `Authorization` | `string`        | **Required**. Bearer token of the user.                         |
| `title`         | `number`        | **Required**. Title of the lesson.                              |
| `totalHours`    | `string`        | **Required**. Duration of the lesson.                           |
| `video`         | `json`          | **Optional**. Video of the lesson.                              |
| `exercises`     | `Array<string>` | **Optional**. Exercise IDs referencing exercises in the lesson. |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "lesson": {
        "title": "Rust for beginners",
        "exercises": ["63b0081fa014ee9567f07152"],
        "totalHours": 23,
        "video": {
            "title": "Rust for beginners",
            "videoLink": "https://www.youtube.com/watch?v=gvgBUY8iNO4",
            "description": "Rust is a multi-paradigm, general-purpose programming language. Rust emphasizes performance, type safety, and concurrency."
        },
        "_id": "63b080e6784b76b62a2afc80",
        "__v": 0
    }
}
```

</details>

### Update a Lesson

```http
  PUT /courses/:courseId/lessons/:lessonId
```

| Parameter       | Type            | Description                                                     |
| :-------------- | :-------------- | :-------------------------------------------------------------- |
| `Authorization` | `string`        | **Required**. Bearer token of the user.                         |
| `title`         | `number`        | **Optional**. Title of the lesson.                              |
| `totalHours`    | `string`        | **Optional**. Duration of the lesson.                           |
| `video`         | `json`          | **Optional**. Video of the lesson.                              |
| `exercises`     | `Array<string>` | **Optional**. Exercise IDs referencing exercises in the lesson. |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "lesson": {
        "title": "Rust for amateurs",
        "exercises": [],
        "totalHours": 23,
        "video": {
            "title": "Rust for beginners",
            "videoLink": "https://www.youtube.com/watch?v=gvgBUY8iNO4",
            "description": "Rust is a multi-paradigm, general-purpose programming language. Rust emphasizes performance, type safety, and concurrency."
        },
        "_id": "63b080e6784b76b62a2afc80",
        "__v": 0
    }
}
```

</details>

### Delete a Lesson

```http
  DELETE /courses/:courseId/lessons/:lessonId
```

| Parameter       | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "message": "Lesson deleted Successfully"
}
```

</details>
