import { Box, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Advanced_dets = ({ data }) => {
    const [tabs, setTabs] = useState([])
    useEffect(() => {
        let row = data
        let my_new_tabs = []
        try {
            my_new_tabs[0] = row.cve.metrics.cvssMetricV2[0].cvssData.accessComplexity
            try {
                my_new_tabs[1] = row.cve.metrics.cvssMetricV2[0].cvssData.accessVector
            }
            catch (e) {
                my_new_tabs[1] = "None"
            }

            try {
                my_new_tabs[2] = row.cve.metrics.cvssMetricV2[0].cvssData.availabilityImpact
            }
            catch (e) {
                my_new_tabs[2] = "None"

            }

            try {
                my_new_tabs[3] = row.cve.metrics.cvssMetricV2[0].cvssData.baseSeverity
            }
            catch (e) {
                my_new_tabs[3] = "None"
            }

            try {
                my_new_tabs[4] = row.cve.metrics.cvssMetricV2[0].cvssData.confidentialityImpact
            }
            catch (e) {
                my_new_tabs[4] = "None"
            }

            try {
                my_new_tabs[5] = row.cve.metrics.cvssMetricV2[0].cvssData.integrityImpact
            }
            catch (e) {
                my_new_tabs[5] = "None"
            }

            try {
                my_new_tabs[6] = row.cve.metrics.cvssMetricV2[0].impactScore
            }
            catch (e) {
                my_new_tabs[6] = "None"
            }

            try {
                my_new_tabs[7] = row.cve.metrics.cvssMetricV2[0].exploitabilityScore
            }
            catch (e) {
                my_new_tabs[7] = "None"
            }

            try {
                if (row.cve.metrics.cvssMetricV2[0].obtainAllPrivilege) {
                    my_new_tabs[8] = 'True'
                }
                else {
                    my_new_tabs[8] = "False"
                }
            }
            catch (e) {
                my_new_tabs[8] = "None"
            }

            try {
                if (row.cve.metrics.cvssMetricV2[0].obtainUserPrivilege) {
                    my_new_tabs[9] = 'True'
                }
                else {
                    my_new_tabs[9] = "False"
                }
            }
            catch (e) {
                my_new_tabs[9] = "None"
            }
            setTabs([...my_new_tabs])
        }
        catch (e) {

        }
    }, [data])
    return (
        <Box sx={{ p: '23px' }}>
            <Typography sx={{ fontSize: '25px', fontWeight: '700' }}>
                Advanced Details
            </Typography>
            <Box sx={{ mt: '13px', display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: '700' }}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        accessComplexity:
                    </Typography>
                    <Typography>
                        {tabs[0]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        accessVector:
                    </Typography>
                    <Typography>
                        {tabs[1]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        availabilityImpact:
                    </Typography>
                    <Typography>
                        {tabs[2]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        baseSeverity:
                    </Typography>
                    <Typography>
                        {tabs[3]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        confidentialityImpact:
                    </Typography>
                    <Typography>
                        {tabs[4]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        integrityImpact:
                    </Typography>
                    <Typography>
                        {tabs[5]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        impactScore:
                    </Typography>
                    <Typography>
                        {tabs[6]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        exploitabilityScore:
                    </Typography>
                    <Typography>
                        {tabs[7]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        obtainAllPrivilege:
                    </Typography>
                    <Typography>
                        {tabs[8]}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography sx={{ color: '#656E7B', fontWeight: '700' }}>
                        obtainUserPrivilege:
                    </Typography>
                    <Typography>
                        {tabs[9]}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Advanced_dets
