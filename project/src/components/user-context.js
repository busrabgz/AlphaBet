import React from 'react'

export const userInfo = {
    username: '',
    password: '',
    balance: 0,
    type: '',
    loggedIn: false,
    userId: 0,
    dummyFriend: false,
    filterInfo: {mbn:"", contest: [], sport: "FOOTBALL", sort_type: false, inputText: ""},
    betsInfo: false,
    alphaCoins: 0,
    changeUserInfo: false,
}


export const UserContext = React.createContext({
    userInfo,
    updateBalance: () => {},
    updateLogInState: () => {},
    updateFriends: () => {},
    updateFilterInfo: () => {},
    updateBetsInfo: () => {},
    updateAlphaCoins: () => {},
    updateUserInfo: () => {},
    updateType: () => {},
});