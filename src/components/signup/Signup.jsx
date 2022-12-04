import { LoginTwoTone, Password, Person, Email, BugReport } from '@mui/icons-material'
import { Button, Input, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import api_url from '../../globs'
import { useState } from 'react'

const Signup = () => {

    const navids = useNavigate()
    const [cooks, setCooks] = useCookies()

    const [my_state, setMyState] = useState({
        name: "none",
        gmail: "none",
        password: "none",
        conf_pass: "none"
    })

    const [erroring, setError] = useState("")
    const [next, setNext] = useState("")

    useEffect(() => {
        document.title = "Signup"
        if (cooks.token) {
            navids('')
        }
    }, [])

    async function signup(ele) {
        setNext("")
        setError("")
        try {
            const req = await axios.post(`${api_url()}signup`, {
                name: my_state.name,
                gmail: my_state.gmail,
                password: my_state.password,
                conf_pass: my_state.conf_pass
            })
            try {
                setError(req.data.e.non_field_errors[0])
                ele.disabled = false
                return
            }
            catch (e) {
                setError(req.data.e)
            }
            setNext(req.data.s)
            navids('/verify_email', { state: { gmail: req.data.g } })
        }
        catch (e) {
            console.log(e);
        }
        ele.disabled = false
    }

    return (
        <Box sx={{ m: 'auto', width: { sm: '300px', xs: '90%' }, mt: { sm: '20px', md: '50px' } }}>
            <div className='buggus'>
                <BugReport sx={{ fontSize: '100px', display: { xs: 'none', sm: 'block' } }}></BugReport>
            </div>
            <Box sx={{ border: '2px solid #272727', borderRadius: '7px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', height: 'fit-content', p: '20px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Typography variant='h5' sx={{ fontWeight: '800', letterSpacing: '1px', fontSize: '30px' }}>
                    Signup Here
                </Typography>
                {erroring !== "" && <div style={{ color: 'tomato', border: '1px solid tomato', borderRadius: '7px', padding: '5px' }}>{erroring}</div>}
                {next !== "" && <div style={{ color: 'green', border: '1px solid green', borderRadius: '7px', padding: '5px' }}>{next}</div>}
                <Input color='darkie' onInput={(ele) => {
                    let stat = my_state
                    stat.name = ele.target.value
                    setMyState(stat)
                }} startAdornment={<Person color='darkie' sx={{ mr: '10px', fontSize: '33px' }}></Person>} placeholder={'your username here'} className="loggers" sx={{ color: 'black', fontSize: '19px', borderBottom: '2px solid black' }}></Input>
                <Input color='darkie' startAdornment={<Email color='darkie' sx={{ mr: '10px', fontSize: '33px' }}></Email>} placeholder={'your Email here'} className="loggers" sx={{ color: 'black', fontSize: '19px', borderBottom: '2px solid black' }} onInput={(ele) => {
                    let stat = my_state
                    stat.gmail = ele.target.value
                    setMyState(stat)
                }}></Input >
                <Input color='darkie' startAdornment={<Password color='darkie' sx={{ mr: '10px', fontSize: '33px' }}></Password>} type={'password'} placeholder={'your password here'} className="loggers" sx={{ color: 'black', fontSize: '19px', borderBottom: '2px solid black' }} onInput={(ele) => {
                    let stat = my_state
                    stat.password = ele.target.value
                    setMyState(stat)
                }}></Input>
                <Input color='darkie' startAdornment={<Password color='darkie' sx={{ mr: '10px', fontSize: '33px' }}></Password>} type={'password'} placeholder={'your confirm password here'} className="loggers" sx={{ color: 'black', fontSize: '19px', borderBottom: '2px solid black' }} onInput={(ele) => {
                    let stat = my_state
                    stat.conf_pass = ele.target.value
                    setMyState(stat)
                }}></Input>
                <Button color='darkie' variant='contained' sx={{ color: 'white' }} onClick={(ele) => {
                    ele.currentTarget.disabled = true
                    signup(ele.currentTarget)

                }}>Signup</Button>
                <Button color='darkie' variant='outlined' sx={{ color: 'tomato', borderColor: 'tomato' }} onClick={() => {
                    navids('/login')
                }}>Login</Button>
            </Box >
        </Box >
    )
}

export default Signup
