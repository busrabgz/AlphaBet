import React from 'react'

 export const userInfo = {
    username: 'theyucin',
    password: 'zaa',
    balance: 50,
    betslip: [{matchname: "Real Madrid - Galatasaray",  bet: "MS-1", odd: "1.5"},
    {matchname: "Beşiktaş - Liverpool", bet: "MS-0", odd: "1.1"}],
}


export const UserContext = React.createContext({
    userInfo,
    updateBalance: () => {},
});