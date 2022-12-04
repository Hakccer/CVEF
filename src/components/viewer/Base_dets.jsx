import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useMemo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Base_dets = ({ data }) => {
    const [tabs, setTabs] = useState([])
    useEffect(() => {
        let row = data
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
            setTabs([...my_new_tabs])
        }
        catch (e) {

        }
    }, [data])

    return (
        <Box sx={{ p: '25px' }}>
            <Typography sx={{ fontSize: '25px', fontWeight: '700' }}>
                Basic Details
            </Typography>
            <Box sx={{ mt: '13px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        CVE-Id:
                    </Typography>
                    <Typography>
                        {tabs[0]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        CWE-Id:
                    </Typography>
                    <Typography>
                        {tabs[1]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        Published:
                    </Typography>
                    <Typography>
                        {tabs[2]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        Last-Modified:
                    </Typography>
                    <Typography>
                        {tabs[3]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        Base-Score:
                    </Typography>
                    <Typography>
                        {tabs[4]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        Authentication:
                    </Typography>
                    <Typography>
                        {tabs[5]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        Attack-Vector:
                    </Typography>
                    <Typography>
                        {tabs[6]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        Vulnerable:
                    </Typography>
                    <Typography>
                        {tabs[7]}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Base_dets
