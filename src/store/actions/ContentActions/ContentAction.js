import {
  DELETE_CONTRIBUTION,
  EDIT_CONTRIBUTION,
} from "../ActionType";
import axios from "axios/index";
import { getContentsAction } from '../ContentAction/ContentAction';
import {checkTokenExpired} from "../check";
console.log(getContentsAction);


export function deleteContribution(contentId, myInfo, dispatch) {
  return axios
    .delete(`${"http://167.172.166.24:3000"}/api/v1/content/contribution/contentId/${contentId}/user/${myInfo.userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myInfo.token}`
    }})
    .then(results => {
      if(results && results.data){
        if(results.data.code === 200) {
            //dispatch(getContentsAction(0,100));
            dispatch({
              type: DELETE_CONTRIBUTION,
              payload: {contentId, myUserId: myInfo.userId},
            });
          return results.data.data;
        }
        if(results.data.code === 406) return {error: "Invalid content"};
        if(results.data.code === 500) return {error: "An error has occured"};
        return {error: "Error Please try again later!"}
      }else
      {
        return {error: "Error Please try again later!"}
      }

      // dispatch({
      //   type: DELETE_CONTRIBUTION,
      //   payload: results.data
      // });
    })
    .catch(err => {
      console.log("delete error:", err);

      if (checkTokenExpired(err.response, dispatch)) {
        return;
      }

      return {error: "Error Please try again later!"}
      // dispatch({
      //   type: PUBLISH_WORK,
      //   payload: false
      // });
    });
}

export function deleteContributionAction(contentId, myInfo) {
  return async function(dispatch) {
    return deleteContribution(contentId, myInfo, dispatch);
  };
}



export function editContribution(data, token, dispatch) {
  return axios
      .post(
          "http://167.172.166.24:3000" + `/api/v1/content/contribution/edit`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + token,
            },
          }
      )
      .then((results) => {
        if (checkTokenExpired(results, dispatch)) {
          return;
        }

        if (results.status === 200 && results.data && results.data.success === true) {
          dispatch({
            type: DELETE_CONTRIBUTION,
            payload: results.data.data,
          });
          dispatch(getContentsAction(0, 100));

          return 'Success';
        }
      })
      .catch((err) => {
        dispatch({
          type: EDIT_CONTRIBUTION,
          payload: false,
        });
      });
}

export function editContributionAction(contentId, data) {
  const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));

  return async function (dispatch) {
    const dataHttp = new FormData();
    dataHttp.append('contentId', contentId);
    dataHttp.append('contentUserId', myInfo.userId);
    if (data.journalId) dataHttp.append('journalId', data.journalId);
    dataHttp.append('contentTag', data.tag);
    dataHttp.append('contentDescription', data.description);
    dataHttp.append('artForms[]', data.artForms[0]);
    dataHttp.append('subject', data.subject);
    if (data.photo) await dataHttp.append('file', data.photo, data.photo.name);

    return editContribution(dataHttp, myInfo.token, dispatch);
  };
}
