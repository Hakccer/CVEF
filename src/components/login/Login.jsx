import { Box, Button, Input, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { BugReport, LoginTwoTone, Password } from '@mui/icons-material'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import api_url from '../../globs'

const Login = () => {

    const navids = useNavigate()
    const [error, setError] = useState("")
    const [cooks, setCooks] = useCookies()

    const [my_state, setMyState] = useState({
        gmail: "none",
        password: "none"
    })

    useEffect(() => {
        document.title = "Login"
        if (cooks.token) {
            navids('/')
        }
    })

    async function logined() {
        setError("")
        try {
            const req = await axios.post(`${api_url()}login`, {
                gmail: my_state.gmail,
                password: my_state.password
            })
            if (req.data.e) {
                try {
                    setError(req.data.e.non_field_errors[0])
                }
                catch (e) {
                    setError(req.data.e)
                }
                return
            }
            setCooks('token', req.data.token, { path: '/' })
            navids('')
        }
        catch (e) {
            return
        }
    }

    return (
        <Box display={'flex'}>
            <Box sx={{ width: '500px', height: 'calc(100vh - 200px)', display: { xs: 'none', md: 'block' }, backgroundColor: '#272727', paddingLeft: '20px', paddingRight: '20px', paddingTop: '12%' }}>
                <div style={{}}>
                    <h1 style={{ color: 'white' }}>Welcome to our login page</h1>
                    <p style={{ color: 'white', lineHeight: '27px', fontSize: '20px' }} >So Here we are the C-V-E Details Finder you will get the best user experience while finding the cve's over here just create an account login yourself in that account and start gettting the details well there is not everything i can say right now about the product but it is useful user friendly</p>
                    <Box bgcolor={'white'} borderRadius={'7px'}>
                        <div className='logs'><LoginTwoTone fontSize='100px'></LoginTwoTone></div>
                    </Box>
                </div>
            </Box>
            <Box sx={{ m: 'auto', width: { xs: '90%', md: '300px' }, mt: { xs: '50px' } }}>
                <div className='buggus'>
                    <BugReport sx={{ fontSize: '100px' }}></BugReport>
                </div>
                <Box sx={{ border: '2px solid #272727', borderRadius: '7px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', height: 'fit-content', p: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Typography variant='h5' sx={{ fontWeight: '800', letterSpacing: '1px', fontSize: '30px' }}>
                        Login Here
                    </Typography>
                    {error !== "" && <div style={{ color: 'tomato', border: '1px solid tomato', borderRadius: '7px', padding: '5px' }}>{error}</div>}
                    <Input color='darkie' startAdornment={<LoginTwoTone color='darkie' sx={{ mr: '10px', fontSize: '33px' }}></LoginTwoTone>} placeholder={'your email-id here'} className="loggers" sx={{ color: 'black', fontSize: '19px', borderBottom: '2px solid black' }} onInput={(ele) => {
                        let dats = my_state
                        dats.gmail = ele.target.value
                        setMyState(dats)
                    }}></Input>
                    <Input color='darkie' startAdornment={<Password color='darkie' sx={{ mr: '10px', fontSize: '33px' }}></Password>} type={'password'} placeholder={'your password blackhere'} className="loggers" sx={{ color: 'black', fontSize: '19px', borderBottom: '2px solid black' }} onInput={(ele) => {
                        let dats = my_state
                        dats.password = ele.target.value
                        setMyState(dats)
                    }}></Input>
                    <Button color='darkie' variant='contained' sx={{ color: 'white' }} onClick={() => {
                        logined()
                    }}>Login</Button>
                    <Button color='darkie' variant='outlined' sx={{ color: 'tomato', borderColor: 'tomato' }} onClick={() => {
                        navids('/signup')
                    }}>Signup</Button>
                </Box>
            </Box>
        </Box >
    )
}

export default Login