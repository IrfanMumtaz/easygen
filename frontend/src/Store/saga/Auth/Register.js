import { takeEvery, put } from 'redux-saga/effects';
import { registerFail, registerSuccess } from '../../state/Auth/Register';
import ApiCaller from '../../../services/ApiCaller';
import V1 from '../../../Constants/V1ApiConstant';
import Actions from '../../Actions';
import ToastHelper from 'Helpers/ToastHelper';

export function* register({ payload }) {
    try {
        const response = yield ApiCaller.Post({
            url: V1.auth.register,
            body: payload?.data,
        });
        if (response.status === 201) {
            yield put(registerSuccess(response?.data));
            localStorage.setItem('token', response?.data?.access_token);
            ToastHelper.success('User registered successful');
            payload.navigate('/dashboard');
        } else {
            yield put(registerFail(response?.response?.data?.message));
            ToastHelper.error(response?.response?.data?.message);
        }
    } catch (e) {
        ToastHelper.error(
            'Something went wrong and we have been notified about the problem'
        );
        yield put(registerFail());
    }
}

export default function* registerSaga() {
    yield takeEvery(Actions.REGISTER, register);
}
