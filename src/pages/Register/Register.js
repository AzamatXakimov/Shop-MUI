import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useContext, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import { MeContext } from '../../context/MeContext';

export const Register = () => {

    const [sowPassword, SetShowPassword] = useState(false)
    const navigate = useNavigate();
    const {setToken} = useContext(AuthContext);
    const {setMe} = useContext(MeContext)
    const schema = Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid Format").required("Required"),
        password: Yup.string().min(3, "Min 3").max(8, "Max").required("Required"),
        gender: Yup.string().required("Required"),
    });

    const { register, handleSubmit, formState:{ errors, isValid } } = useForm({
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            gender: "",
        },
        resolver: yupResolver(schema)
    });

    const onPost = (data) => {
        console.log(data);
        axios.post("http://localhost:8080/register", data).then(data => {
            if(data.status === 201){
                setToken(data.data.accessToken)
                setMe(data.data.user)
                navigate("/")
                console.log("adssfskf");
            }
        }).catch(error => console.log(error))
    }

    return <>
        <Paper sx={{width: "50%", marginX: "auto", marginTop: 15, padding: "32px", borderRadius: "10px"}}>
            <Typography textAlign="center" variant='h3' component="h2" gutterBottom>
                Registration
            </Typography>

            <form onSubmit={handleSubmit(onPost)}>
                <Stack spacing={2}>
                    <TextField type="text" label="First Name" helperText={errors.firstName?.message} {...register("firstName")} />
                    <TextField type="text" label="Last Name" helperText={errors.lastName?.message} {...register("lastName")} />
                    <TextField type="email" label="Email" helperText={errors.email?.message} {...register("email")} />
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
                    <TextField
                        select
                        helperText={errors.gender?.message}
                        label="Gender"
                        {...register('gender')}
                    >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>FeMale</MenuItem>
                    </TextField>
                </Stack>

                <Typography variant='p' sx={{display: "blcok", marginTop: "25px",textAlign: "center"}} component="p">
                    If you have an account   
                    <Typography variant='a' href="#" onClick={(evt) => {
                        evt.preventDefault();
                        navigate("/login");
                    }} component="a" sx={{marginLeft: "10px"}}>Login</Typography>
                </Typography>

                <Button type="submit" variant='contained' sx={{display: 'inline-block', marginTop: "25px"}} color="success">Submit</Button>
            </form>
        </Paper>
    </>
}
