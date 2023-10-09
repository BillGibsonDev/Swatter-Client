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

#### Login
```
axios.post(`{SERVER-VARIABLE}/users/login`, {
    username: String,
    password: String,
})
```

Returns JSON
```
{
    token: String,
    id: String,
    username: String,
    avatar: String,
}
```

*last login is updated on the server when the user logs in successfully*

#### Sign up
```
axios.post(`{SERVER-VARIABLE}/users/signup`, {
    username: String,
    email: String,
    password: String,
})
```

Returns JSON
```
{
    'Account created'
}
```

#### Delete Account
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

Returns JSON
```
{
    'Account Deleted'
}
```

### Project Requests

#### Get Projects
```
axios.get(`{SERVER-VARIABLE}/{USER-ID}/projects`,
    {
    headers: {
        Authorization: token,
    },
});
```

Returns the project objects
```
{
    _id: String,
    title: String,
    link: String,
    image: String,
    repository: String,
    description: String,
    lastUpdate: String,
    members: Array
    tickets: Array
    comments: Array
}
```

#### Get Project
```
axios.get(`{SERVER-VARIABLE}/{USER-ID}/projects/{PROJECT-ID}`,
    {
    headers: {
        Authorization: token,
    },
});
```

Returns the project object
```
{
    _id: String,
    title: String,
    link: String,
    image: String,
    repository: String,
    description: String,
    lastUpdate: String,
    members: Array
    tickets: Array
    comments: Array
}
```


#### Create Project
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

Returns
```
{
    'Project Created!
}
```

#### Update Project
```
axios.post(`{SERVER-VARIABLE}/{USER-ID}/projects/{PROJECT-ID}/edit`,
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

Returns the updated project object
```
{
    _id: String,
    title: String,
    link: String,
    image: String,
    repository: String,
    description: String,
    lastUpdate: String,
    members: Array
    tickets: Array
    comments: Array
}
```

#### Delete Project
```
axios.delete(`{SERVER-VARIABLE}/{USER-ID}/projects/{PROJECT-ID}/delete`,
{
    headers: {
        Authorization: token
    }
})
```

Returns
```
{
    '{PROJECT-TITLE} deleted'
}
```

### Ticket Requests

#### Create Ticket
```
axios.post(`{VARIABLE-ID}/{USER-ID}/projects/{PROJECT-ID}/tickets/create`,
{
    title: String,
    description: String,
    status: String,
    priority: String,
    assigned: String,
    tag: String,
    sprint: String,
    images: Array,
    link: String
},
{
    headers: {
        Authorization: token
    }
})
```

*ticket author is created on the server*

Returns
```
{
    'Ticket Created'
}
```

#### Update Ticket
```
axios.post(`{SERVER-VARIABLE}/{USER-ID}/projects/{PROJECT-ID}/tickets/{TICKET-ID}/update`,
    {
        description: String,
        status: String,
        tag: String,
        priority: String,
        assigned: String,
        sprint: String,
        images: Array,
        link: String
    },
    {
        headers: {
            Authorization: token
        }
    }
)
```

*titles can not be edited*

Returns updated ticket object
```
{
    _id: String,
    title; String,
    description: String,
    status: String,
    tag: String,
    priority: String,
    assigned: String,
    sprint: String,
    images: Array,
    comments: Array,
    link: String
}
```