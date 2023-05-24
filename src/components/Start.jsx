
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Start ({data, setData}){

    console.log(data);
    return(
        <Box component={motion.div} 
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }} 
        initial={{opacity:0,scale:0}} 
        animate={{opacity:1, scale:1}} 
        transition={{duration:1}}
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter:10,
            width:700,
            borderRadius:'10px'
        }}>
            <Box sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            gap: 5,
            width:'100%',
            m:'50px 50px 50px 50px',
            color:'black'
            }}>
                <Typography>
                    Explica la forma en la que quieres que la IA responda a tus preguntas, por ejemplo: 'Hablame como si fuera un ingeniero nuclear con 10 años de experiencia'
                </Typography>
                <Typography>
                Explain the way you want the AI to respond to your questions, for example: 'Talk to me as if you were a nuclear engineer with 10 years of experience'
                </Typography>
                <Box sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <TextField
                        onChange={(e)=> setData(e.target.value)}
                        id="outlined-password-input"
                        label="Content"
                        autoComplete="current-password"
                        />
                    <Button><Link to={'/chat'}>GO</Link></Button>
                </Box>
                
            </Box>
        </Box>
        
        
    )
}

export default Start;