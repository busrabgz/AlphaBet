import React from 'react'

export const userInfo = {
    username: '',
    password: '',
    balance: 50,
    type: '',
    loggedIn: false,
}

export const UserContext = React.createContext({
    userInfo,
    updateBalance: () => {},
    updateLogInState: () => {},
});