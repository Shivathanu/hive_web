import React, { useContext, useState } from 'react';
import './PatientsList.css';
import * as API from '../../../Configs/API';

import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { createMuiTheme } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PatientsListContext } from './PatientsListContext';
import { ThemeProvider } from '@material-ui/styles';

/**
 * OVERRIDE STYLES FROM MATERIAL-UI
 */

const theme = createMuiTheme({
    palette: {
        secondary: {
            // This is green.A700 as hex.
            main: '#0f7387',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: '#B7B7B9',
        borderRadius: '30px',
    }
}));

/**
 * ALL ELEMENTS TO RENDER ON SCREEN
 */

export default function PatientsList() {
    const [patients, setPatients] = useContext(PatientsListContext);

    const classes = useStyles();

    function searchBarChange(e) {
        setPatients({
            data: patients.data,
            query: e.target.value.toUpperCase()
        });
    }

    function addPatientSubmit(e) {
        e.preventDefault();
        addPatient(e.target[0].value);
        e.target[0].value = '';
    }

    async function addPatient(code) {
        const servicePath = `${API.apiPath}api/professionals/mypatients/`;

        const data = await fetch(servicePath, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'professionalId': localStorage.getItem("professionalId"),
                'patientCode': code
            }
        });

        const newPatientToList = await data.json();
        if (newPatientToList.code) {
            setPatients({
                data: patients.data.concat(newPatientToList),
                query: patients.query
            });
        }

    }

    return (
        <div className="patientsListContainer">
            <div className="patientsListGrid">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={9} lg={9}>
                        <div className="searchBarWrapper">
                            <form>
                                <FormControl fullWidth variant="outlined">
                                    <ThemeProvider theme={theme}>
                                        <InputLabel color="secondary" htmlFor="search-bar">Procurar Doentes</InputLabel>
                                        <OutlinedInput
                                            id='search-bar'
                                            name='search-bar'
                                            type='search'
                                            onChange={searchBarChange}
                                            labelWidth={130}
                                            style={{ borderRadius: '20px', backgroundColor: '#fff' }}
                                            color="secondary"
                                            endAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                        />
                                    </ThemeProvider>
                                </FormControl>
                            </form>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={9} lg={9}>
                        <TableContainer component={Paper}>
                            <PatientsListTable aria-label="simple table"
                                header={[
                                    {
                                        name: "Iniciais do Nome",
                                        prop: 'name_initials'
                                    },
                                    {
                                        name: "Código",
                                        prop: 'code'
                                    },
                                    {
                                        name: "Género",
                                        prop: 'gender'
                                    },
                                    {
                                        name: "Data de Nascimento",
                                        prop: 'dt_birth'
                                    },
                                    {
                                        name: "",
                                        prop: 'remove_from_list'
                                    },
                                    {
                                        name: "",
                                        prop: 'share_link'
                                    }
                                ]}
                                data={
                                    patients.query !== '' ? patients.data.filter(x =>
                                        Object.values(x).join("").includes(patients.query)
                                    ) : patients.data
                                }
                            />
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper className={classes.paper}>
                            <h2 className="addPatientCard">Associar Doente</h2>
                            <div className="addPatientFormWrapper">
                                <form onSubmit={addPatientSubmit}>
                                    <div className="addPatientFormElements">
                                        <FormControl variant="standard" size="small" className="patientCodeInput">
                                            <ThemeProvider theme={theme}>
                                                <OutlinedInput
                                                    id='add-patient-code'
                                                    name='add-patient-code'
                                                    type='text'
                                                    placeholder="Código"
                                                    style={{
                                                        borderRadius: '20px',
                                                        backgroundColor: '#fff'
                                                    }}
                                                    color="secondary"
                                                    startAdornment={<InputAdornment position="start">#</InputAdornment>}
                                                />
                                            </ThemeProvider>
                                        </FormControl>
                                        <ThemeProvider theme={theme}>
                                            <Button type="submit"
                                                variant="contained"
                                                size="small"
                                                color="secondary"
                                                className="patientCodeButton">
                                                <CheckIcon fontSize="small" />
                                            </Button>
                                        </ThemeProvider>
                                    </div>
                                </form>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

            <div className="buttonContainer">
                <Link to={{
                    pathname: "/patient-form",
                    state: {
                        isEditing: false,
                        patientId: null
                    }
                }}>
                    <ThemeProvider theme={theme}>
                        <Button type="submit"
                            variant="contained"
                            size="medium"
                            color="secondary"
                            className="patientCodeButton">Adicionar Doente</Button>
                    </ThemeProvider>
                </Link>
            </div>
        </div>
    );
}

/**
 * PATIENTS LIST COMPONENT
 */

function PatientsListTable({ header, data }) {

    const [patients, setPatients] = useContext(PatientsListContext);
    const history = useHistory();
    var lineActionsClick = false;

    const theme = createMuiTheme({
        palette: {
            secondary: {
                // This is green.A700 as hex.
                main: '#0f7387',
            },
        },
    });

    const [dialogManagement, setDialogManagement] = useState({
        isOpen: false,
        shareCode: false,
        patientCode: null
    });

    function shareCodeClick(patientCode) {
        lineActionsClick = true;
        setDialogManagement({
            isOpen: true,
            shareCode: true,
            patientCode: patientCode
        });
    }

    function removeItem(patientCode) {
        lineActionsClick = true;
        setDialogManagement({
            isOpen: true,
            shareCode: false,
            patientCode: patientCode
        });
    }

    function patientSelected(patientCode) {
        if(!lineActionsClick){
            history.push(`/patients/${patientCode}`);
        } 
    }

    async function handleClose(performAction) {
        lineActionsClick=false;
        if (performAction) {
            if (dialogManagement.shareCode) {
                //send mail TO-DO
                setDialogManagement({
                    isOpen: false,
                    shareCode: false,
                    patientCode: null
                })
            } else {
                const servicePath = `${API.apiPath}api/professionals/mypatients/`;
                const data = await fetch(servicePath, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'professionalId': localStorage.getItem("professionalId"),
                        'patientCode': dialogManagement.patientCode
                    }
                });

                const retrievedData = await data;
                if (retrievedData.ok) {
                    setPatients({
                        data: patients.data.filter(obj =>
                            obj.code !== dialogManagement.patientCode
                        ),
                        query: patients.query
                    });
                }

                setDialogManagement({
                    isOpen: false,
                    shareCode: false,
                    patientCode: null
                })
            }
        } else {
            setDialogManagement({
                isOpen: false,
                shareCode: false,
                patientCode: null
            })
        }

    };

    return (
        <div>
            <Table aria-label="simple table">
                <TableHead className="patientsTable">
                    <TableRow>
                        {header.map((x, i) =>
                            <TableCell align="center" key={i}>
                                {x.name}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((patient, index) => (
                        <TableRow hover align="center" key={index} onClick={() => patientSelected(patient.code)}>
                            <TableCell align="center">{patient.nameInitials}</TableCell>
                            <TableCell align="center">{patient.code}</TableCell>
                            <TableCell align="center">{patient.gender}</TableCell>
                            <TableCell align="center">{patient.birthdate}</TableCell>
                            <TableCell align="right" size="small"><IconButton onClick={() => removeItem(patient.code)} size="small"><RemoveCircleIcon /></IconButton></TableCell>
                            <TableCell align="right" size="small"><IconButton onClick={() => shareCodeClick(patient.code)} size="small"><SendIcon /></IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={dialogManagement.isOpen} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
                {
                    dialogManagement.shareCode ?
                        <DialogTitle id="form-dialog-title">
                            Partilhar Código do Paciente
                    </DialogTitle> :
                        <DialogTitle id="form-dialog-title">
                            Remover Paciente da Lista
                    </DialogTitle>
                }
                <DialogContent>
                    {
                        dialogManagement.shareCode ?
                            <DialogContentText>
                                Insira o endereço email da pessoa com quem deseja partilhar o código {dialogManagement.patientCode}.
                        </DialogContentText> :
                            <DialogContentText>
                                Tem a certeza que pretende remover o paciente com o código {dialogManagement.patientCode} da sua lista?
                        </DialogContentText>
                    }
                    {
                        dialogManagement.shareCode ?
                            <ThemeProvider theme={theme}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Endereço de e-mail"
                                    type="email"
                                    color="secondary"
                                    fullWidth
                                />
                            </ThemeProvider> :
                            <p></p>
                    }
                </DialogContent>
                <DialogActions>
                    <ThemeProvider theme={theme}>
                        <Button onClick={() => handleClose(false)} color="secondary">
                            Cancelar
                        </Button>
                        {
                            dialogManagement.shareCode ?
                                <Button onClick={() => handleClose(true)} color="secondary">
                                    Enviar
                            </Button> :
                                <Button onClick={() => handleClose(true)} color="secondary">
                                    Confirmar
                            </Button>
                        }
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </div>
    )
}

