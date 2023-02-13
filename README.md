# React Task #

1. Fork this repository into your account (public)
2. Create a responsive web application from the provided design and integrate it with an existing API.
3. Push changes as you progress through the task

#### Tips ###

Creating a react-app: https://reactjs.org/docs/create-a-new-react-app.html

Use 'react-router' as a navigation tool: https://reactrouter.com


# Design #

Desktop: https://xd.adobe.com/view/98075efd-8bc6-4d10-8fbb-191524b3f8e0-cd54/

Mobile: https://xd.adobe.com/view/aa488b65-da07-4131-aebc-fce0cdcc8df6-ff1b/

Font: https://fonts.google.com/specimen/Montserrat

All other assets can be acquired from the provided XD files.


#### Additional information ###

There is no "Register" screen in the flows, so either use the provided email/pw or register a new one through the endpoints. 

A user can edit/delete listings only those that are created by the user himself.

Not all endpoints are to be used. Use only those required for the feature.

# API #

URL: https://automania.herokuapp.com/

Header example: 

```JSON
 'Content-Type': 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI...'
```

## ENDPOINTS
- [User](#markdown-header-user-endpoints)
- [Listing](#markdown-header-listing-endpoints)
- [File](#markdown-header-file-endpoints)

### USER ENDPOINTS [↑](#markdown-header-endpoints)

Address                              | Description                                                 | Method    | Authentication 
-------------------------------------|-------------------------------------------------------------|-----------|---------------
/user/register                       | Register new user                                           | POST      | NO
/user/check                          | Check email exists in database                              | POST      | NO
/user/login                          | Login in system                                             | POST      | NO
/user/logout                         | Logout from system                                          | PUT       | YES

### /user/register
- Register new user
- method: POST
- authentication: NO
```JSON
// Example body
// All fields is required
{
    "email": "example@abv.bg",     // must be valid email
    "password": "my_password",
    "fullName": "Златна Пампорова"    // must be string with 2 words
}

// Example result
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2RjY2VmODkxNmM3NTAyYmQwZjg4NTMiLCJ0b2tlbkRhdGUiOiIyMDIzLTAyLTAzVDA5OjA2OjI0LjcwMVoiLCJpYXQiOjE2NzU0MTUyODh9.MuqB9qNsiuXpBFqDboX_z2lKPkrFA17RTWqcoWy22kY",
    "user": {
        "email": "example@abv.bg",
        "fullName": "Златна Пампорова",
        "tokenDate": "2023-02-03T09:06:24.701Z",
        "_id": "63dccef8916c7502bd0f8853",
        "createdAt": "2023-02-03T09:08:08.385Z",
        "updatedAt": "2023-02-03T09:08:08.385Z",
        "id": "63dccef8916c7502bd0f8853"
    }
}
```

### /user/check
- Check email exists in database
- method: POST
- authentication: NO
```JSON
// Example body
{
    "email": "example@abv.bg"   // required, must be valid email
}

// Example result
{
    "success": true,
    "payload": {
        "emailExists": true // or false if email don't exists
    }
}
```

### /user/login
- Login in system
- method: POST
- authentication: NO
```JSON
// Example body
// All fields is required
{
    "email": "example@abv.bg",   // must be valid email
    "password": "password123"
}

// Example result (on success)
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2RjY2VmODkxNmM3NTAyYmQwZjg4NTMiLCJ0b2tlbkRhdGUiOiIyMDIzLTAyLTAzVDA5OjEwOjIzLjAwMVoiLCJpYXQiOjE2NzU0MTU0MjN9.WxSIcEBsg8zOvd2_6xkY5JvklTnunH297k_7-nE4Fvo",
    "user": {
        "_id": "63dccef8916c7502bd0f8853",
        "email": "example@abv.bg",
        "fullName": "Златна Пампорова",
        "tokenDate": "2023-02-03T09:10:23.001Z",
        "createdAt": "2023-02-03T09:08:08.385Z",
        "updatedAt": "2023-02-03T09:10:23.002Z",
        "id": "63dccef8916c7502bd0f8853"
    }
}
```

### /user/logout
- Logout from system (make token expired)
- method: PUT
- authentication: YES
```JSON
// no body

// Example result
{
    "success": true,
    "payload": {
        "message": "Successfully logout from system"
    }
}
```

### LISTING ENDPOINTS [↑](#markdown-header-endpoints)

Address                              | Description                                                 | Method    | Authentication 
-------------------------------------|-------------------------------------------------------------|-----------|---------------
/listing/create                      | Create new listing                                          | POST      | YES
/listing/list                        | Get all listings (paginate)                                 | POST      | NO
/listing/:_id                        | Get single listing                                          | GET       | NO
/listing/:_id                        | Edit single listing                                         | PUT       | YES
/listing/:_id                        | Delete single listing                                       | DELETE    | YES

### /listing/create
- Create new listing
- method: POST
- authentication: YES
```JSON
// Example body
// Field 'additionalPhotos' is not required. Must be array, empty or include only valid URLs
{
    "brand": "Lada",  // required
    "model": "Niva",  // required
    "price": "1",     // required, must be number bigger from zero
    "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/6X7pWkavfbKedPsCwWUUs-niva%201.jpg", // required, must be valid URL
    "additionalPhotos": [
        "https://dev-fidweb.s3.amazonaws.com/automania/ei4bOgAq7ajZUFqmw1Dys-Niva%202.jpg"
    ]
}

// Example result
{
    "success": true,
    "payload": {
        "user": {
            "_id": "63dbc6555d497473eae409f9",
            "email": "example@abv.bg",
            "fullName": "Златна Пампорова",
            "id": "63dbc6555d497473eae409f9"
        },
        "brand": "Lada",
        "model": "Niva",
        "price": 1,
        "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/6X7pWkavfbKedPsCwWUUs-niva%201.jpg",
        "additionalPhotos": [
            "https://dev-fidweb.s3.amazonaws.com/automania/ei4bOgAq7ajZUFqmw1Dys-Niva%202.jpg"
        ],
        "_id": "63dcd1e8916c7502bd0f885e",
        "createdAt": "2023-02-03T09:20:40.802Z",
        "updatedAt": "2023-02-03T09:20:40.802Z",
        "__v": 0,
        "id": "63dcd1e8916c7502bd0f885e"
    }
}
```

### /listing/list
- Get all listings (paginate)
- method: POST
- authentication: NO
```JSON
// Example body
// All fields is not required
{
    "pageNumber": 1,        // default is 1
    "pageSize": 10,         // default is 10
    "sortBy": "",           // default is { "createdAt": -1 }
    "noPagination": false   // default is false
}

// Example result
{
    "success": true,
    "payload": {
        "docs": [
            {
                "_id": "63dcd2a0916c7502bd0f8866",
                "user": {
                    "_id": "63dbc6555d497473eae409f9",
                    "email": "example@abv.bg",
                    "fullName": "Златна Пампорова"
                },
                "brand": "MZ",
                "model": "ETZ 251",
                "price": 1000,
                "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/rcOwkbDONe1uUvzfhh8Lj-b0mecz16bafnoga1750b4bm.jpg",
                "additionalPhotos": [],
                "createdAt": "2023-02-03T09:23:44.833Z",
                "updatedAt": "2023-02-03T09:23:44.833Z",
                "id": "63dcd2a0916c7502bd0f8866"
            },
            {
                "_id": "63dcd1e8916c7502bd0f885e",
                "user": {
                    "_id": "63dbc6555d497473eae409f9",
                    "email": "example@abv.bg",
                    "fullName": "Златна Пампорова"
                },
                "brand": "Lada",
                "model": "Niva",
                "price": 1,
                "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/6X7pWkavfbKedPsCwWUUs-niva%201.jpg",
                "additionalPhotos": [
                    "https://dev-fidweb.s3.amazonaws.com/automania/ei4bOgAq7ajZUFqmw1Dys-Niva%202.jpg"
                ],
                "createdAt": "2023-02-03T09:20:40.802Z",
                "updatedAt": "2023-02-03T09:20:40.802Z",
                "id": "63dcd1e8916c7502bd0f885e"
            },
            {
                "_id": "63dbe2de9bae1506b3595e44",
                "user": {
                    "_id": "63dbc6555d497473eae409f9",
                    "email": "example@abv.bg",
                    "fullName": "Златна Пампорова"
                },
                "brand": "Lada",
                "model": "Niva",
                "price": 1000,
                "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/6X7pWkavfbKedPsCwWUUs-niva%201.jpg",
                "additionalPhotos": [
                    "https://dev-fidweb.s3.amazonaws.com/automania/ei4bOgAq7ajZUFqmw1Dys-Niva%202.jpg"
                ],
                "createdAt": "2023-02-02T16:20:46.842Z",
                "updatedAt": "2023-02-03T08:45:33.024Z",
                "id": "63dbe2de9bae1506b3595e44"
            }
        ],
        "totalDocs": 3,
        "limit": 10,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
```

### /listing/:_id
- Get single listing
- method: GET
- authentication: NO
```JSON
// _id param is listing _id
// Example result
{
    "success": true,
    "payload": {
        "_id": "63dbe2de9bae1506b3595e44",
        "user": {
            "_id": "63dbc6555d497473eae409f9",
            "email": "example@abv.bg",
            "fullName": "Златна Пампорова"
        },
        "brand": "Lada",
        "model": "Niva",
        "price": 1000,
        "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/6X7pWkavfbKedPsCwWUUs-niva%201.jpg",
        "additionalPhotos": [
            "https://dev-fidweb.s3.amazonaws.com/automania/ei4bOgAq7ajZUFqmw1Dys-Niva%202.jpg"
        ],
        "createdAt": "2023-02-02T16:20:46.842Z",
        "updatedAt": "2023-02-03T08:45:33.024Z",
        "__v": 0
    }
}
```

### /listing/:_id
- Edit single listing
- method: PUT
- authentication: YES
```JSON
// CAN EDIT ONLY LISTINGS CREATED BY YOU
// Body cannot be empty object
// _id param is listing _id
// All fields from create request is available for editing
// Example
{
    "price": "1002",     // must be number bigger from zero
    "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/6X7pWkavfbKedPsCwWUUs-niva%201.jpg", // must be valid URL
}

// Result is same like get request with updated fields
{
    "success": true,
    "payload": {
        "_id": "63dbe2de9bae1506b3595e44",
        "user": {
            "_id": "63dbc6555d497473eae409f9",
            "email": "example@abv.bg",
            "fullName": "Златна Пампорова"
        },
        "brand": "Lada",
        "model": "Niva",
        "price": 1002,
        "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/6X7pWkavfbKedPsCwWUUs-niva%201.jpg",
        "additionalPhotos": [
            "https://dev-fidweb.s3.amazonaws.com/automania/ei4bOgAq7ajZUFqmw1Dys-Niva%202.jpg"
        ],
        "createdAt": "2023-02-02T16:20:46.842Z",
        "updatedAt": "2023-02-03T08:45:33.024Z",
        "__v": 0
    }
}
```

### /listing/:_id
- Delete single listing (permanent delete)
- method: DELETE
- authentication: YES
```JSON
// CAN EDIT ONLY LISTINGS CREATED BY YOU
// _id param is listing _id

// Result is deleted listing
{
    "success": true,
    "payload": {
        "_id": "63dbe2de9bae1506b3595e44",
        "user": {
            "_id": "63dbc6555d497473eae409f9",
            "email": "example@abv.bg",
            "fullName": "Златна Пампорова"
        },
        "brand": "Lada",
        "model": "Niva",
        "price": 1002,
        "mainPhoto": "https://dev-fidweb.s3.amazonaws.com/automania/6X7pWkavfbKedPsCwWUUs-niva%201.jpg",
        "additionalPhotos": [
            "https://dev-fidweb.s3.amazonaws.com/automania/ei4bOgAq7ajZUFqmw1Dys-Niva%202.jpg"
        ],
        "createdAt": "2023-02-02T16:20:46.842Z",
        "updatedAt": "2023-02-03T08:45:33.024Z",
        "__v": 0
    }
}
```

### FILE ENDPOINTS [↑](#markdown-header-endpoints)

Address                              | Description                                                 | Method    | Authentication 
-------------------------------------|-------------------------------------------------------------|-----------|---------------
/file/upload                         | Upload one or many files to server                          | POST      | YES

### /file/upload
- Upload one or many files to server
- method: POST
- authentication: YES
- Files must be in FormData with key 'images'
- Files must be an images (jpg, png, gif, ...)
- Remove any "Content-Type" attribute in the header.
```JSON
// Example result
{
    "success": true,
    "payload": [
        {
            "fileName": "0d03c3107905859.5fb249502b97c.gif",
            "type": "image/gif",
            "url": "https://dev-fidweb.s3.amazonaws.com/automania/GIZJegljwfjoWOvrtSPQb-0d03c3107905859.5fb249502b97c.gif"
        },
        {
            "fileName": "b0mecz16bafnoga1750b4bm.jpg",
            "type": "image/jpeg",
            "url": "https://dev-fidweb.s3.amazonaws.com/automania/qa2qz2PSwGvEt6XJN0r1j-b0mecz16bafnoga1750b4bm.jpg"
        }
    ]
}
```