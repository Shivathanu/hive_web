import React from "react";
import { Route, Switch } from "react-router-dom";

/* Chat */
import Chat from '../Components/Chat/Chat';

/* MyProfile */
import MyProfile from '../Components/MyProfile/MyProfile';

/* Notifications */
import NotificationsList from '../Components/Notifications/NotificationsList/NotificationsList';

/* Patients */
import PatientList from '../Components/Patients/PatientsList/PatientsList';
import PatientCRUD from '../Components/Patients/PatientCRUD/PatientCRUD';
import PatientDashboard from '../Components/Patients/PatientDashboard/PatientDashboard';
import { PatientDashboardProvider } from "../Components/Patients/PatientDashboard/PatientDashboardContext";

/* Data Provider */
import { PatientsListProvider } from '../Components/Patients/PatientsList/PatientsListContext';
import { PatientCRUDProvider } from '../Components/Patients/PatientCRUD/PatientCRUDContext';

/* Professionals*/
import ProfessionalReg from '../Components/Authentication/Registration/ProfessionalReg';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <PatientsListProvider>
                    <PatientList />
                </PatientsListProvider>
            </Route>
            <Route path="/patients" exact>
                <PatientsListProvider>
                    <PatientList />
                </PatientsListProvider>
            </Route>
            <Route path="/patients/:code">
                <PatientDashboardProvider>
                    <PatientDashboard/>
                </PatientDashboardProvider>
            </Route>
            <Route path="/notifications" component={NotificationsList} />
            <Route path="/patient-form">
                <PatientCRUDProvider>
                    <PatientCRUD />
                </PatientCRUDProvider>
            </Route>

            <Route path="/chat" component={Chat} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/authentication" component={ProfessionalReg} />
        </Switch >
    );
}