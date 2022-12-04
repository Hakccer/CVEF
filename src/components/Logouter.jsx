import { Box, Button, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import api_url from '../globs'

const Logouter = () => {

    const [cooks, setCooks, removeCooks] = useCookies()
    const navids = useNavigate()
    const [logout_view, setLogoutView] = useState(<Box sx={{ margin: 'auto', width: '200px', display: 'flex', flexDirection: 'column', gap: '17px', mt: '70px' }}>
        <CircularProgress sx={{ color: 'black', ml: 'calc(50% - 20px)' }}></CircularProgress>
        <Typography sx={{ textAlign: 'center', fontWeight: '700', fontSize: '15px' }}>Logging Out {"(If it takes so much time retry again)"}</Typography>
    </Box>)

    useEffect(() => {
        if (!cooks.token) {
            navids('/login')
        }
        else {
            logout_it()
        }
    }, [])

    async function logout_it() {
        const log = await axios.get(`${api_url()}logout`, {
            headers: {
                Authorization: `Token ${cooks.token}`
            }
        })
        try {
            if (log.data.s) {
                removeCooks('token', { path: '/' })
                navids('/login')
            }
            else {
                setLogoutView(<Box sx={{ margin: 'auto', width: '200px', display: 'flex', flexDirection: 'column', gap: '17px', mt: '70px' }}>
                    <CircularProgress sx={{ color: 'black', ml: 'calc(50% - 20px)' }}></CircularProgress>
                    <Typography sx={{ textAlign: 'center', fontWeight: '700', fontSize: '15px' }}>{log.data.e}</Typography>
                </Box>)
            }
        }
        catch (e) {
            setLogoutView(<Box sx={{ margin: 'auto', width: '200px', display: 'flex', flexDirection: 'column', gap: '17px', mt: '70px' }}>
                <CircularProgress sx={{ color: 'black', ml: 'calc(50% - 20px)' }}></CircularProgress>
                <Typography sx={{ textAlign: 'center', fontWeight: '700', fontSize: '15px' }}>{log.data.e}</Typography>
            </Box>)
        }

    }

    return (
        <Box>
            {logout_view}
        </Box>
    )
}

export default Logouter