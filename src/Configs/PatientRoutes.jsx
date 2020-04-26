import React from "react";
import { Route, Switch } from "react-router-dom";

import PatientCRUD from '../Components/Patients/PatientCRUD/PatientCRUD';
import PatientReport from '../Components/Patients/PatientDashboard/PatientReport/PatientReport';
import PatientCalendar from '../Components/Patients/PatientDashboard/PatientCalendar/PatientCalendar';
import Chat from '../Components/Chat/Chat';

import { PatientDashboardProvider } from "../Components/Patients/PatientDashboard/PatientDashboardContext";
import { PatientCRUDProvider } from '../Components/Patients/PatientCRUD/PatientCRUDContext';

export default function PatientRoutes() {

    return (
        <Switch>
            <PatientDashboardProvider>
                <Route path="/patients/:code/report" component={PatientReport} />
                <Route path="/patients/:code/calendar" component={PatientCalendar} />
                <PatientCRUDProvider>
                    <Route path="/patients/:code/profile" component={PatientCRUD} />
                </PatientCRUDProvider>
                <Route path="/patients/:code/chat" component={Chat} />
            </PatientDashboardProvider>
        </Switch>
    );

}