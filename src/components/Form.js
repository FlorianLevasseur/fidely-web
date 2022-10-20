import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";
import axios from 'axios';


function Form({ inputs, validationSchema, type }) {
    
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    
    const { errors } = formState;
    
    const onSubmit = data => {
        console.log(data);
        const add = {}
        inputs.map((input) => {
            if(input.apiName){
                return (add[input.apiName] = data[input.name])
            }
            return null
        })
        
        axios.post('http://localhost:4000/' + type, add)
            .then(response => {
                console.log('Add effectué !')
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
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} id="add">
                        <h1 className="text-center">Inscription</h1>
                        {inputs.map((inputC) => {
                            return inputC.type !== "select" ?
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
                                        placeholder={inputC.placeholder}
                                    />
                                    <small className="text-danger">
                                        {errors[inputC.name]?.message}
                                    </small>
                                </div>
                            :
                            <div key={inputC.id} className="form-group mb-3">
                                <label htmlFor={inputC.name}>
                                    {inputC.label}
                                </label>
                                <select
                                    className="form-control"
                                    {...register(inputC.name)}
                                    name={inputC.name}
                                    id={inputC.name}
                                    defaultValue=""
                                ><option value="" disabled>---</option>
                                {inputC.options.map((inputType) => {
                                    return <option key = {inputType.id} value={inputType.name}>{inputType.name}</option>
                                })}
                                    
                                </select>
                                <small className="text-danger">
                                    {errors[inputC.name]?.message}
                                </small>
                            </div>
                        }
                            
                        )}
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
                        <div className="form-group d-flex justify-content-center mt-4 justify-content-md-end gap-3" id="form-group-btns">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                S'inscrire
                            </button>
                            <Link to="/" className="btn btn-danger text-decoration-none text-white">Annuler</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  };


export default Form