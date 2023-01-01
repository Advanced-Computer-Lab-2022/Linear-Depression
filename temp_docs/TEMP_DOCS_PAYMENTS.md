### Payment

#### Create a checkout session

```http
  POST /payment/checkout-session
```

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token of the instructor. |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| courseId  | `string` | **Required**. Course id. |

<details>
<summary>
Response
</summary>

```json
{
    "url": "https://checkout.stripe.com/c/pay/cs_test_a1gDqrqiCS6myj4aA7ul7JJ2ZzWfu2KqkMRgJOZJ1jLLkdgt3FC58Xl5g5#fidkdWxOYHwnPyd1blpxYHZxWjA0SExPYmpObFVLPWF1PXxqR1NPfW9Ac3VKbHdPQnZxTTduRkFqS2ldNFJ3NVJmaG99SV9wREs3NTZQQ11AVUh%2FMW49X1xyYTRIVTZwUmIzZGsxd0dCf2JWNTVvcmcxdzQyNicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
    "id": "cs_test_a1gDqrqiCS6myj4aA7ul7JJ2ZzWfu2KqkMRgJOZJ1jLLkdgt3FC58Xl5g5"
}
```

</details>

#### Stripe Webhook

```http
  POST /payment/stripe-webhook
```

| Header             | Type     | Description                     |
| :----------------- | :------- | :------------------------------ |
| `stripe-signature` | `string` | **Required**. Stripe signature. |

<details>
<summary>
Response
</summary>

```json
{
    "received": true,
    "payment": "success",
    "enrollment": true
}
```
