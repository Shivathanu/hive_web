import React, { useContext } from 'react';
import './PatientCRUD.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { createMuiTheme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { PatientCRUDContext } from './PatientCRUDContext';
import { UserInfoContext } from '../../UserInfo/UserInfoContext';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom';
import * as API from '../../../Configs/API';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "50%"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        backgroundColor: "#fff"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const theme = createMuiTheme({
    palette: {
        secondary: {
            // This is green.A700 as hex.
            main: '#0f7387',
        },
    },
});


export default function PatientCRUD(props) {
    const [patientForm, setForm] = useContext(PatientCRUDContext);
    const [data] = useContext(UserInfoContext);
    const classes = useStyles();
    const history = useHistory();

    const handleChange = (event) => {
        const name = event.target.name;
        setForm({
            ...patientForm,
            [name]: event.target.value,
            healthCenter: {
                ...patientForm.healthCenter,
                code: data.professional.healthCenter.code,
                centroSaude: data.professional.healthCenter.centroSaude,
                name: data.professional.healthCenter.name,
                location: data.professional.healthCenter.location
            }
        });

        if (event.target.name.includes('migraineWithAura')) {
            if (event.target.value === false) {
                patientForm.migraineWithAura = false
            }
            else {
                patientForm.migraineWithAura = true
            }
        }

        if (event.target.name.includes('exclusivelyUnilateral')) {
            if (event.target.value === false) {
                patientForm.exclusivelyUnilateral = false
            }
            else {
                patientForm.exclusivelyUnilateral = true
            }
        }

        if (event.target.name.includes('symptomaticTreatmentDetails')) {
            if (event.target.value === '') {
                patientForm.symptomaticTreatment = false
            }
            else {
                patientForm.symptomaticTreatment = true
            }
        }

        if (event.target.name.includes('prophylacticTreatmentDetails')) {
            if (event.target.value === '') {
                patientForm.prophylacticTreatment = false
            }
            else {
                patientForm.prophylacticTreatment = true
            }
        }
        console.log(patientForm.prophylacticTreatment)
    }




    async function handleSubmit(e) {
        e.preventDefault();
        const servicePath = `${API.apiPath}api/professionals/newpatient`;

        await fetch(servicePath, {
            method: 'POST',
            body: JSON.stringify(patientForm),
            headers: {
                'Content-Type': 'application/json',
                'professionalId': localStorage.getItem("professionalId")
            }
        });
        //const newPatientToList = await data.json();
        history.push('/patients');

    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} md={10} lg={10}>
                    <div className="backView">
                        <h2 >Adicionar doente</h2>
                        <form className="formulario" onSubmit={handleSubmit} validate>
                            <ThemeProvider theme={theme}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4} lg={4}>
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="nameInitials">Iniciais do paciente</InputLabel>
                                            <OutlinedInput
                                                required
                                                name='nameInitials'
                                                type='text'
                                                value={patientForm.nameInitials}
                                                labelWidth={140}
                                                onChange={handleChange}
                                                style={{ borderRadius: '20px', backgroundColor: '#fff' }}
                                                color="secondary"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={4} >
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="numeroUtente">Número de utente</InputLabel>
                                            <OutlinedInput
                                                required
                                                name='numeroUtente'
                                                type='text'
                                                value={patientForm.numeroUtente}
                                                labelWidth={130}
                                                onChange={handleChange}
                                                style={{ borderRadius: '20px', backgroundColor: '#fff' }}
                                                color="secondary"
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4} lg={4} >
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="birthdate" />
                                            <OutlinedInput
                                                name='birthdate'
                                                type='date'
                                                onChange={handleChange}
                                                value={patientForm.birthdate}
                                                style={{ borderRadius: '20px', backgroundColor: '#fff' }}
                                                color="secondary"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={4}>
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="gender">Género</InputLabel>
                                            <Select
                                                labelWidth={55}
                                                native
                                                color="secondary"
                                                name="gender"
                                                value={setForm.gender}
                                                onChange={handleChange}
                                                style={{ backgroundColor: '#fff', borderRadius: '20px' }}>
                                                <option aria-label="None" value="" />
                                                <option value="Male">M</option>
                                                <option value="Female">F</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4} lg={4} >
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="migraineWithAura">Enxaqueca</InputLabel>
                                            <Select
                                                native
                                                color="secondary"
                                                name="migraineWithAura"
                                                value={setForm.migraineWithAura}
                                                onChange={handleChange}
                                                labelWidth={84}
                                                style={{ backgroundColor: '#fff', borderRadius: '20px' }}>
                                                <option value="false">Não</option>
                                                <option value="true">Sim</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={4} >
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="exclusivelyUnilateral">Exclusiv. Unilateral</InputLabel>
                                            <Select
                                                native
                                                color="secondary"
                                                name="exclusivelyUnilateral"
                                                value={setForm.exclusivelyUnilateral}
                                                onChange={handleChange}
                                                labelWidth={140}
                                                style={{ backgroundColor: '#fff', borderRadius: '20px' }}>
                                                <option value="false">Não</option>
                                                <option value="true">Sim</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4} lg={4}>
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="symptomaticTreatmentDetails">Tratam. Sintomático</InputLabel>
                                            <OutlinedInput
                                                name='symptomaticTreatmentDetails'
                                                value={setForm.symptomaticTreatmentDetails}
                                                onChange={handleChange}
                                                labelWidth={150}
                                                type="text"
                                                style={{ borderRadius: '20px', backgroundColor: '#fff' }}
                                                color="secondary"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={4} >
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="prophylacticTreatmentDetails">Tratam. Profilático</InputLabel>
                                            <OutlinedInput
                                                name='prophylacticTreatmentDetails'
                                                labelWidth={140}
                                                onChange={handleChange}
                                                value={patientForm.prophylacticTreatmentDetails}
                                                type="text"
                                                style={{ borderRadius: '20px', backgroundColor: '#fff' }}
                                                color="secondary"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={3} >
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="prophylacticTreatmentStartDate" />
                                            <OutlinedInput
                                                name='prophylacticTreatmentStartDate'
                                                type='date'
                                                onChange={handleChange}
                                                value={patientForm.prophylacticTreatmentStartDate}
                                                style={{ borderRadius: '20px', backgroundColor: '#fff' }}
                                                color="secondary"
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4} lg={4}>
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel color="secondary" htmlFor="comorbilidades">Comorbilidades</InputLabel>
                                            <OutlinedInput
                                                name='comorbilidades'
                                                type='text'
                                                labelWidth={130}
                                                style={{ borderRadius: '20px', backgroundColor: '#fff' }}
                                                color="secondary" />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <div className="buttonWrapper" >
                                    <Button type="submit"
                                        variant="contained"
                                        size="medium"
                                        color="secondary"
                                        className="registerProfessional"
                                        style={{ marginBottom: "2ch", marginTop: "2ch" }}>
                                        CRIAR
                                    </Button>
                                </div>
                            </ThemeProvider>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}