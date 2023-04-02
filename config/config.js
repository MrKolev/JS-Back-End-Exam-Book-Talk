const configPorts = {
    development:{
PORT: 3000,
SALT_ROUNDS: 1,
SECRET_TOKEN: "mySerkret",
TOKEN_NAME: "TOKEN",
    },
    production:{
PORT: 80,
SALT_ROUNDS: 10,
SECRET_TOKEN: "serkretInUser",
TOKEN_NAME: "USER_SESSION",
    }
}

export const config = configPorts[process.env.NODE_ENV.trim()]