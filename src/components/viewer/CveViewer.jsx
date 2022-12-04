import { Close } from '@mui/icons-material'
import { Box, Button, Modal, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import api_url from '../../globs'
import Advanced_dets from './Advanced_dets'
import Base_dets from './Base_dets'
import Curler from './Curler'
import Description from './Description'

const CveViewer = ({ open, data, set_modal }) => {

    const [mod_cont, setModCont] = useState(<Base_dets data={data.data}></Base_dets>)
    const [cooks, setCooks] = useCookies()

    useEffect(() => {
        console.log(data);
        post_data()
        setModCont(<Base_dets data={data.data}></Base_dets>)
    }, [data])

    async function post_data() {
        const poter = await axios.post(`${api_url()}`, {
            id: data.data.cve.id,
            jsof: data.data
        }, {
            headers: {
                Authorization: `Token ${cooks.token}`
            }
        })
        console.log(poter.data);
    }

    return (
        <Box>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={open}
                sx={{ backgroundColor: { 'xs': 'white', 'md': 'transparent' } }}
            >
                <Box sx={{
                    backgroundColor: 'white', width: { 'xs': '100%', 'md': '80%' }, height: { 'xs': '100%', 'md': '80%' }, m: 'auto', mt: { 'xs': '0px', 'md': '100px' }, borderRadius: { 'xs': '0px', 'md': '7px' }, display: 'flex',
                    flexDirection: { 'xs': 'column-reverse', 'md': 'row' }
                }}>
                    <Box sx={{ p: '25px', display: 'flex', flexDirection: 'column', gap: '15px', color: 'black', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', height: '100%', boxSizing: 'border-box', width: { xs: '100%', md: "300px" } }}>
                        <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                            set_modal(false)
                        }}>
                            <Close></Close>
                        </Typography>
                        <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                            setModCont(<Base_dets data={data.data}></Base_dets>)
                        }}>
                            Basic Details
                        </Typography>
                        <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                            setModCont(<Advanced_dets data={data.data}></Advanced_dets>)
                        }}>
                            Advanced Details
                        </Typography >
                        <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                            console.log(data.data);
                            setModCont(<Description data={data.data}></Description>)
                        }}>
                            Description
                        </Typography>
                        <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                            setModCont(<Curler data={data.data}></Curler>)
                        }}>
                            References
                        </Typography>
                    </Box>
                    <Box sx={{ overflowY: 'auto', width: { xs: '100%', md: 'fit-content' } }}>
                        {mod_cont}
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default CveViewer
