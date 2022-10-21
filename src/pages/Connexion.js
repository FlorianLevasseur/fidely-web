import axios from 'axios';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Connexion = () => {

    const navigate = useNavigate();

    const [ formErrors, setFormErrors ] = useState();

    const validationSchema = Yup.object().shape({
        mail: Yup.string()
            .email("Email invalide !")
            .required("Veuillez entrer votre email !"),
        password: Yup.string()
            .required("Mot de passe obligatoire !")
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    
    const { errors } = formState;
    
    const onSubmit = data => {
        console.log(data);
        
        axios.post('http://localhost:4000/login', data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log('Login correct !')
                sessionStorage.setItem("token", response.data.token);
                navigate('/');
            })
            .catch(err => {
                var dom = document.createElement('div')
                dom.innerHTML = err.response.data
                setFormErrors(dom.lastElementChild.lastChild.data)
            })
    }

    console.log(formErrors)
    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit(onSubmit)} id="connexion">
                <div>
                    <label htmlFor="mail">Email : </label>
                    <input type="email" {...register("mail")} id="mail" name="mail"></input>
                    <small className="text-danger">
                        {errors["mail"]?.message}
                    </small>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe : </label>
                    <input type="password" {...register("password")} id="password" name="password"></input>
                    <small className="text-danger">
                        {errors["password"]?.message}
                    </small>
                </div>
                <button type="submit">Connexion</button>
                <div className="text-danger">{formErrors}</div>
            </form>
        </div>
    )
}

export default Connexion;