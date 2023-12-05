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

import React, { useState, useEffect, forwardRef } from "react";
import * as Yup from "yup";
import ErrorBusiness from "Businesses/ErrorBusiness";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";

const MDInput = forwardRef(({ error, success, disabled, schema, onChange, value, errorarr, name, ...rest }, ref) => {
  const [stateError, setError] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value])


  const validateField = (e) => {
    if (schema) {
      Yup.reach(schema, name)
        .validate(e.target.value)
        .then(setError(null))
        .catch((err) => {
          setError(err.errors[0]);
        });
    }
    onChange(e);
    setInput(e.target.value);
  };

  let errorSubmit = ErrorBusiness.errorCheck(
    errorarr,
    name
  );

  return (
    <>
      <MDInputRoot
        {...rest}
        ref={ref}
        ownerState={{ error, success, disabled }}
        value={input}
        onInput={validateField}
        error={stateError || errorSubmit ? true : false}
      />

      {stateError || errorSubmit ? (
        <p style={{ fontSize: 13, color: 'red' }}>
          {stateError}
          {!stateError ? errorSubmit : ""}
        </p>
      ) : null}
    </>
  )
});

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  schema: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
  errorarr: PropTypes.any,
  name: PropTypes.any
};

export default MDInput;
