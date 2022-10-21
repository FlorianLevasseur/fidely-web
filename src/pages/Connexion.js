import axios from 'axios';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/Connexion.scss";

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
                console.log(response);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("_id", response.data._id);
                sessionStorage.setItem("firstname", response.data.firstname);
                navigate('/');
            })
            .catch(err => {
                var dom = document.createElement('div')
                dom.innerHTML = err.response.data
                setFormErrors(dom.lastChild.data)
            })
    }

    console.log(formErrors)
    return (
        <div id="connexions">
            <div id="modale">
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit(onSubmit)} id="connexion">
                    <div>
                        <label htmlFor="mail" className="form-check-label">Email</label>
                        <input type="email" {...register("mail")} className="form-control" id="mail" name="mail"></input>
                        <small className="text-danger">
                            {errors["mail"]?.message}
                        </small>
                    </div>
                    <div>
                        <label htmlFor="password" className="form-check-label">Mot de passe</label>
                        <input type="password" {...register("password")} className="form-control" id="password" name="password"></input>
                        <small className="text-danger">
                            {errors["password"]?.message}
                        </small>
                    </div>
                    <button type="submit" className="btn btn-primary">Connexion</button>
                    <div className="text-danger">{formErrors}</div>
                    <Link to="/" className="btn btn-danger text-decoration-none text-white">Retour</Link>
                </form>
            </div>
        </div>
    )
}

export default Connexion;