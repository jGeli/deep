import PropTypes from 'prop-types';
import React from 'react';
import { setFilter } from '../../redux/reducers/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER } from '../../redux/actions/types';



export default function Filter() {
	const dispatch = useDispatch()
	const { filter} = useSelector(({uiReducer}) => uiReducer)		
		
		
	function handleChange(e) {
	dispatch({type: SET_FILTER, payload: e.target.value})
	}



	return (
		<input
			aria-label="Filter nodes"
			id="search"
			type="text"
			placeholder="Filter nodes..."
			value={filter}
			onChange={handleChange}/>
	);
}

Filter.propTypes = {
	filter: PropTypes.string.isRequired
};