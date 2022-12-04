import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Description = ({ data }) => {
    const [tabs, setTabs] = useState([])
    useEffect(() => {
        let row = data.cve.descriptions
        let my_new_tabs = []
        try {
            row.map((ele, index) => {
                my_new_tabs.push(
                    <Typography sx={{ color: 'black', fontWeight: '700', padding: '10px', borderRadius: '7px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' }}>{ele.value}</Typography>
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
                Description
            </Typography>
            {tabs}
        </Box>
    )
}

export default Description
