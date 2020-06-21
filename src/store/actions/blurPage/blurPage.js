
export const blurPageControl = (data) => {
    return dispatch => {
        dispatch({
            type: "blur",
            payload: data
        })
    }
}
