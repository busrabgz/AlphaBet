import React from 'react'

export const userInfo = {
    username: '',
    password: '',
    balance: 0,
    type: '',
    loggedIn: false,
    userId: 0,
}


export const UserContext = React.createContext({
    userInfo,
    updateBalance: () => {},
    updateLogInState: () => {}
});