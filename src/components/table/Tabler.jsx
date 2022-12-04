import { Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CveViewer from '../viewer/CveViewer'

const Tabler = ({ que, res, data }) => {
    var [tabs, setTabs] = useState([])
    const [datapack, setDataPack] = useState()
    const [modal_index, setModalIndex] = useState(0)
    const [modal_data, setModalData] = useState({ data: data.vulnerabilities[modal_index] })

    var [open, setOpen] = useState(false)

    useEffect(() => {
        data.vulnerabilities.forEach((row, index) => {
            let my_new_tabs = []
            try {
                my_new_tabs[0] = row.cve.id
                try {
                    my_new_tabs[1] = row.cve.weaknesses[0].description[0].value
                }
                catch (e) {
                    my_new_tabs[1] = "None"
                }

                try {
                    my_new_tabs[2] = row.cve.published
                }
                catch (e) {
                    my_new_tabs[2] = "None"

                }

                try {
                    my_new_tabs[3] = row.cve.lastModified
                }
                catch (e) {
                    my_new_tabs[3] = "None"
                }

                try {
                    my_new_tabs[4] = row.cve.metrics.cvssMetricV2[0].cvssData.baseScore
                }
                catch (e) {
                    my_new_tabs[4] = "None"
                }

                try {
                    my_new_tabs[5] = row.cve.metrics.cvssMetricV2[0].cvssData.authentication
                }
                catch (e) {
                    my_new_tabs[5] = "None"
                }

                try {
                    my_new_tabs[6] = row.cve.metrics.cvssMetricV30[0].cvssData.attackVector
                    if (my_new_tabs[6] === "") {
                        my_new_tabs[6] = "None"
                    }
                }
                catch (e) {
                    my_new_tabs[6] = "None"
                }

                try {
                    if (row.cve.configurations[0].nodes[0].cpeMatch[0].vulnerable) {
                        my_new_tabs[7] = "True"
                    }
                    else {
                        my_new_tabs[7] = "False"
                    }
                }

                catch (e) {
                    my_new_tabs[7] = "None"
                }
                let datas = tabs
                datas.push(my_new_tabs)
                setTabs(datas)
            }
            catch (e) {

            }
        });

        setDataPack(tabs.map((row, index) => (
            <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                onClick={() => {
                    setModalIndex(index)
                    setOpen(true)
                }}
            >
                <TableCell align="right">{index}</TableCell>
                <TableCell component="th" scope="row">
                    {row[0]}
                </TableCell>
                <TableCell align="right">{row[1]}</TableCell>
                <TableCell align="right">{row[2]}</TableCell>
                <TableCell align="right">{row[3]}</TableCell>
                <TableCell align="right"><Box sx={{ color: 'black', backgroundColor: 'white', p: '5px', textAlign: 'center' }}>{row[4]}</Box></TableCell>
                <TableCell align="right">{row[5]}</TableCell>
                <TableCell align="right">{row[6]}</TableCell>
                <TableCell align="right">{row[7]}</TableCell>
            </TableRow>
        )))
    }, [])

    useEffect(() => {
        setModalData({ data: data.vulnerabilities[modal_index] })
    }, [modal_index])

    return (
        <Box sx={{ m: '10px' }}>
            <Typography sx={{ fontSize: '20px', fontWeight: "700", mb: '10px' }}>TotalNumber of results for "{que}" is {res}</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '700', fontSize: '16px' }}>id</TableCell>
                            <TableCell sx={{ fontWeight: '700', fontSize: '16px' }}>CVE-Id</TableCell>
                            <TableCell align="right" sx={{ fontWeight: '700', fontSize: '16px' }}>CWE</TableCell>
                            <TableCell align="right" sx={{ fontWeight: '700', fontSize: '16px' }}>Published</TableCell>
                            <TableCell align="right" sx={{ fontWeight: '700', fontSize: '16px' }}>Last-modified</TableCell>
                            <TableCell align="right" sx={{ fontWeight: '700', fontSize: '16px' }}>Base-Score</TableCell>
                            <TableCell align='right' sx={{ fontWeight: '700', fontSize: '16px' }}>authentication</TableCell>
                            <TableCell align='right' sx={{ fontWeight: '700', fontSize: '16px' }}>attackVector</TableCell>
                            <TableCell align='right' sx={{ fontWeight: '700', fontSize: '16px' }}>vulnerable</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datapack}
                    </TableBody>
                </Table>
            </TableContainer>
            <CveViewer open={open} data={modal_data} set_modal={setOpen}></CveViewer>
        </Box>
    )
}

export default Tabler
