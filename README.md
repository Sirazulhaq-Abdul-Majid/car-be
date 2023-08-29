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
	"login_id":""
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
	"torque": \<Number\>,
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
