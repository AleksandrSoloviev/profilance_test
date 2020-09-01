import {combineReducers} from "redux"
import signModalReducer from "./signModal";
import newsReducer from "./newsReducer";

export default combineReducers({
    signModal: signModalReducer,
    news: newsReducer,
})