import { Box, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import api_url from '../../globs'
import HomeFirst from './HomeFirst'
import HomeSearch from './HomeSearch'

const Home = () => {
    const [read_cooks, add_cooks] = useCookies()
    const navigate = useNavigate()
    const [freak, setFreak] = useState(<Box sx={{ margin: 'auto', width: '200px', display: 'flex', flexDirection: 'column', gap: '17px', mt: '70px' }}>
        <CircularProgress sx={{ color: 'black', ml: 'calc(50% - 20px)' }}></CircularProgress>
        <Typography sx={{ textAlign: 'center', fontWeight: '700', fontSize: '15px' }}>the process can take longer so please wait</Typography>
    </Box>)
    const [users, setUsers] = useState({
        name: '',
        email: '',
        cve_data: null
    })

    useEffect(() => {
        document.title = "Home"
        if (!read_cooks.token) {
            navigate('/login')
        }
        else {
            setTimeout(() => {
                home_data()
            }, 1000)
        }
    }, [])

    function change_freak() {
        setFreak(<HomeSearch user={users} seek={change_freak} freak={setFreak}></HomeSearch>)
    }

    async function home_data() {
        try {
            const get_user_data = await axios.get(`${api_url()}`, {
                'headers': {
                    'Authorization': `Token ${read_cooks.token}`
                }
            })
            let use_temp = users
            use_temp.name = get_user_data.data.gama.name
            use_temp.email = get_user_data.data.gama.email
            use_temp.cve_data = get_user_data.data.gama.data
            setUsers(use_temp)
            setFreak(<HomeFirst user={users} seek={change_freak}></HomeFirst>)
        }
        catch (e) {
            setTimeout(() => {
                home_data()
            }, 3000)
        }
    }

    return (
        <div>
            {freak}
        </div>
    )
}

export default Home
