import { Button, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useContext, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { MeContext } from '../../context/MeContext';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import axios from 'axios';
export const Login = () => {

    const [sowPassword, SetShowPassword] = useState(false)
    const navigate = useNavigate();


    const {setToken} = useContext(AuthContext);
    const {setMe} = useContext(MeContext);

    const schema = Yup.object({
        email: Yup.string().email("Invalid Format").required("Required"),
        password: Yup.string().min(3, "Min 3").max(8, "Max").required("Required"),
    }).required();

    const { register, handleSubmit, formState:{ errors, isValid } } = useForm({
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema)
    });

    const onPost = (data) => {
        axios.post("http://localhost:8080/login", data).then(data => {
                if(data.status === 200){
                    setMe(data.data.user)
                    setToken(data.data.accessToken)
                    navigate("/")
                }
            }).catch(error => console.log(error))
    }
    return <>
        <Paper sx={{width: "50%", marginX: "auto", marginTop: 15, padding: "32px", borderRadius: "10px"}}>
            <Typography textAlign="center" variant='h3' component="h2" gutterBottom>
                Login
            </Typography>

            <form onSubmit={handleSubmit(onPost)}>
                <Stack spacing={2}>
                    <TextField type="email" label="Email" helperText={errors.email?.message} {...register("email")}/>
                    <TextField 
                        label="Password" 
                        type={sowPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment onClick={() => {
                                    SetShowPassword(!sowPassword)
                                }} position='end'>
                                    <Visibility sx={{cursor: "pointer"}}/>
                                </InputAdornment>
                            )
                        }}
                        helperText={errors.password?.message} {...register("password")}
                    />
                </Stack>

                <Typography variant='p' sx={{display: "blcok", marginTop: "25px",textAlign: "center"}} component="p">
                    If you don't have an account     
                    <Typography variant='a' href="#" onClick={(evt) => {
                        evt.preventDefault();
                        navigate("/register");
                    }} component="a" sx={{marginLeft: "10px"}}>Registration</Typography>
                </Typography>

                <Button type="submit" variant='contained' sx={{display: 'inline-block', marginTop: "25px"}} color="success">Submit</Button>
            </form>
        </Paper>
    </>
}
