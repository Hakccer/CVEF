import { BugReport, Style, Search, SentimentVeryDissatisfied } from '@mui/icons-material'
import { Avatar, Box, Button, Input, LinearProgress, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import api_url from '../../globs'
import Tabler from '../table/Tabler'
import CveViewer from '../viewer/CveViewer'
import DasherRen from './DasherRen'

const HomeFirst = ({ user, seek }) => {
    const [query, setQuery] = useState()
    const [error, setError] = useState(<Typography sx={{ color: 'white', mt: '10px', fontWeight: '700' }}>If you enter keyword we will give first result</Typography>)
    const [modal_data, setModalData] = useState("none")
    var [open, setOpen] = useState(false)
    const [cooks, setCooks] = useCookies()

    async function get_cves() {
        setError(<LinearProgress color='wheater' sx={{ mt: '15px' }} />)
        const dates = await axios.get(`${api_url()}get_cves?query=${query}`, {
            headers: {
                Authorization: `Token ${cooks.token}`
            }
        })
        try {
            if (dates.data.e == "no") {
                console.log(dates.data.e);
                setError()
                setModalData({ data: JSON.parse(dates.data.data).vulnerabilities[0] })
                setOpen(true)
            }
            else {
                console.log(dates.data.e);
                setError(<h3 style={{ textAlign: 'center', color: 'white' }}>{dates.data.e}</h3>)
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <Box sx={{ m: '20px' }}>
            <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }} alignItems={'center'} justifyContent={'space-around'}>
                <Box sx={{ flex: '1', width: { xs: '100%' }, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', height: '200px', borderRadius: '10px' }}>
                    <Avatar sx={{ bgcolor: 'black', color: 'white', m: 'auto', mt: '7%', width: '70px', height: '70px', mb: '10px' }}>{user.name.slice(0, 1).toUpperCase()}</Avatar>
                    <Typography sx={{ color: 'black', m: 'auto', width: 'fit-content' }}>{user.name}</Typography>
                    <Typography sx={{ color: 'black', fontWeight: '700', m: 'auto', mb: '7%', width: 'fit-content', fontSize: '20px' }}>{user.email}</Typography>
                </Box >
                <Box sx={{ flex: '1', width: { xs: '100%' }, cursor: 'pointer', display: 'flex', flexDirection: 'column', bgcolor: 'black', height: '200px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', borderRadius: '10px' }} onClick={() => {
                    seek()
                }}>
                    <Search bgcolor={'black'} sx={{ mt: '7%', color: 'white', ml: 'calc(50% - 50px)', fontSize: '100px' }}></Search>
                    <Typography sx={{ fontSize: '23px', color: 'white', mb: '7%', fontWeight: '700', textAlign: 'center' }}>Click Me to search CVE's</Typography>
                </Box>
                <Box sx={{ flex: '1', width: { xs: '100%' }, display: 'flex', flexDirection: 'column', bgcolor: 'black', height: '200px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', borderRadius: '10px' }}>
                    <Box padding={'20px'}>
                        <Typography sx={{ fontSize: '23px', color: 'white', mb: '7%', fontWeight: '700', textAlign: 'center' }}>
                            Fast-search
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Input startAdornment={<Style sx={{ pr: '10px' }}></Style>} sx={{ width: '100%', pb: '3px' }} placeholder='enter only cve-id here or if you enter keywords or blank than we will give you latest result' onInput={(ele) => {
                                setQuery(ele.target.value)
                            }}></Input>
                            <Button variant='outlined' sx={{ borderColor: 'white', color: 'white' }} onClick={() => {
                                get_cves()
                            }}>Get</Button>
                        </Box>
                        {error}
                    </Box>
                </Box>
            </Box >
            <Box sx={{ mt: '20px', borderRadius: '10px', border: '3px solid black', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', p: '20px' }}>
                <Typography variant='h4' sx={{ fontWeight: '700', borderBottom: '2px solid black', pb: '10px' }}>
                    Dashboard
                </Typography>
                {(user.cve_data.length == 0) ? <Box>
                    <Box sx={{ m: 'auto', width: 'fit-content' }}>
                        <SentimentVeryDissatisfied sx={{ fontSize: '100px', ml: 'calc(50% - 50px)' }}></SentimentVeryDissatisfied>
                        <Typography sx={{ fontWeight: '700', fontSize: '23px' }}>
                            You have not viewed any CVE yet <br></br>(Refresh page for if you have viewed any cve)
                        </Typography>
                    </Box>
                </Box> : <Box>
                    <Typography sx={{ color: 'black', fontSize: '17px', mt: '10px', fontWeight: '700' }}>If you are not able to see new records refresh page {"( and to view complete CVE click it )."}</Typography>
                    <DasherRen open={open} set_open={setOpen} mod_setter={setModalData} data={user.cve_data}></DasherRen>
                </Box>}
            </Box>
            <CveViewer open={open} data={modal_data} set_modal={setOpen}></CveViewer>
        </Box>
    )
}

export default HomeFirst