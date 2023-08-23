## Base Endpoint:
https://mushy-hare-flannel-nightgown.cyclic.cloud/

### Endpoints:

<code>POST /user/signup</code>

<strong>Request:</strong>

```{
	"full_name":"",
	"email":"",
	"password":"",
	"login_id":""
}```

<Strong>Response:</Strong>

```{
	"full_name":"",
	"email":"",
	"login_id":""
}```

<hr>

<code>POST /auth/login</code>

<strong>Request:</strong>

```{
	"password":"",
	"username":""
}```

<Strong>Response:</Strong>

```{
	"accessToken": "",
	"refreshToken": "",
	"statusCode": \<Number\>
}```

<hr>

<code>POST /auth/refresh</code>

<strong>Request:</strong>

```{
"refreshToken":""
}```

<Strong>Response:</Strong>

```{
	"accessToken": "",
	"refreshToken": "",
	"statusCode": \<Number\>
}```

<hr>
