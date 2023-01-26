import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Form({ inputs, validationSchema, type }) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [formErrors, setFormErrors] = useState();

  const { errors } = formState;

  const onSubmit = (data) => {
    data.email = data.email.toLowerCase();
    const add = {};
    inputs.map((input) => {
      if (input.apiName) {
        return (add[input.apiName] = data[input.name]);
      }
      return null;
    });

    axios
      .post("https://fidely.herokuapp.com/api/v1/" + type, add, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setFormErrors("Votre inscription a bien été prise en compte !");
        document.getElementById("formErrors").classList.add("text-success");
        document.getElementById("formErrors").classList.remove("text-danger");
      })
      .catch((err) => {
        var dom = document.createElement("div");
        dom.innerHTML = err.response.data;
        setFormErrors(dom.lastChild.data);
        document.getElementById("formErrors").classList.add("text-danger");
        document.getElementById("formErrors").classList.remove("text-success");
      });
  };

  return (
    <div className="container pt-4">
      <div className="row">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} id="add">
            {inputs.map((inputC) => {
              return inputC.type !== "select" ? (
                <div key={inputC.id} className="form-group mb-3">
                  <label htmlFor={inputC.name}>{inputC.label}</label>
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
              ) : (
                <div key={inputC.id} className="form-group mb-3">
                  <label htmlFor={inputC.name}>{inputC.label}</label>
                  <select
                    className="form-control"
                    {...register(inputC.name)}
                    name={inputC.name}
                    id={inputC.name}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      ---
                    </option>
                    {inputC.options.map((inputType) => {
                      return (
                        <option key={inputType.id} value={inputType.name}>
                          {inputType.name}
                        </option>
                      );
                    })}
                  </select>
                  <small className="text-danger">
                    {errors[inputC.name]?.message}
                  </small>
                </div>
              );
            })}
            <div className="form-check">
              <label htmlFor="acceptTerms" className="form-check-label">
                J'ai lu et j'accepte les conditions d'utilisation
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
            <div
              className="form-group d-flex justify-content-center mt-4 justify-content-md-end gap-3"
              id="form-group-btns"
            >
              <button type="submit" className="btn btn-primary">
                S'inscrire
              </button>
              <Link
                to="/"
                className="btn btn-danger text-decoration-none text-white"
              >
                Retour
              </Link>
            </div>
            <div id="formErrors">{formErrors}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
