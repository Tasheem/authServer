# Book Store - Authentication Service
This project is a service which stands between the client (i.e. Browser) and other backend services.  The primary responsiblity of this service is to authenticate requests.

# Tools Used For This Project
* Node.js
* Express
* JSON Web Tokens
* JSON for requests and responses

# Project Structure
## Middleware
* The file authenticate.js is in the middleware directory filters all requests.  The job of this middleware is to determine whether on not the request needs to be authenticated, and if so, authenticate that request.
## Handler Functions
* After the request gets past the filter, the request is sent to the appropriate handler function in the routes directory.
* The handler functions are responsible for interpreting the requests and calling functions in the outbound requests directory when the response requires data from backend services.
## Outbound Requests
* The functions located in the outbound requests directory are responsible for sending requests to the backend services and sending the data from the response back to the callee, or handler function.