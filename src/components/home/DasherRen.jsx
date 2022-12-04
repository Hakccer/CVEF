import { Box, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'

const DasherRen = ({ open, set_open, mod_setter, data }) => {
    useEffect(() => {
        console.log(JSON.parse(data[0].jsof.cve_data).jsof.cve);
    }, [])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', mt: '30px' }}>
            {data.map((ele, index) => {
                return <Box sx={{ p: '7px', borderRadius: '5px', boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;', display: 'flex', gap: '50px', cursor: 'pointer' }} onClick={() => {
                    mod_setter({ data: JSON.parse(ele.jsof.cve_data).jsof })
                    set_open(true)
                }}>
                    <Box sx={{ ml: '10px', display: { xs: 'none', sm: 'block' } }}>
                        <Typography sx={{ fontSize: '20px', color: '#656E7B', fontWeight: '700' }}>
                            ID
                        </Typography>
                        <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>
                            {index + 1}
                        </Typography >
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '20px', color: '#656E7B', fontWeight: '700' }}>
                            CVE-Id
                        </Typography>
                        <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>
                            {ele.cve_id}
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Typography sx={{ fontSize: '20px', color: '#656E7B', fontWeight: '700' }}>
                            Seen Date
                        </Typography>
                        <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>
                            {ele.date_c}
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Typography sx={{ fontSize: '20px', color: '#656E7B', fontWeight: '700' }}>
                            Seen Time
                        </Typography>
                        <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>
                            {ele.time_c}
                        </Typography>
                    </Box>
                </Box>
            })}
        </Box >
    )
}

export default DasherRen
