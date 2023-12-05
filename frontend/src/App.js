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

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';

import Sidenav from 'examples/Sidenav';
import theme from 'assets/theme';
import themeDark from 'assets/theme-dark';
import routes from 'routes';
import sidebarData from 'sidebarData';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';
import { useMaterialUIController, setMiniSidenav } from 'context';
import brandWhite from 'assets/images/buscaro.png';

export default function App() {
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, direction, layout, sidenavColor, darkMode } =
        controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const { pathname } = useLocation();

    const isAuthenticated = useSelector(
        (state) => state?.login?.isAuthenticated
    );

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute('dir', direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }
            if (route.route) {
                return (
                    <Route
                        exact
                        path={route.route}
                        element={
                            isAuthenticated ? (
                                route.component
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                        key={route.key}
                    />
                );
            }
            return null;
        });

    return (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />

            {layout === 'dashboard' && (
                <>
                    <Sidenav
                        color={sidenavColor}
                        brand={brandWhite}
                        brandName="test"
                        routes={sidebarData}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                    />
                    {/* <Configurator /> */}
                    {/* {configsButton} */}
                </>
            )}
            {/* {layout === "vr" && <Configurator />} */}
            <Routes>
                <Route
                    exact
                    path={'/sign-in'}
                    element={<SignIn />}
                    key={'sign-in'}
                />
                <Route
                    exact
                    path={'/sign-up'}
                    element={<SignUp />}
                    key={'sign-up'}
                />
                {getRoutes(routes)}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="dashboard" />
                        ) : (
                            <Navigate to="/sign-in" />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>

            <ToastContainer
                toastStyle={{
                    borderRadius: 4,
                    fontFamily: 'normal',
                    fontSize: 16,
                    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
                }}
            />
        </ThemeProvider>
    );
}
