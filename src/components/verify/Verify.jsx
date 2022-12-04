import { LoginTwoTone, Password, Person, Email, BugReport } from '@mui/icons-material'
import { Button, Input, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import api_url from '../../globs'
import { useState } from 'react'
import '../login/Login.css'

const Verify = () => {

    const navids = useNavigate()
    const [cooks, setCooks] = useCookies()
    const location = useLocation()
    const [my_state, setMyState] = useState("")

    const [erroring, setError] = useState("")
    const [next, setNext] = useState("")

    useEffect(() => {
        if (!location.state) {
            navids('/')
        }
        document.title = "Verify Email"
    }, [])

    async function verify(datu) {
        setNext("")
        setError("")
        try {
            const datas = await axios.post(`${api_url()}verify`, {
                'otp': my_state,
                'gmail': location.state.gmail,
                'work': datu
            })
            console.log(datas.data);
            try {
                if (datas.data.s) {
                    navids('/login')
                }
                else {
                    setError(datas.data.e)
                }
            }
            catch (e) {
                location.state = null
                navids('/login')
            }
        }
        catch (e) {
            return
        }
    }

    return (
        <Box sx={{ m: 'auto', width: '300px', mt: '50px' }}>
            <div className='buggus'>
                <BugReport sx={{ fontSize: '100px' }}></BugReport>
            </div>
            <Box sx={{ border: '2px solid #272727', borderRadius: '7px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', height: 'fit-content', p: '20px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Typography variant='h5' sx={{ fontWeight: '800', letterSpacing: '1px', fontSize: '30px' }}>
                    Verify email here
                </Typography>
                {(location.state) && <Typography sx={{ color: 'black', fontWeight: '700' }}>
                    we have sended an 5 minutes verification otp to {location.state.gmail}
                </Typography>}
                <Input color='darkie' onInput={(ele) => {
                    setMyState(ele.target.value)
                }} type={"number"} startAdornment={<Person color='darkie' sx={{ mr: '10px', fontSize: '33px' }}></Person>} placeholder={'6 digits otp here'} className="loggers" sx={{ color: 'black', fontSize: '19px', borderBottom: '2px solid black' }}></Input>
                <Button color='darkie' variant='contained' sx={{ color: 'white' }} onClick={() => {
                    verify('')
                }}>verify</Button>
                <Button color='darkie' variant='outlined' onClick={() => {
                    verify('resender')
                }}>Resend</Button>
                {erroring !== "" && <div style={{ color: 'tomato', border: '1px solid tomato', borderRadius: '7px', padding: '5px' }}>{erroring}</div>}
            </Box >
        </Box>
    )
}

export default Verify
