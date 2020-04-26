import React, { useState, createContext, useEffect } from 'react';
import * as API from '../../../Configs/API';

export const PatientDashboardContext = createContext();

export function PatientDashboardProvider(props, {match}) {

    useEffect(() => {
        fetchPatientInfo();
    }, [match]);

    async function fetchPatientInfo(){
        var url = window.location.pathname.split('/');
        var patientCode = url[url.length - 1];
        
        const servicePath = `${API.apiPath}api/professionals/mypatients/${patientCode}`;
        const data = await fetch(servicePath, {
            method: 'GET',
            headers: {
                'professionalId' : localStorage.getItem("professionalId")
            }
        });

        const fetchedPatientInfo = await data.json();
        setPatientInfo(fetchedPatientInfo)
    }

    const [patientInfo, setPatientInfo] = useState({
        patientProfile: {},
        reportView: {},
        calendarView: {}
    });

    return (
        <PatientDashboardContext.Provider value={[patientInfo, setPatientInfo]}>
            {props.children}
        </PatientDashboardContext.Provider>
    );
}