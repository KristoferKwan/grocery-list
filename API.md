# API Endpoints

> This application only has private endpoints, as all endpoints save for login and signup require users to authenticate via a jwt token.


### Endpoints:
Users
```
/api/users          GET  (retreive user info)
/api/users/register POST (user registration)
/api/users/signin   POST (user login)
/api/users/logout   GET  (user logout)
```
Groceries
```
/api/groceries      GET (retrive grocery checklist) 
/api/groceries      PUT (update grocery checklist)
```