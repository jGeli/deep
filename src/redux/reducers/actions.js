import configure, { history } from '../../redux/store';
import { RESIZE, SET_ACTIVE_NODE, SET_FILTER, SET_DATA } from '../actions/types';


const Store = configure();


export function resize() {
	Store.dispatch({
		type: RESIZE
	});
}

export function setActiveNode(node) {
	Store.dispatch({
		type: SET_ACTIVE_NODE,
		node: node
	});
}

export function setFilter(filter) {
	Store.dispatch({
		type: SET_FILTER,
		filter: filter
	});
}