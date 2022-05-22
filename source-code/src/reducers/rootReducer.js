import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { dateReducer } from "./dateReducer";
import { personReducer } from "./personReducer";
import  totenReducer  from "./totenReducer";
import {trazabilidadReducer} from "./trazabilidadReducer";


export const rootReducer=combineReducers({
    auth:authReducer,
    person:personReducer,
    date:dateReducer,
    toten:totenReducer,
    trazabilidad:trazabilidadReducer
})