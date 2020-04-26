import React, { useState } from 'react';
import './PatientNavBar.css';

import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

export default function PatientNavBar(props) {

    const [buttonsState, setButtonsState] = useState([true, false, false, false]);

    function handleItemClick(index) {
        for (var i = 0; i < buttonsState.length; i++) {
            if (index === i) {
                setButtonsState([
                    ...buttonsState,
                    buttonsState[index] = true
                ])
            } else {
                setButtonsState([
                    ...buttonsState,
                    buttonsState[i] = false
                ])
            }
        }
    }

    return (
        <div className="patientNavBar">
            <Link to={`/patients/${props.patientCode}/report`} className="dashboardOption">
                <Button type="submit"
                    variant="contained"
                    size="large"
                    className={buttonsState[0] ? "dashboardSelectedLink" : "dashboardLink"}
                    onClick={() => handleItemClick(0)}>Relatório</Button>
            </Link>

            <Link to={`/patients/${props.patientCode}/calendar`} className="dashboardOption">
                <Button type="submit"
                    variant="contained"
                    size="large"
                    className={buttonsState[1] ? "dashboardSelectedLink" : "dashboardLink"}
                    onClick={() => handleItemClick(1)}>Calendário</Button>
            </Link>

            <Link to={{ pathname: `/patients/${props.patientCode}/profile`, state: { isEditing: true, patientId: props.patientCode } }} className="dashboardOption">
                <Button type="submit"
                    variant="contained"
                    size="large"
                    className={buttonsState[2] ? "dashboardSelectedLink" : "dashboardLink"}
                    onClick={() => handleItemClick(2)}>Perfil</Button>
            </Link>

            <Link to={`/patients/${props.patientCode}/chat`} className="dashboardOption">
                <Button type="submit"
                    variant="contained"
                    size="large"
                    className={buttonsState[3] ? "dashboardSelectedLink" : "dashboardLink"}
                    onClick={() => handleItemClick(3)}>Chat</Button>
            </Link>
        </div>
    )
}