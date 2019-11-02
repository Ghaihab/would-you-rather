import thunk from 'redux-thunk';
import logger from './logger';
import localStorage from './localStorage'

import { applyMiddleware} from "redux";


export default applyMiddleware(
    thunk,
    logger,
    localStorage
)


