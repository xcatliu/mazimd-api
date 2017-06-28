# mazimd-api

The api server for mazimd

https://api.mazimd.com

## Getting Started

1. Install [Node.js](https://nodejs.org/)
2. Install and run [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
3. `npm install`
4. `npm start`
5. Visit http://localhost:8110

## API

### Get a page

```
GET /pages/:id
```

#### Response

```
Status: 200 OK
```

```json
{
  "url": "https://api.mazimd.com/pages/38rduve91",
  "html_url": "https://mazimd.com/pages/38rduve91",
  "id": "38rduve91",
  "content": "# Hello World",
  "created_at": "2017-06-28T02:54:19.963Z"
}
```

### Create a page

```
POST /pages
```

#### Input

```json
{
  "content": "# Hello World",
  "expire_in": "1h"
}
```

#### Response

```
Status: 201 Created
```

```json
{
  "url": "https://api.mazimd.com/pages/38rduve91",
  "html_url": "https://mazimd.com/pages/38rduve91",
  "id": "38rduve91",
  "owner": {
    "id": "xcatliu",
    "avatar_url": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
  },
  "content": "# Hello World",
  "created_at": "2017-06-28T02:54:19.963Z"
}
```
