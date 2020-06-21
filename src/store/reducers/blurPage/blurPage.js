const initialState = {
    blurPageControl: ''

}

export default function (state = initialState, action) {
    switch (action.type) {
        case "blur":
            return {
                ...state, blurPageControl: action.payload
            };

        default:
            return state;
    }
}
