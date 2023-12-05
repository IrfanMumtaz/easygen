import { takeEvery, put } from 'redux-saga/effects';
import { logoutFail, logoutSuccess } from '../../state/Auth/Logout';
import { loginFail } from '../../state/Auth/Auth';
import Actions from '../../Actions';
import ToastHelper from 'Helpers/ToastHelper';

export function* logout({ payload }) {
    try {
        console.log(payload);
        localStorage.removeItem('token');
        yield put(logoutSuccess());
        // yield put(loginFail());
        console.log('success');
        payload.navigate('/sign-in');
    } catch (e) {
        ToastHelper.error(
            'Something went wrong and we have been notified about the problem'
        );
        yield put(logoutFail());
    }
}

export default function* LogoutSaga() {
    yield takeEvery(Actions.LOGOUT, logout);
}
