import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';


function Form({ inputs, validationSchema }) {
    
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(validationSchema),
    });
    
    const { errors } = formState;
    
    const onSubmit = data => {
        console.log(data);
        const add = {}
        inputs.map((input) => {
            if(input.apiName){
                add[input.apiName] = data[input.name]
            }
        })
        
        axios.post('http://localhost:1234/user', add)
            .then(response => {
                console.log('User ajouté !')
                document.getElementById("add").innerHTML += "<div style='color: green;' class='error'> Votre inscription a bien été prise en compte !</div>"
            })
            .catch(err => {
                console.log(err)
                document.getElementById("add").innerHTML += "<div style='color: red;' class='error'> " + err.response.data + "</div>"
            })
    }
  
    return (
        <div className="container pt-4">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit(onSubmit)} id="add">
                        <h1 className="text-center">Inscription</h1>
                        {inputs.map((inputC) => (
                            <div key={inputC.id} className="form-group mb-3">
                                <label htmlFor={inputC.name}>
                                    {inputC.label}
                                </label>
                                <input
                                    type={inputC.type}
                                    className="form-control"
                                    {...register(inputC.name)}
                                    name={inputC.name}
                                    id={inputC.name}
                                />
                                <small className="text-danger">
                                    {errors[inputC.name]?.message}
                                </small>
                            </div>
                        ))}
                        <div className="form-check">
                            <label
                                htmlFor="acceptTerms"
                                className="form-check-label"
                            >
                                J'ai lu et j'accepte les
                                conditions d'utilisation
                            </label>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("acceptTerms")}
                                name="acceptTerms"
                            />
                            <small className="text-danger d-block">
                                {errors.acceptTerms?.message}
                            </small>
                        </div>
                        <div className="form-group d-flex justify-content-center mt-4 justify-content-md-end gap-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                S'inscrire
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => reset()}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  };


export default Form