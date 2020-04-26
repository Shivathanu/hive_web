import React, { useContext, useState, useEffect } from 'react';
import './PatientReport.css';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import IconButton from '@material-ui/core/IconButton';

import { PatientDashboardContext } from '../PatientDashboardContext'

export default function PatientReport() {

    const [patientInfo/*, setPatientInfo*/] = useContext(PatientDashboardContext);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5} lg={5}>
                    <PresentationTable />
                </Grid>
                <Grid item xs={12} md={5} lg={5}>
                    <DataTable reportData={patientInfo.reportView.months} />
                </Grid>
            </Grid>
        </div>
    )
}

function PresentationTable() {

    const [rows/*, setRows*/] = useState([
        { id: 0, description: "% de redução do nº de dias com cefaleias" },
        { id: 1, description: "Nº de dias com medicação analgésica" },
        { id: 2, description: "Nº de dias medicado com triptanos" },
        { id: 3, description: "Intensidade máxima da cefaleia" },
        { id: 4, description: "Nº de idas a urgências" },
        { id: 5, description: "Nº de dias de abstinência laboral" }
    ])

    return (
        <div>
            <div className="yearSpace"></div>
            <div className="tableContainer">
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell id="infoTableHeader">Some Text</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">{row.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

function DataTable({ reportData }) {

    const [tableData, setTableData] = useState({
        rows: [
            { property: 'percentEvolutionHeadacheDay', data: [] },
            { property: 'painkillerDays', data: [] },
            { property: 'triptanDays', data: [] },
            { property: 'maximumHeadacheIntensity', data: [] },
            { property: 'urgencyServiceVisits', data: [] },
            { property: 'workAbsentDays', data: [] }
        ],
        columns: [],
        displayYear: '2020',
        monthsDefinition: {
            '01': "Janeiro",
            '02': "Fevereiro",
            '03': "Março",
            '04': "Abril",
            '05': "Maio",
            '06': "Junho",
            '07': "Julho",
            '08': "Agosto",
            '09': "Setembro",
            '10': "Outubro",
            '11': "Novembro",
            '12': "Dezembro"
        },
        navigateLeft: true,
        navigateRigth: false,
        rigthLimit: 0,
        leftLimit: 0,
        firstRender: true
    })

    useEffect(() => {
        if (tableData.firstRender) {
            const newTableData={...tableData};

            for (var i = 0; i < newTableData.rows.length; i++) {
                var propertyToFill = newTableData.rows[i].property;
                for (var j = 0; j < reportData.length; j++) {
                    newTableData.rows[i].data[j] = reportData[j][propertyToFill];
                    if (i === 0) {
                        newTableData.columns.push({
                            id: j,
                            description: newTableData.monthsDefinition[reportData[j].month.substring(reportData[j].month.length - 2, reportData[j].month.length)],
                            year: reportData[j].month.substring(0, 4)
                        })
                    }
                }
            }

            var years = newTableData.columns.map(x => x.year)
            var lastThreeMonthYears = (years.length >= 3) ? years.slice(years.length - 3, years.length) : years;
            var yearsWoDuplicate = lastThreeMonthYears.filter((a, b) => lastThreeMonthYears.indexOf(a) === b);
            newTableData.displayYear = (yearsWoDuplicate.length === 1) ? yearsWoDuplicate[0] : yearsWoDuplicate[0] + "/" + yearsWoDuplicate[1];
            newTableData.leftLimit = newTableData.columns.length - 3;
            newTableData.rigthLimit = newTableData.columns.length;
            newTableData.firstRender=false;

            setTableData(newTableData)
        } 
    }, [reportData, tableData]);


    function monthLeft() {
        if (tableData.leftLimit !== 0) {
            const newValues = {...tableData};
            newValues.leftLimit = tableData.leftLimit - 1;
            newValues.rigthLimit =  tableData.rigthLimit - 1;

            validateArrows(newValues);
        }
    }

    function monthRight() {
        if (tableData.rigthLimit !== tableData.columns.length) {
            const newValues = {...tableData};
            newValues.leftLimit = tableData.leftLimit + 1;
            newValues.rigthLimit =  tableData.rigthLimit + 1;

            validateArrows(newValues);
        }
    }

    function validateArrows(newValues) {
        if (newValues.leftLimit === 0) {
            newValues.navigateLeft = false;
            newValues.navigateRigth = true;
        } else if (newValues.rigthLimit === tableData.columns.length) {
            newValues.navigateLeft = true;
            newValues.navigateRigth = false;
        } else {
            newValues.navigateLeft = true;
            newValues.navigateRigth = true;
        }

        var years = newValues.columns.map(x => x.year)
        var lastThreeMonthYears = (years.length >= 3) ? years.slice(newValues.leftLimit, newValues.rigthLimit) : years;
        var yearsWoDuplicate = lastThreeMonthYears.filter((a, b) => lastThreeMonthYears.indexOf(a) === b);
        newValues.displayYear = (yearsWoDuplicate.length === 1) ? yearsWoDuplicate[0] : yearsWoDuplicate[0] + "/" + yearsWoDuplicate[1];

        setTableData(newValues)
    }

    return (
        <div>
            <div className="yearSpace"><span>{tableData.displayYear}</span></div>
            <div className="tableContainer">
                <div className="arrow">
                    <IconButton onClick={() => monthLeft()} disabled={!tableData.navigateLeft} size="small"><ArrowLeftIcon /></IconButton>
                </div>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {tableData.columns.slice(tableData.leftLimit, tableData.rigthLimit).map((column) =>
                                    <TableCell align="center" key={column.id} style={{ width: '33%' }}>
                                        {column.description}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.rows.map((row, i) => (
                                <TableRow key={row.property + i}>
                                    {row.data.slice(tableData.leftLimit, tableData.rigthLimit).map((content) => (
                                        <TableCell align="center">{content}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="arrow">
                    <IconButton onClick={() => monthRight()} disabled={!tableData.navigateRigth} size="small"><ArrowRightIcon /></IconButton>
                </div>
            </div>
        </div>
    )
}