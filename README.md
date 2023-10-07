# Swatter - Project Management

[Live Demo](https://hardcore-bardeen-da4ef7.netlify.app/)

[Backend Code](https://github.com/BillGibsonDev/Swatter-Server)

## Documentation for Requests

### User Requests

#### USER - Login
```
axios.post(`${SERVER-VARIABLE}/users/login`, {
    username: username,
    password: password,
})
```

returns JSON
```
{
    token: String,
    id: String,
    username: String,
    avatar: String,
}
```

*last login is updated on the server when the user logs in successfully*

#### USER - Sign up
```
axios.post(`${SERVER-VARIABLE}/users/signup`, {
    username: username,
    email: email,
    password: password,
})
```

returns JSON
```
{
    'Account created'
}
```

#### USER - Delete Account
```
axios.post(`${SERVER-VARIABLE}/users/${user.id}/delete-account`,
{
    username: username,
    password: password,
}, 
{
    headers: {
        Authorization: token
    }
})
```

returns JSON
```
{
    'Account Deleted'
}
```