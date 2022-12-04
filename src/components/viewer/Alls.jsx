import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Advanced_dets from './Advanced_dets'
import Base_dets from './Base_dets'
import Curler from './Curler'
import Description from './Description'

const Alls = (data, set_modal) => {

    const [mod_cont, setModCont] = useState(<Base_dets data={data.data}></Base_dets>)

    return (
        <Box>
            <Box sx={{ p: '25px', display: 'flex', flexDirection: 'column', gap: '15px', color: 'black', borderRight: '1px solid black', height: '100%' }}>
                <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                    set_modal(false)
                }}>
                    Back
                </Typography>
                <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                    setModCont(<Base_dets data={data.data}></Base_dets>)
                }}>
                    Basic Details
                </Typography>
                <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                    setModCont(<Advanced_dets></Advanced_dets>)
                }}>
                    Advanced Details
                </Typography >
                <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                    setModCont(<Description></Description>)
                }}>
                    Descrption
                </Typography>
                <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                    setModCont(<Curler></Curler>)
                }}>
                    URL's of cve
                </Typography>
            </Box>
            <Box>
                {mod_cont}
            </Box>
        </Box>
    )
}

export default Alls
