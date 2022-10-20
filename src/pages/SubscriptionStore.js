import Form from "../components/Form";
import Navbar from "../components/Navbar"
import * as Yup from "yup";

const SubscriptionStore = () => {

    const inputsStores = [
        {
            id: 1,
            type: "text",
            label: "Nom du commerce",
            name: "name",
            apiName: "name"
        },
        {
            id: 2,
            type: "text",
            label: "Adresse",
            name: "address",
            apiName: "address"
        },
        {
            id: 3,
            type: "text",
            label: "Code Postal",
            name: "zipcode",
            apiName: "zipcode"
        },
        {
            id: 4,
            type: "text",
            label: "Ville",
            name: "city",
            apiName: "city"
        },
        {
            id: 5,
            type: "select",
            label: "Type de commerce",
            name: "store_type",
            apiName: "store_type",
            options: [
                {
                    id: 51,
                    name: 'Restaurant'
                },
                {
                    id: 52,
                    name: 'Boulangerie'
                },
                {
                    id: 53,
                    name: 'Fleuriste'
                }
            ]
        },
        {
            id: 6,
            type: "text",
            label: "SIRET",
            name: "siret",
            apiName: "siret"
        },
        {
            id: 7,
            type: "email",
            label: "Email",
            name: "email",
            apiName: "mail"
        },
       
        {
            id: 8,
            type: "password",
            label: "Mode de passe",
            name: "password",
            apiName: "password"
        },
        {
            id: 9,
            type: "password",
            label: "Confirmation de mot de passe",
            name: "confirmPassword"
        }
    ]

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Veuillez entrer le nom de votre commerce !"),
        address: Yup.string()
            .required("Veuillez entrer l'adresse de votre commerce !"),
        zipcode: Yup.string()
            .required("Veuillez entrer le code postal de votre commerce !")
            .matches(/^[0-9]{5}$/, "Veuillez entrer un code postal valide !"),
        city: Yup.string()
            .required("Veuillez entrer la ville de votre commerce !"),
        store_type: Yup.string()
            .required("Veuillez entrer le type de votre commerce !"),
        siret: Yup.string()
            .required("Veuillez entrer le SIRET de votre commerce !")
            .matches(/^[0-9]{14}$/, "Veuillez entrer un SIRET valide !"),
        email: Yup.string()
            .email("Email invalide !")
            .required("Veuillez entrer votre email !"),
        password: Yup.string()
            .required("Mot de passe obligatoire !")
        .matches(/([0-9])/, "Votre mot de passe doit contenir au moins 1 entier !")
            .min(8, "Votre mot de passe doit être plus grand que 8 caractères !")
            .max(50, "Votre mot de passe doit être plus petit que 50 caractères !"),
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref("password"), null],
                "Le mot de passe de confirmation ne correspond pas !"
            ),
        acceptTerms: Yup.bool().oneOf(
            [true],
            "Accepter les conditions d'utilisation est obligatoire !"
        ),
    });

    return (
        <div>
            <Navbar></Navbar>
            <Form inputs={inputsStores} validationSchema={validationSchema} type="store" />
        </div>
    )
}

export default SubscriptionStore