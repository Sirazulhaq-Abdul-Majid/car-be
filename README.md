## Base Endpoint:
https://mushy-hare-flannel-nightgown.cyclic.cloud/

### Endpoints:

<code>POST /users/signup</code>

<strong>Request:</strong>

```json
{
	"full_name":"",
	"email":"",
	"password":"",
	"login_id":"",
	"state":"",
	"city":""
}
```



<Strong>Response:</Strong>

```json
{
	"full_name":"",
	"email":"",
	"login_id":""
}
```
<hr>

<code>POST /auth/login</code>

<strong>Request:</strong>
```json
{
	"password":"",
	"username":""
}
```
<Strong>Response:</Strong>
```json
{
	"accessToken": "",
	"refreshToken": "",
	"statusCode": \<Number\>
}
```
<hr>

<code>POST /auth/refresh</code>

<strong>Request:</strong>
AccessToken
```json
{
"refreshToken":""
}
```
<Strong>Response:</Strong>
```json
{
	"accessToken": "",
	"refreshToken": "",
	"statusCode": \<Number\>
}
```
<hr>

<code>POST /cars/save</code>

<strong>Request:</strong>
Content-Type: multipart/form-data
AccessToken
```json
{
	"model":"",
	"description":"",
	"condition":"",
	"brands":"",
	"transmission":"",
	"year": \<Number\>,
	"engine_cc": \<Number\>,
	"horse_power": \<Number\>,
	"torque":\<Number\>,
	"image": \<Image binary\>
}
```
<Strong>Response:</Strong>
```json
{
	"statusCode": \<Number\>
}
```
<hr>

<code>POST /cars/search</code>

<strong>Request:</strong>
```json
{
  brands: "",
  model:  "",
  transmission: Transmission,
  year_start:  \<Number\>,
  year_end:  \<Number\>,
  engine_cc_start:  \<Number\>,
  engine_cc_end:  \<Number\>,
  horse_power_start:  \<Number\>,
  horse_power_end:  \<Number\>,
  torque_start:  \<Number\>,
  torque_end:  \<Number\>,
  condition: Condition
}
```
<Strong>Response:</Strong>
```json

[
	[
		{
			"createdDate": "",
			"updatedDate": "",
			"deleteDate": null,
			"id":  \<Number\>,
			"description": "",
			"visit":  \<Number\>,
			"condition": "",
			"brands": "",
			"model": "",
			"transmission": "",
			"year":  \<Number\>,
			"engine_cc":  \<Number\>,
			"rating":  \<Number\>,
			"horse_power":  \<Number\>,
			"torque":  \<Number\>,
			"images": [
				{
					"image": {
						"type": "Buffer",
						"data": [
							<image>,
							<image>
							]
						}
				}
			]
		}
	]
]

```
<hr>

<code>GET /cars/<strong><id></strong></code>

<strong>Request:</strong>
```json

```
<Strong>Response:</Strong>
```json

{
	"car": {
		"createdDate": "",
		"updatedDate": "",
		"deleteDate": null,
		"id":  \<Number\>,
		"description": "",
		"visit":  \<Number\>,
		"condition": "",
		"brands": "",
		"model": "",
		"transmission": "",
		"year":  \<Number\>,
		"engine_cc":  \<Number\>,
		"rating":  \<Number\>,
		"horse_power":  \<Number\>,
		"torque":  \<Number\>,
	},
	"images": [
		"",
		""
	]
}

```
<hr>

<code>GET /cars/ </code>

<strong>Request:</strong>
```json

```
<Strong>Response:</Strong>
```json

[
	{
		"car": {
			"createdDate": "",
			"updatedDate": "",
			"deleteDate": null,
			"id":  \<Number\>,
			"description": "",
			"visit":  \<Number\>,
			"condition": "",
			"brands": "",
			"model": "",
			"transmission": "",
			"year":  \<Number\>,
			"engine_cc":  \<Number\>,
			"rating":  \<Number\>,
			"horse_power":  \<Number\>,
			"torque":  \<Number\>,
		},
		"images": [
			"base64string"
		]
	},
]
```
<hr>

<code>GET /cars/rating/<strong>:id</strong></code>

<strong>Request:</strong>
AccessToken
```json
```
<Strong>Response:</Strong>
```json
{
	"statusCode": \<Number\>,
	""
}
```
<hr>
