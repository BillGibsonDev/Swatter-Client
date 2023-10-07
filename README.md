# Swatter - Project Management

[Live Demo](https://hardcore-bardeen-da4ef7.netlify.app/)

[Backend Code](https://github.com/BillGibsonDev/Swatter-Server)

## Documentation for Requests

### User Requests

#### USER Login

SERVER-VARIABLE/login

username: String,
password: String,

> returns 
{
    token: String,
    id: String,
    username: String,
    avatar: String,
}

*last login is created when the user logs in successfully*

