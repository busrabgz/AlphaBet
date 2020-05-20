import React from 'react'

export const userInfo = {
    username: '',
    password: '',
    balance: 0,
    type: '',
    loggedIn: false,
    userId: 0,
    betslip: [{matchname: "Real Madrid - Galatasaray",  bet: "MS-1", odd: "1.5"},
    {matchname: "Beşiktaş - Liverpool", bet: "MS-0", odd: "1.1"}],
    dummyFriend: false,
    filterInfo: {mbn:"", contest: [], sport: "", sort: "", inputText: ""},
    betsInfo: []
}


export const UserContext = React.createContext({
    userInfo,
    updateBalance: () => {},
    updateLogInState: () => {},
    updateFriends: () => {},
    updateFilterInfo: () => {},
    updateBetsInfo: () => {}
});