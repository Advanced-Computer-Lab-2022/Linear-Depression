### Course Ratings

#### Get Course Ratings

```http
POST /courses/:course_id/ratings
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `course_id` | `string` | **Required**. ID of the course.     |
| `rating`    | `number` | **Required**. Rating of the course. |
| `comment`   | `string` | Comment of the course.              |

<details>
<summary>
Response
</summary>

```json
{
    "_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "course_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "rating": 5,
    "comment": "This is a comment",
    "created_at": "2020-11-01T00:00:00.000Z",
    "updated_at": "2020-11-01T00:00:00.000Z"
}
```

</details>

#### Update Course Ratings

```http
PUT /courses/:course_id/ratings
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `course_id` | `string` | **Required**. ID of the course.     |
| `rating`    | `number` | **Required**. Rating of the course. |
| `comment`   | `string` | Comment of the course.              |

<details>
<summary>
Response
</summary>

```json
{
    "_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "course_id": "5f9f9b9b9b9b9b9b9b9b9b9b",
    "rating": 5,
    "comment": "This is a comment"
}
```

</details>

#### Delete Course Ratings

```http
DELETE /courses/:course_id/ratings
```

| Headers         | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `course_id` | `string` | **Required**. ID of the course. |

<details>
<summary>

Response

</summary>

```json
{
    "message": "Course ratings deleted successfully"
}
```

</details>
