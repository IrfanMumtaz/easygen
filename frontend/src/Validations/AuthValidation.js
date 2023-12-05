import * as Yup from 'yup';

const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$/;

const AuthValidation = Yup.object().shape({
    email: Yup.string()
        .required('Field is required')
        .matches(emailRegex, 'Email should be Valid Format')
        .nullable(),
    password: Yup.string()
        .required('Field is required')
        .matches(
            passwordRegex,
            'Password should atlesat 8 characters long including 1 letter, 1 number and 1 special character'
        )
        .nullable(),
});

export default AuthValidation;
