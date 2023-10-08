# Swatter - Project Management

[Live Demo](https://hardcore-bardeen-da4ef7.netlify.app/)

[Backend Code](https://github.com/BillGibsonDev/Swatter-Server)

## Getting Started

### NPM Packages

```
axios 
marked 
moment
react-redux 
redux-thunk
react-router-dom 
styled-components
yup
```

## Documentation for Requests

### User Requests

#### USER - Login
```
axios.post(`{SERVER-VARIABLE}/users/login`, {
    username: String,
    password: String,
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
axios.post(`{SERVER-VARIABLE}/users/signup`, {
    username: String,
    email: String,
    password: String,
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
axios.post(`{SERVER-VARIABLE}/users/{USER-ID}/delete-account`,
{
    username: String,
    password: String,
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

### Project Requests

#### PROJECT - Create Project
```
axios.post(`{SERVER-VARIABLE}/{USER-ID}/projects/create`,
{
    title: String,
    link: String,
    image: String,
    repository: String,
    description: String,
},
{
    headers: {
        Authorization: token
    }
})
```

#### PROJECT - Update Project

```
axios.post(`{SERVER-VARIABLE}/${USER-ID}/projects/{PROJECT-ID}/edit`,
{
    title: String,
    link: String,
    image: String,
    repository: String,
    description: String,
},
{
    headers: {
        Authorization: token
    }
})
```
#### PROJECT - Delete Project

```
axios.delete(`{SERVER-VARIABLE}/${USER-ID}/projects/{PROJECT-ID}/delete`,
{
    headers: {
        Authorization: token
    }
})
```