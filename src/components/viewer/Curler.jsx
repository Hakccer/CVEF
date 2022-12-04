import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Curler = ({ data }) => {
    const [tabs, setTabs] = useState([])
    useEffect(() => {
        let row = data.cve.references
        let my_new_tabs = []
        try {
            row.map((ele, index) => {
                my_new_tabs.push(
                    <Typography sx={{ color: 'white', backgroundColor: 'black', p: '10px', borderRadius: '5px', fontWeight: '700', letterSpacing: '.5px' }}>{index + 1}. {ele.source} {'--->'} {ele.url}</Typography>
                )
            })
            setTabs([...my_new_tabs])
        }
        catch (e) {

        }
    }, [data])
    return (
        <Box sx={{ p: '23px' }}>
            <Typography sx={{ fontSize: '25px', fontWeight: '700' }}>
                References
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mt: '15px' }}>
                {tabs}
            </Box>
        </Box>
    )
}

export default Curler
