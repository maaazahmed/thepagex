import axios from "axios";
import {SIDEBAR_GET_TRENDING, SIDEBAR_GET_ARTFORMS} from "../ActionType";
import {checkTokenExpired} from "../check";

function getTrending(dispatch) {
    const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
    return axios
        .get(
            "http://167.172.166.24:3000" +
            `/api/v1/content/trending/subjects`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${myInfo.token}`,
                },
            }
        )
        .then((results) => {
            console.log('getTrending');
            console.log(results);

            let subjects = results.data.data;

            if (subjects) {
                let subjectsSet = new Set();

                subjects = subjects.filter((item) => {
                    if (subjectsSet.has(item)) {
                        return false;
                    } else {
                        subjectsSet.add(item);
                        return true;
                    }
                });
            }


            dispatch({
                type: SIDEBAR_GET_TRENDING,
                payload: subjects,
            });
        })
        .catch((err) => {
            if (checkTokenExpired(err.response, dispatch)) {
                return;
            }
            //todo error catch
        });
}

export function getTrendingAction() {
    return async function (dispatch) {
        return getTrending(dispatch);
    };
}

function getUserArtforms(dispatch) {
    const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
    return axios
        .get(
            "http://167.172.166.24:3000" +
            `/api/v1/artforms/activity/user`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${myInfo.token}`,
                },
            }
        )
        .then((results) => {
            console.log('getUserArtforms');
            console.log(results);

            let artforms = results.data.data;

            if (artforms) {
                let idSet = new Set();

                artforms = artforms.filter((item) => {
                    if (idSet.has(item.id)) {
                        return false;
                    } else {
                        idSet.add(item.id);
                        return true;
                    }
                });
            }

            dispatch({
                type: SIDEBAR_GET_ARTFORMS,
                payload: artforms,
            });
        })
        .catch((err) => {
            console.log('ERROR:');
            console.log(err);

            if (checkTokenExpired(err.response, dispatch)) {
                return;
            }
            //todo error catch
        });
}

export function getUserArtformsAction() {
    return async function (dispatch) {
        return getUserArtforms(dispatch);
    };
}
