# mazimd-api

The api server for mazimd

http://api.mazimd.com

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
  "url": "http://api.mazimd.com/pages/1gyf5gloc",
  "html_url": "http://mazimd.com/pages/1gyf5gloc",
  "id": "1gyf5gloc",
  "content": "# Hello World",
  "created_at": "2017-06-28T06:56:17.244Z"
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
  "url": "http://api.mazimd.com/pages/1gyf5gloc",
  "html_url": "http://mazimd.com/pages/1gyf5gloc",
  "id": "1gyf5gloc",
  "content": "# Hello World",
  "created_at": "2017-06-28T06:56:17.244Z"
}
```
