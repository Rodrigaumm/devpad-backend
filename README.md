# Intro

This are the endpoints of the api. Here are listed the method used to access
the endpoint and if it need or not an authentication.

# Authentication

To use the private routes is necessary to send an Authorization header in the request filled with a JWT (JSONWebToken). The format of the header is: "Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDU0NzU0NjQsImV4cCI6MTYwNTU2MTg2NCwic3ViIjoiNGRhZWFkODMtZTAwZi00NTI2LWI1M2UtYWY1NThhNzgxZjcyIn0.8v_dv2-ZKhJjfrrbPOSip1dDdQN_KN9Aj6WmvT7jUgg'"

To create a valid JWT, send a **POST** request to _"/auth"_ with a JSON body which needs to contain
an _email_ and _password_ properties filled with an existent user's data. That request will send back a JSON
with the property _token_ containing your JWT valid for 24 hours.

To verify if a token is still valid, use the _"/auth/verify/yourTokenHere"_ route with a **GET** method.

# Endpoints

## Users

### Route = _"/users"_

-   _`/`_ - **POST**

    -   **isPrivate** = false

    -   Needs a JSON body that contains _username_, _email_ and _password_ properties;
        Creates and returns the new user info.

    -   **Creates an user and returns its info**

---

-   _`/userId`_ - **GET**

    -   **isPrivate** = false

    -   **Returns an user's info**

---

### Route = _"/auth"_

-   _`/`_ - **POST**

    -   **isPrivate** = false

    -   Needs a JSON body that contains _email_ and _password_ properties, filled with a existent user's data;
        Generates a JSONWebToken used to access private routes

    -   **Creates a JWT for the user which has compatible info with the sent data and returns it**

---

-   _`/verify/JSONWebToken`_ - **GET**

    -   **isPrivate** = false

    -   **Verifies if the given JWT is valid or not**

---

## Notes

### Route = _"/notes"_

-   _`/`_ - **GET**

    -   **isPrivate** = true

    -   **Returns all the user's notes with its info. The utilized user is selected by the token in the Authorization header**

---

-   _`/noteId`_ - **GET**

    -   **isPrivate** = true

    -   **Returns a note's info by its id. The note has to be property of the user that generated the token in Authorization header**

---

-   _`/`_ - **POST**

    -   **isPrivate** = true

    -   Needs a JSON body that contains the following properties:

        1. _title_ - string
        2. _content_ - JSON object / string
        3. _tags_ - not required - an array which every element is an existent tag name
        4. _isLink_ - boolean

    -   **Creates a new note and returns its info**

---

-   _`/noteId`_ - **PUT**

    -   **isPrivate** = true

    -   Needs a JSON body that can contain the following properties:

        1. _title_ - string
        2. _content_ - JSON object / string
        3. _tags_ - not required - an array which every element is an existent tag name
        4. _isLink_ - boolean

    -   **Updates the note's info and returns the updated note info**

---

-   _`/noteId`_ - **DELETE**

    -   **isPrivate** = true

    -   **Deletes the note by its ID. Only deletes if the given note is property from the user that generated the token sent in Authorization header**

---

## Tags

**_Will be here in the future..._**
