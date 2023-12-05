/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable prefer-destructuring */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from 'react';

// react-router-dom components
import { useNavigate } from 'react-router-dom';
//redux
import { useSelector, useDispatch } from 'react-redux';
// Redux action
import { loginInit } from '../../../Store/state/Auth/Auth';

// @mui material components
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';

// Images
//Components
import ErrorBusiness from 'Businesses/ErrorBusiness';
import AuthValidation from 'Validations/AuthValidation';

function Basic() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state?.login?.isLoading);

    const [form, handleForm] = useState({ email: '', password: '' });
    const [error, setError] = useState([]);

    const handleChange = (e, name) => {
        const errorUpdate = ErrorBusiness.errorRemove(error, name);
        setError(errorUpdate);
        form[name] = e.target.value;
        handleForm(form);
    };

    const submitLogin = (e) => {
        e.preventDefault();
        AuthValidation.validate(form, { abortEarly: false })
            .then(() => {
                dispatch(loginInit({ data: form, navigate: navigate }));
            })
            .catch((err) => {
                setError(ErrorBusiness.errorGet(err));
            });
    };

    const signup = (e) => {
        navigate('/sign-up');
    };

    return (
        <BasicLayout image="">
            <Card style={{ marginTop: '20%' }}>
                <MDBox
                    variant="gradient"
                    bgColor="warning"
                    borderRadius="lg"
                    coloredShadow="warning"
                    mx={2}
                    mt={-2}
                    p={2}
                    textAlign="center">
                    <MDTypography
                        variant="h5"
                        fontWeight="regular"
                        color="white">
                        Welcome
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={2} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput
                                name="email"
                                type="email"
                                label="Email"
                                value={form.email}
                                fullWidth
                                error={false}
                                id="outlined-error-helper-text"
                                variant="standard"
                                onChange={(e) => handleChange(e, 'email')}
                                schema={AuthValidation}
                                errorarr={error}
                            />
                        </MDBox>

                        <MDBox mb={2}>
                            <MDInput
                                name="password"
                                type="password"
                                label="Password"
                                value={form.password}
                                fullWidth
                                onChange={(e) => handleChange(e, 'password')}
                                variant="standard"
                                schema={AuthValidation}
                                errorarr={error}
                            />
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton
                                variant="gradient"
                                color="warning"
                                fullWidth
                                onClick={submitLogin}
                                disabled={isLoading}>
                                {isLoading ? (
                                    <CircularProgress
                                        color="white"
                                        size={20}
                                        thickness={4}
                                    />
                                ) : (
                                    <p> sign in</p>
                                )}
                            </MDButton>
                        </MDBox>

                        <MDBox mt={4} mb={1}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                fullWidth
                                onClick={signup}>
                                <p> sign up</p>
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default Basic;
