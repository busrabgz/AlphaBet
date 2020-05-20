import React from 'react'

export const userInfo = {
    username: '',
    password: '',
    balance: 0,
    type: '',
    loggedIn: false,
    userId: -1,
    betslip: [{matchname: "Real Madrid - Galatasaray",  bet: "MS-1", odd: "1.5"},
    {matchname: "Beşiktaş - Liverpool", bet: "MS-0", odd: "1.1"}],
    dummyFriend: false,
    changeUserInfo: false,
    alphaCoins: 0
}


export const UserContext = React.createContext({
    userInfo,
    updateBalance: () => {},
    updateLogInState: () => {},
    updateFriends: () => {},
    updateUserInfo: () => {},
    updateAlphaCoins: () => {}
});