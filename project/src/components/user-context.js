import React from 'react'

export const userInfo = {
    username: 'theyucin',
    password: 'zaa',
    balance: 50,
}

export const UserContext = React.createContext({
    userInfo,
    updateBalance: () => {},
});