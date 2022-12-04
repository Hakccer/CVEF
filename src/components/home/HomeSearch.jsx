import { Box, Button, CircularProgress, Input, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../login/Login.css'
import { Style } from '@mui/icons-material'
import { useState } from 'react'
import axios from 'axios'
import api_url from '../../globs'
import { useCookies } from 'react-cookie'
import Tabler from '../table/Tabler'

const HomeSearch = ({ freak, user, seek }) => {

    const navids = useNavigate()

    const [sark, setSark] = useState(
        <h3 style={{ textAlign: 'center' }}>Please Search something in the data field</h3>
    )
    const [query, setQuery] = useState("")
    const [error, setError] = useState("")

    const [cooks, setCooks] = useCookies()

    async function get_cves() {
        try {
            const dates = await axios.get(`${api_url()}get_cves?query=${query}`, {
                headers: {
                    Authorization: `Token ${cooks.token}`
                }
            })
            if (dates.data.e == "no") {
                setSark(<Tabler res={parseInt(JSON.parse(dates.data.data).totalResults).toLocaleString()} que={query} data={JSON.parse(dates.data.data)}></Tabler>)
            }
            else {
                setSark(<h3 style={{ textAlign: 'center' }}>{dates.data.e}</h3>)
            }
        }
        catch (e) { }
    }

    return (
        <Box>
            <Box sx={{ bgcolor: '#272727', color: 'white', padding: '15px' }}>
                <Typography sx={{ fontSize: '25px', fontWeight: '700' }}>Search C-V-E here</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Input startAdornment={<Style sx={{ mr: '7px' }}></Style>} placeholder='enter CVE-Id or any keyword arguements here' inputProps={{ className: 'for_gods' }} sx={{ p: '5px' }} onInput={(ele) => {
                        setSark(<h3 style={{ textAlign: 'center' }}>Please Search something in the data field</h3>)
                        setQuery(ele.target.value)
                    }}></Input>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Button variant='contained' sx={{ bgcolor: 'white', color: 'black' }} onClick={() => {
                            setSark(<Box sx={{ margin: 'auto', width: '200px', display: 'flex', flexDirection: 'column', gap: '17px', mt: '70px' }}>
                                <CircularProgress sx={{ color: 'black', ml: 'calc(50% - 20px)' }}></CircularProgress>
                                <Typography sx={{ textAlign: 'center', fontWeight: '700', fontSize: '15px' }}>the process can take longer so please wait</Typography>
                            </Box>)
                            get_cves()
                        }}>Search</Button>
                        <Button variant='outlined' sx={{ border: '1px solid white', color: 'white' }} onClick={() => {
                            navids('/login')
                        }}>Go Back</Button>
                    </Box>
                </Box>
            </Box >
            <Box>
                {sark}
            </Box>
        </Box >
    )
}

export default HomeSearch
