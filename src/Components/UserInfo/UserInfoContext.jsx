import React, {useState, createContext}  from 'react';

export const UserInfoContext = createContext();

export function UserInfoProvider(props){

    const[data, setData] = useState({
        months: {
            0: "janeiro",
            1: "fevereiro",
            2: "março",
            3: "abril",
            4: "maio",
            5: "junho",
            6: "julho",
            7: "agosto",
            8: "setembro",
            9: "outubro",
            10: "novembro",
            11: "dezembro"
        },
        weekDays: {
            0: "Domingo",
            1: "Segunda",
            2: "Terça",
            3: "Quarta", 
            4: "Quinta",
            5: "Sexta",
            6: "Sábado"
        },
        professional: {},
        dateToDisplay: ''
    });


    return(
        <UserInfoContext.Provider value={[data, setData]}>
            {props.children}
        </UserInfoContext.Provider>
    );

}