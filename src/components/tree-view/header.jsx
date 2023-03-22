import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { setActiveNode, setFilter, resize } from '../../redux/reducers/actions';
import Filter from './filter';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_NODE, SET_FILTER } from '../../redux/actions/types';



export default function Header(props) {
	const dispatch = useDispatch();
	
	function handleClick() {
		dispatch({type: SET_ACTIVE_NODE, payload: null});
		dispatch({type: SET_FILTER, payload: ''});
	}
	
	useEffect(resize, []);
	
	return (
	<>
			<div style={{flexGrow: 1}}></div>
			<button onClick={handleClick}>Edit</button>&nbsp;&nbsp;
			<button onClick={handleClick}>Reset</button>&nbsp;&nbsp;
			<Filter filter={props.filter}/>
			{/* <span>Last Updated: {props.timestamp}</span> */}
			</>
	);
}

Header.propTypes = {
	filter: PropTypes.string.isRequired,
	timestamp: PropTypes.string
};