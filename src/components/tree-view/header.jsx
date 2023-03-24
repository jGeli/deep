import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { setActiveNode, setFilter, resize } from '../../redux/reducers/actions';
import Filter from './filter';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_NODE, SET_FILTER, SET_TREE_VIEW } from '../../redux/actions/types';
import HealingIcon from '@mui/icons-material/Healing';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function Header(props) {
	const dispatch = useDispatch();
	const { treeView } = useSelector(({uiReducer}) => uiReducer);

		
	const handleChange = (event, newAlignment) => {
		dispatch({ type: SET_TREE_VIEW, payload: newAlignment ? newAlignment : treeView === 'dnd' ? "route" : "dnd"})
	}	
		
		
	function handleClick() {
		dispatch({type: SET_ACTIVE_NODE, payload: null});
		dispatch({type: SET_FILTER, payload: ''});
	}
	
	useEffect(resize, []);
	
	return (
	<Box>
			<div style={{flexGrow: 1}}></div>
			{/* <button onClick={handleClick}>Edit</button>&nbsp;&nbsp; */}
			<button onClick={handleClick}>Reset</button>&nbsp;&nbsp;
			<Filter filter={props.filter}/>&nbsp;&nbsp;
			<ToggleButtonGroup
			      color="primary"
			      value={treeView}
			      exclusive
			      size='small'
			      onChange={handleChange}
			      aria-label="Platform"
			    >
			      <ToggleButton value="route"><AltRouteIcon fontSize='small' color={treeView === 'route' ? 'secondary' : ""}/></ToggleButton>
			      <ToggleButton value="dnd"><AccountTreeIcon fontSize='small' color={treeView === 'dnd' ? 'secondary' : ""}/></ToggleButton>
			    </ToggleButtonGroup>
			{/* <span>Last Updated: {props.timestamp}</span> */}
			</Box>
	);
}

Header.propTypes = {
	filter: PropTypes.string.isRequired,
	timestamp: PropTypes.string
};