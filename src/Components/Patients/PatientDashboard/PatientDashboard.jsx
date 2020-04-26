import React, { useContext } from 'react';
import './PatientDashboard.css';

import Container from '@material-ui/core/Container';
import PatientNavBar from './PatientNavBar/PatientNavBar';
import PatientRoutes from '../../../Configs/PatientRoutes';

import { PatientDashboardContext } from './PatientDashboardContext'


export default function PatientDashboard() {
    const [patientInfo/*, setPatientInfo*/] = useContext(PatientDashboardContext);

    return (
        <div>
            <PatientNavBar patientCode={patientInfo.patientProfile.code}/>
            <h3>Doente: {patientInfo.patientProfile.nameInitials} (#{patientInfo.patientProfile.code})</h3>
            <main className="patientDashboardContent">
                <Container maxWidth="lg">
                    <PatientRoutes />
                </Container>
            </main>
        </div>
    );
}