### Courses Resource

#### Get all Courses

```http
  GET /courses
```

<details>
<summary>
Response
</summary>

```json
[
    {
        "enrollmentsCount": 0,
        "activePromotion": null,
        "_id": "636026eb1828121ec06086ee",
        "title": "Intro to backend",
        "description": "javascript is baaaad",
        "instructor": {
            "_id": "636020ca8701caab59e5dc30",
            "firstName": "Elshimaa",
            "lastName": "Ahmed",
            "__t": "Instructor",
            "id": "636020ca8701caab59e5dc30"
        },
        "subject": "backend",
        "price": 13.31,
        "averageRating": 5,
        "ratings": [
            {
                "_id": "63ac8bc07d024a636f415c5d",
                "comment": "new review",
                "rating": 5,
                "traineeId": "63a4ce661751cf3eff56d6f7",
                "createdAt": "2022-12-28T18:32:32.458Z",
                "updatedAt": "2022-12-28T18:38:17.211Z",
                "__v": 0,
                "id": "63ac8bc07d024a636f415c5d"
            }
        ],
        "totalHours": 0,
        "discount": 0,
        "lessons": [],
        "isFree": false,
        "__v": 0,
        "thumbnail": "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg",
        "id": "636026eb1828121ec06086ee",
        "currency": "USD"
    },
    {
        "enrollmentsCount": 0,
        "_id": "63602a05823c823dda88323b",
        "title": "python in 4 days",
        "description": "python in 3 days",
        "instructor": {
            "_id": "6362ed27802b350e006822cd",
            "firstName": "Ibrahim",
            "lastName": "Abouelenien",
            "__t": "Instructor",
            "id": "6362ed27802b350e006822cd"
        },
        "subject": "backend",
        "price": 53.24,
        "averageRating": 4,
        "ratings": [],
        "totalHours": 0,
        "discount": 0,
        "lessons": [],
        "isFree": false,
        "__v": 1,
        "activePromotion": null,
        "preview": "https://youtu.be/93KmHm4ggPo",
        "thumbnail": "https://img.youtube.com/vi/93KmHm4ggPo/0.jpg",
        "id": "63602a05823c823dda88323b",
        "currency": "USD"
    },
    {
        "enrollmentsCount": 0,
        "_id": "63602a25823c823dda883245",
        "title": "java in 3 days",
        "description": "java in 3 days",
        "instructor": {
            "_id": "636020ca8701caab59e5dc30",
            "firstName": "Elshimaa",
            "lastName": "Ahmed",
            "__t": "Instructor",
            "id": "636020ca8701caab59e5dc30"
        },
        "subject": "backend",
        "price": 266.17,
        "averageRating": 0,
        "ratings": [],
        "totalHours": 0,
        "discount": 0,
        "lessons": [],
        "isFree": false,
        "__v": 0,
        "activePromotion": null,
        "thumbnail": "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg",
        "id": "63602a25823c823dda883245",
        "currency": "USD"
    }
]
```

</details>

#### Create Course

```http
  POST /courses
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter     | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `title`       | `string` | **Required**. Title of the course       |
| `subject`     | `string` | **Required**. Subject of the course     |
| `description` | `string` | **Required**. Description of the course |
| `price`       | `number` | **Required**. Price of the course       |

<details>
<summary>
Response
</summary>

```json
{
    "course": {
        "title": "How to use curl",
        "description": "Learn how to use curl to make HTTP requests from the command line or scripts",
        "instructor": "6384904acf1b15bc21323b81",
        "subject": "Programming",
        "price": 10,
        "averageRating": 0,
        "ratings": [],
        "totalHours": 0,
        "enrollmentsCount": 0,
        "discount": 0,
        "activePromotion": null,
        "lessons": [],
        "_id": "63ade6b9840f840cca37802f",
        "createdAt": "2022-12-29T19:12:57.494Z",
        "updatedAt": "2022-12-29T19:12:57.494Z",
        "__v": 0
    }
}
```

</details>

### Update Course

```http
  PUT /courses/:id
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter     | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `title`       | `string` | **Required**. Title of the course       |
| `subject`     | `string` | **Required**. Subject of the course     |
| `description` | `string` | **Required**. Description of the course |
| `price`       | `number` | **Required**. Price of the course       |

<details>
<summary>
Response
</summary>

```json
{
    "course": {
        "title": "How to use curl",
        "description": "Learn how to use curl to make HTTP requests from the command line or scripts",
        "instructor": "6384904acf1b15bc21323b81",
        "subject": "Programming",
        "price": 10,
        "averageRating": 0,
        "ratings": [],
        "totalHours": 0,
        "enrollmentsCount": 0,
        "discount": 0,
        "activePromotion": null,
        "lessons": [],
        "_id": "63ade6b9840f840cca37802f",
        "createdAt": "2022-12-29T19:12:57.494Z",
        "updatedAt": "2022-12-29T19:12:57.494Z",
        "__v": 0
    }
}
```

</details>

### Delete Course

```http
  DELETE /courses/:id
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Course deleted successfully"
}
```

</details>

### List Course Subjects

```http
  GET /courses/subjects
```

<details>
<summary>
Response
</summary>

```json
{
    "subjects": [
        "docker",
        "backend",
        "frontend",
        "mobile",
        "devops",
        "programming",
        "data science",
        "typescript",
        "python",
        "ocaml",
        "haskell",
        "testing",
        "software engineering"
    ]
}
```

### Close Course

```http
  PUT /courses/:id/close
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Course closed successfully"
}
```

</details>

### Open Course

```http
  PUT /courses/:id/open
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Course opened successfully"
}
```

</details>

### Publish Course

```http
  PUT /courses/:id/publish
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

<details>
<summary>
Response
</summary>

```json
{
    "message": "Course published successfully"
}
```
