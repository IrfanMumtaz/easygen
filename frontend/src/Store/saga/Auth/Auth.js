import { takeEvery, put } from 'redux-saga/effects';
import { loginFail, loginSuccess } from '../../state/Auth/Auth';
import ApiCaller from '../../../services/ApiCaller';
import V1 from '../../../Constants/V1ApiConstant';
import Actions from '../../Actions';
import ToastHelper from 'Helpers/ToastHelper';

export function* login({ payload }) {
    try {
        const response = yield ApiCaller.Post({
            url: V1.auth.login,
            body: payload?.data,
        });
        if (response.status === 200) {
            yield put(loginSuccess(response?.data));
            localStorage.setItem('token', response?.data?.access_token);
            ToastHelper.success(response?.data?.message);
            payload.navigate('/dashboard');
        } else {
            yield put(loginFail(response?.response?.data?.message));
            ToastHelper.error(response?.response?.data?.message);
        }
    } catch (e) {
        ToastHelper.error(
            'Something went wrong and we have been notified about the problem'
        );
        yield put(loginFail());
    }
}

export default function* LoginSaga() {
    yield takeEvery(Actions.LOGIN, login);
}
