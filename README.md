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

- [Get a page](#get-a-page)
- [Create a page](#create-a-page)
- [Get a theme](#get-a-theme)
- [Create a theme](#create-a-theme)
- [List all themes](#list-all-themes)

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

### Get a theme

```
GET /themes/:id
```

#### Response

```
Status: 200 OK
```

```json
{
  "url": "http://api.mazimd.com/themes/1gyf5gloc",
  "html_url": "http://mazimd.com/themes/1gyf5gloc",
  "id": "1gyf5gloc",
  "name": "Base theme",
  "css": "p { background: yellow; }",
  "created_at": "2017-06-28T06:56:17.244Z"
}
```

### Create a theme

```
POST /themes
```

#### Input

```json
{
  "name": "Base theme",
  "css": "# Hello World"
}
```

#### Response

```
Status: 201 Created
```

```json
{
  "url": "http://api.mazimd.com/themes/1gyf5gloc",
  "html_url": "http://mazimd.com/themes/1gyf5gloc",
  "id": "1gyf5gloc",
  "name": "Base theme",
  "content": "p { background: yellow; }",
  "created_at": "2017-06-28T06:56:17.244Z"
}
```

### List all themes

```
GET /themes
```

#### Response

```json
[
  {
    "url": "http://api.mazimd.com/themes/1gyf5gloc",
    "html_url": "http://mazimd.com/themes/1gyf5gloc",
    "id": "1gyf5gloc",
    "name": "Base theme",
    "created_at": "2017-06-28T06:56:17.244Z"
  }
]
```
