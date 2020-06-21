import axios from "axios/index";
import {
    VALIDATE_CODE,
} from '../ActionType';

function codeValidate(data, dispatch) {

    return axios.post("http://167.172.166.24:3000" + "/api/v1/users/validate/code",data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(results => {
            dispatch({
                type: VALIDATE_CODE,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: VALIDATE_CODE,
                payload: false,
            })
        });
}

export function codeValidateAction(data) {

    return async function (dispatch) {
        return codeValidate(data, dispatch)
    }

};