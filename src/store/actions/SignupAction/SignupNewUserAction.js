import axios from "axios/index";
import {
    SIGNUP_USER,
} from '../ActionType';

function signupNewUser(data, dispatch) {
    return axios.post("http://167.172.166.24:3000" + "/api/v1/users/signup", data)
        .then(results => {
            dispatch({
                type: SIGNUP_USER,
                payload: results,
            })
        })
        .catch(err => {
            dispatch({
                type: SIGNUP_USER,
                payload: err,
            })
        });
}

export function signupNewUserAction(data) {
    return async function (dispatch) {
        console.log(data);
        const dataHttp = new FormData()
        dataHttp.append('password', data.password);
        dataHttp.append('id', data.id);
        dataHttp.append('validationCode', data.validationCode);
        dataHttp.append('fullname', data.fullname);
        dataHttp.append('email', data.email);
        dataHttp.append('passion', data.passion);
        if (data.photo !== "")
            await dataHttp.append('file', data.photo, data.photo.name)
       return signupNewUser(dataHttp, dispatch)
    }

};

