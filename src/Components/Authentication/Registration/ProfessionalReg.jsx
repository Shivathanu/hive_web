import React, { Component } from 'react';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import login_registo from '../../../Resources/login_registo.png';
import './ProfessionalReg.css';
import axios from 'axios';
import * as API from '../../../Configs/API';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const classes = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '20ch'
    },
}))



class ProfessionalReg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerUser: {
                clinicalName: '',
                speciality: '',
                healthCenter: {},
                password: '',
                confirmPassword: ''
            },
            healthCenterOptions: []
        }
    }

    passwordIsValid = true;

    async componentDidMount() {
        const servicePath = `${API.apiPath}api/healthcenters`;
        const data = await fetch(servicePath);
        const healthCenterItems = await data.json();
        this.setState({
            healthCenterOptions: healthCenterItems
        });
    }

    handleClickShowPassword = () => {
        this.state({ showPassword: !this.state.showPassword });
    }


    handleChange = (e) => {
        if (e.target.id.includes('healthCenter')) {
            var splitedArray = e.target.id.split('-');
            this.setState({
                registerUser: {
                    ...this.state.registerUser,
                    healthCenter: this.state.healthCenterOptions[splitedArray[splitedArray.length - 1]]
                }
            })
        } else {
            this.setState({
                registerUser: {
                    ...this.state.registerUser,
                    [e.target.name]: e.target.value
                }
            });
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const registerUser = this.state.registerUser;
        if (registerUser.confirmPassword === registerUser.password) {
            axios.post(`${API.apiPath}api/professionals`, registerUser).then(res => {
                if (res.status === 200) {
                    this.props.changeSessionState({
                        isLoggedIn: true,
                        professionalContext: res.data
                    })
                }
            })
        } else {
            this.passwordIsValid = false;
            this.handleChange(e);
        }
    }

    render() {
        const {
            registerUser: {
                clinicalName,
                speciality,
                healthCenter,
                password,
                confirmPassword
            },
            healthCenterOptions = []
        } = this.state;


        const theme = createMuiTheme({
            palette: {
                secondary: {
                    // This is green.A700 as hex.
                    main: '#0f7484',
                },
            },
        });


        return (
            <div className="main">
                <div className="imagem">
                    <img className="image_to" src={login_registo} alt="imageView" />
                </div>
                <div className="form">
                    <form onSubmit={this.handleSubmit} validate='true'>
                        <ThemeProvider theme={theme}>
                            <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel color="secondary" htmlFor="clinicalName" required>Utilizador</InputLabel>
                                <OutlinedInput
                                    required
                                    value={clinicalName}
                                    name='clinicalName'
                                    type='text'
                                    onChange={this.handleChange}
                                    labelWidth={90}
                                    style={{ borderRadius: '20px', backgroundColor: "#fff" }}
                                    color="secondary" />
                            </FormControl>
                            <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="speciality" color="secondary" required>Especialidade</InputLabel>
                                <OutlinedInput
                                    required
                                    value={speciality}
                                    name='speciality'
                                    type='text'
                                    onChange={this.handleChange}
                                    labelWidth={120}
                                    style={{ borderRadius: '20px', backgroundColor: "#fff" }}
                                    color="secondary" />
                            </FormControl>
                            <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <Autocomplete
                                    id="healthCenter"
                                    onChange={this.handleChange}
                                    options={healthCenterOptions}
                                    value={healthCenter}
                                    getOptionLabel={(option) => option.name ? option.name : ''}
                                    color="secondary"
                                    renderInput={(params) => <TextField required {...params} color="secondary" label="Centro hospitalar" variant="outlined" />}
                                />
                            </FormControl>
                            <FormControl error={!this.passwordIsValid} fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="password" color="secondary" required>Password</InputLabel>
                                <OutlinedInput
                                    required
                                    value={password}
                                    type='password'
                                    name='password'
                                    onChange={this.handleChange}
                                    labelWidth={93}
                                    style={{ borderRadius: '20px', backgroundColor: "#fff" }}
                                    color="secondary" />
                            </FormControl>
                            <FormControl error={!this.passwordIsValid} fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="confirmPassword" color="secondary" required>Confirmar password</InputLabel>
                                <OutlinedInput
                                    required
                                    value={confirmPassword}
                                    type='password'
                                    name='confirmPassword'
                                    onChange={this.handleChange}
                                    labelWidth={170}
                                    style={{ borderRadius: '20px', backgroundColor: "#fff" }}
                                    color="secondary" />
                            </FormControl>
                            <div className="buttonWrapper">
                                <Button type="submit"
                                    variant="contained"
                                    size="medium"
                                    color="secondary"
                                    className="registerProfessional">CRIAR</Button>
                            </div>
                        </ThemeProvider>
                    </form>
                </div>
            </div>
        )
    }
}



export default withStyles({ classes: true })(ProfessionalReg);