import React, { useState, createContext, useEffect } from 'react';
import * as API from '../../../Configs/API';

export const PatientsListContext = createContext();

export function PatientsListProvider(props) {

    const [patients, setPatients] = useState({
        data : [],
        query: ''
    });

    useEffect(() => {
        const servicePath = `${API.apiPath}api/professionals/mypatients/`;
        const data = fetch(servicePath, {
            method: 'GET',
            headers: {
                'professionalId' : localStorage.getItem("professionalId")
            }
        });

        const myPatientsItems = data.json();
        setPatients({
            data : myPatientsItems,
            query : patients.query
        })
        
    }, [patients, setPatients]);

    

    return (
        <PatientsListContext.Provider value={[patients, setPatients]}>
            {props.children}
        </PatientsListContext.Provider>
    );
}