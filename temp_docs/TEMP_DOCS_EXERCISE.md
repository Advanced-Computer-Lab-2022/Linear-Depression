### Exercise

### Get all exercises in a specific lesson

```http
  GET /courses/:courseId/lessons/:lessonId/exercises
```

| Parameter       | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Response
</summary>

```json
{
    "exercises": [
        {
            "_id": "63b091de2e8cd50e5db3711f",
            "title": "What is Jenkins",
            "questions": [
                {
                    "question": "What is Jenkins",
                    "choices": [
                        "Version Control System",
                        "Note taking app",
                        "Automation server",
                        "Programmin Language"
                    ],
                    "answerIndex": 2,
                    "_id": "63b091de2e8cd50e5db37121"
                },
                {
                    "question": "Which one is a type of CI/CD Jenkins Pipeline?",
                    "choices": [
                        "Programming Pipeline",
                        "Declarative Pipeline",
                        "Abstract Pipeline",
                        "Concrete Pipeline"
                    ],
                    "answerIndex": 1,
                    "_id": "63b091de2e8cd50e5db37122"
                }
            ],
            "__v": 0
        },
        {
            "_id": "63b092362e8cd50e5db37135",
            "title": "Execution Pipeline Stages",
            "questions": [
                {
                    "question": "Which one is not a execution pipeline stage ?",
                    "choices": ["Fetch stage", "Decode stage", "Execute stage", "Memory stage"],
                    "answerIndex": 3,
                    "_id": "63b092362e8cd50e5db37137"
                }
            ],
            "__v": 0
        }
    ]
}
```

</details>

### Get a specific exercise in a specific lesson

```http
  GET /courses/:courseId/lessons/:lessonId/exercises/:exerciseId
```

| Parameter       | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the user. |

<details>
<summary>
Response
</summary>

```json
{
    "exercise": {
        "_id": "63b091de2e8cd50e5db3711f",
        "title": "What is Jenkins",
        "questions": [
            {
                "question": "What is Jenkins",
                "choices": ["Version Control System", "Note taking app", "Automation server", "Programmin Language"],
                "answerIndex": 2,
                "_id": "63b091de2e8cd50e5db37121"
            },
            {
                "question": "Which one is a type of CI/CD Jenkins Pipeline?",
                "choices": ["Programming Pipeline", "Declarative Pipeline", "Abstract Pipeline", "Concrete Pipeline"],
                "answerIndex": 1,
                "_id": "63b091de2e8cd50e5db37122"
            }
        ],
        "__v": 0
    }
}
```

</details>

### Create a new Exercise in a specific lesson

```http
  POST /courses/:courseId/lessons/:lessonId/exercises
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `title`         | `string` | **Required**. Title of the exercise.          |
| `questions`     | `json`   | **Optional**. Questions of the exercise.      |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "exercise": {
        "title": "Jenkins Language",
        "questions": [
            {
                "question": "What is the language of jenkins ?",
                "choices": ["Python", "Java", "Groovy", "C++"],
                "answerIndex": 2,
                "_id": "63b096502c0a3671b4f79110"
            }
        ],
        "_id": "63b096502c0a3671b4f7910e",
        "__v": 0
    }
}
```

</details>

### Update a exercise in a specific lesson

```http
  PUT /courses/:courseId/lessons/:lessonId/exercises/:exerciseId
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |
| `title`         | `string` | **Required**. Title of the exercise.          |
| `questions`     | `json`   | **Optional**. Questions of the exercise.      |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "exercise": {
        "title": "Jenkins Language",
        "questions": [
            {
                "question": "What is the language of jenkins ?",
                "choices": ["Python", "Java", "Groovy", "Golang"],
                "answerIndex": 2,
                "_id": "63b0979e2c0a3671b4f7911e"
            }
        ],
        "_id": "63b091de2e8cd50e5db3711f",
        "__v": 1
    }
}
```

</details>

### Delete a specific exercise

```http
  DELETE /courses/:courseId/lessons/:lessonId/exercises/:exerciseId
```

| Parameter       | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

NOTE: you need to be an instructor as well as the course owner to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "message": "Exercise deleted Successfully"
}
```

</details>

### Get a specifc submission of a exercise in a specific lesson

```http
  GET /courses/:courseId/lessons/:lessonId/exercises/:exerciseId/submission
```

| Parameter       | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the trainee. |

NOTE: you need to be a trainee as well as enrolled in the course to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "evaluation": {
        "totalGrade": 100,
        "results": [
            {
                "isCorrect": true,
                "correctAnswer": 1,
                "userAnswer": 1
            }
        ]
    }
}
```

</details>

### Submit a exercise in a specific lesson

```http
  POST /courses/:courseId/lessons/:lessonId/exercises/:exerciseId/submission
```

| Parameter       | Type     | Description                                |
| :-------------- | :------- | :----------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the trainee. |

NOTE: you need to be a trainee as well as enrolled in the course to access this endpoint

<details>
<summary>
Response
</summary>

```json
{
    "evaluation": {
        "totalGrade": 100,
        "results": [
            {
                "isCorrect": true,
                "correctAnswer": 1,
                "userAnswer": 1
            }
        ]
    }
}
```

</details>
