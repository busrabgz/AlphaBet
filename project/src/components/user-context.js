import React from 'react'

export const userInfo = {
    username: 'theyucin',
    password: 'zaa',
    balance: 50,
    bet1: {
        match1: "Real Madrid - Galatasaray",
        bet1: "MS-1",
        odd1: "1.5",
        match1: "Beşiktaş - Liverpool",
        bet1: "MS-0",
        odd1: "1.1",
    }
    bet2:{
        match1: "Barcelona - Fenerbahçe",
        bet1: "2.5 Üst",
        odd1: "1.2",
        match1: "Inter Milan - Chelsea",
        bet1: "Korner 9 üst",
        odd1: "2.2",
    }
}

export const UserContext = React.createContext({
    userInfo,
    updateBalance: () => {},
});