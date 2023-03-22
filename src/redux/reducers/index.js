import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';


// import ActiveNode from './activeNode';
// import Filter from './filter';
// import Height from './height';
// import Width from './width';
import Auth from './Auth';
import uiReducer from './Ui';
import dataReducer from './data.reducer';




export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: Auth,
    uiReducer: uiReducer,
    dataReducer: dataReducer,
    // activeNode: ActiveNode,
		// filter: Filter,
		// height: Height,
		// width: Width
  });
