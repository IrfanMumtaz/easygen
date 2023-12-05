import { all, takeLatest } from 'redux-saga/effects';
// State Actions
import { loginInit } from '../state/Auth/Auth';
import { registerInit } from '../state/Auth/Register';
import { logoutInit } from '../state/Auth/Logout';

// SAGA Generator Functions
import { login } from './Auth/Auth';
import { register } from './Auth/Register';
import { logout } from './Auth/Logout';

export function* rootSaga() {
    try {
        yield all([
            takeLatest(loginInit.type, login),
            takeLatest(registerInit.type, register),
            takeLatest(logoutInit.type, logout),
        ]);
    } catch (err) {
        console.warn(err);
    }
}
