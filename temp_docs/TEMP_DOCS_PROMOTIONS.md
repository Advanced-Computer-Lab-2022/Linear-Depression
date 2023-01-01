### Promotions

### Get all promotions

```http
GET /promotions
```

<details>
<summary>
Response
</summary>

```json
{
    "promotions": [
        {
            "_id": "63b168e70087317dde042f45",
            "name": "brand",
            "courses": [
                {
                    "_id": "63b11e5ca6c2dc8b7b1fa1bd",
                    "title": "Docker in 30 seconds",
                    "description": "Learn Docker in 30 seconds",
                    "instructor": "63847b66f067f8a676dd1df3",
                    "subject": "paid",
                    "price": 69420,
                    "averageRating": 0,
                    "ratings": [],
                    "totalHours": 1,
                    "enrollmentsCount": 0,
                    "discount": 0,
                    "activePromotion": "63b168e70087317dde042f45",
                    "lessons": [],
                    "status": "draft",
                    "createdAt": "2023-01-01T05:47:08.247Z",
                    "updatedAt": "2023-01-01T11:05:12.069Z",
                    "__v": 0
                }
            ],
            "startDate": "2023-01-18T22:00:00.000Z",
            "endDate": "2023-01-27T21:59:59.999Z",
            "discountPercent": 10,
            "source": "Admin",
            "__v": 0
        }
    ]
}
```

</details>

---

### Get a promotion

```http
GET /promotions/:promotionId
```

<details>
<summary>
Response
</summary>

```json
{
    "promotion": {
        "_id": "63b168e70087317dde042f45",
        "name": "brand",
        "courses": [
            {
                "_id": "63b11e5ca6c2dc8b7b1fa1bd",
                "title": "Docker in 30 seconds",
                "description": "Learn Docker in 30 seconds",
                "instructor": "63847b66f067f8a676dd1df3",
                "subject": "paid",
                "price": 69420,
                "averageRating": 0,
                "ratings": [],
                "totalHours": 1,
                "enrollmentsCount": 0,
                "discount": 0,
                "activePromotion": "63b168e70087317dde042f45",
                "lessons": [],
                "status": "draft",
                "createdAt": "2023-01-01T05:47:08.247Z",
                "updatedAt": "2023-01-01T11:05:12.069Z",
                "__v": 0
            }
        ],
        "startDate": "2023-01-18T22:00:00.000Z",
        "endDate": "2023-01-27T21:59:59.999Z",
        "discountPercent": 10,
        "source": "Admin",
        "__v": 0
    }
}
```

</details>

---

### Create a promotion

```http
POST /promotions
```

| Body              | Type     | Description                                     |
| :---------------- | :------- | :---------------------------------------------- |
| `name`            | `string` | **Required**. Name of the promotion             |
| `discountPercent` | `number` | **Required**. Discount percent of the promotion |
| `startDate`       | `date`   | **Required**. Start date of the promotion       |
| `endDate`         | `date`   | **Required**. End date of the promotion         |
| `courses`         | `array`  | **Required**. Courses of the promotion          |

<details>
<summary>
Response
</summary>

```json
{
    "promotion": {
        "_id": "63b168e70087317dde042f45",
        "name": "brand",
        "courses": [
            {
                "_id": "63b11e5ca6c2dc8b7b1fa1bd",
                "title": "Docker in 30 seconds",
                "description": "Learn Docker in 30 seconds",
                "instructor": "63847b66f067f8a676dd1df3",
                "subject": "paid",
                "price": 69420,
                "averageRating": 0,
                "ratings": [],
                "totalHours": 1,
                "enrollmentsCount": 0,
                "discount": 0,
                "activePromotion": "63b168e70087317dde042f45",
                "lessons": [],
                "status": "draft",
                "createdAt": "2023-01-01T05:47:08.247Z",
                "updatedAt": "2023-01-01T11:05:12.069Z",
                "__v": 0
            }
        ],
        "startDate": "2023-01-18T22:00:00.000Z",
        "endDate": "2023-01-27T21:59:59.999Z",
        "discountPercent": 10,
        "source": "Admin",
        "__v": 0
    }
}
```

</details>

---

### Update a promotion

```http
PUT /promotions/:promotionId
```

| Body              | Type     | Description                       |
| :---------------- | :------- | :-------------------------------- |
| `name`            | `string` | Name of the promotion             |
| `courses`         | `array`  | Courses of the promotion          |
| `startDate`       | `date`   | Start date of the promotion       |
| `endDate`         | `date`   | End date of the promotion         |
| `discountPercent` | `number` | Discount percent of the promotion |

<details>
<summary>
Response
</summary>

```json
{
    "promotion": {
        "_id": "63b168e70087317dde042f45",
        "name": "brand",
        "courses": [
            {
                "_id": "63b11e5ca6c2dc8b7b1fa1bd",
                "title": "Docker in 30 seconds",
                "description": "Learn Docker in 30 seconds",
                "instructor": "63847b66f067f8a676dd1df3",
                "subject": "paid",
                "price": 69420,
                "averageRating": 0,
                "ratings": [],
                "totalHours": 1,
                "enrollmentsCount": 0,
                "discount": 0,
                "activePromotion": "63b168e70087317dde042f45",
                "lessons": [],
                "status": "draft",
                "createdAt": "2023-01-01T05:47:08.247Z",
                "updatedAt": "2023-01-01T11:05:12.069Z",
                "__v": 0
            }
        ],
        "startDate": "2023-01-18T22:00:00.000Z",
        "endDate": "2023-01-27T21:59:59.999Z",
        "discountPercent": 10,
        "source": "Admin",
        "__v": 0
    }
}
```

</details>

---

### Delete a promotion

```http
DELETE /promotions/:promotionId
```

<details>
<summary>
Response
</summary>

```json
{
    "message": "Promotion deleted successfully"
}
```

</details>
