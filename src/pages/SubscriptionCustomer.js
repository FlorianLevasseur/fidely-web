import Form from "../components/Form";
import Navbar from "../components/Navbar"
import * as Yup from "yup";
import "../styles/SubscriptionCustomer.scss";

const SubscriptionCustomer = () => {

    const inputsClient = [
        {
            id: 1,
            type: "text",
            label: "Nom",
            name: "lastname",
            apiName: "lastname",
            placeholder: "Descartes"
        },
        {
            id: 2,
            type: "text",
            label: "Prénom",
            name: "firstname",
            apiName: "firstname",
            placeholder: "Jean-Néplin"
        },
        {
            id: 3,
            type: "date",
            label: "Date de naissance",
            name: "birthdate",
            apiName: "birthdate"
        },
        {
            id: 4,
            type: "email",
            label: "Email",
            name: "email",
            apiName: "mail",
            placeholder: "exemple@fidely.fr"
        },
        {
            id: 5,
            type: "password",
            label: "Mot de passe",
            name: "password",
            apiName: "password",
            placeholder: "N'oubliez pas le chiffre !"
        },
        {
            id: 6,
            type: "password",
            label: "Confirmation de mot de passe",
            name: "confirmPassword",
            placeholder: "test"
        }
    ]

    const validationSchema = Yup.object().shape({
        lastname: Yup.string()
            .required("Veuillez entrer votre nom !")
            .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, "Veuillez entrer un nom valide !"),
        firstname: Yup.string()
            .required("Veuillez entrer votre prénom !")
            .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, "Veuillez entrer un prénom valide !"),
        birthdate: Yup.date()
            .nullable().typeError("Veuillez entrer votre date de naissance !"),
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
            <Form inputs={inputsClient} validationSchema={validationSchema} />
        </div>
    )
}

export default SubscriptionCustomer