import React, { useState, createContext } from 'react';

export const PatientCRUDContext = createContext();

export function PatientCRUDProvider(props) {


    const [patientForm, setForm] = useState({
        numeroUtente:'',
        nameInitials:'',
        birthdate:'',
        unilateral:'', //???
        gender:'',
        migraineWithAura:false, //dor de cabeça?
        exclusivelyUnilateral:false, //exclusiv. unilat?
        healthCenter:{ 
            code:'',
            name:'',
            location:'',
            centroSaude:'',
        },
        symptomaticTreatment:false,
        symptomaticTreatmentDetails:'',
        prophylacticTreatment:false,
        prophylacticTreatmentDetails:'',
        prophylacticTreatmentStartDate:'',
        anxiety:false,
        depression:false,
        insomnia:false,
        otherMedicalConditions:''
    });

    return (
        <PatientCRUDContext.Provider value={[patientForm, setForm]}>
            {props.children}
        </PatientCRUDContext.Provider>
    );
}