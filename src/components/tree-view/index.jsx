import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import Header from './header';
import TreeContainer from './treeContainer';
import json from './json';
import { resize } from '../../redux/reducers/actions';

import './style.css';
import { flatToTreeView } from '../../utils/helpers';
import { useState } from 'react';
import { SET_ACTIVE_NODE } from '../../redux/actions/types';
import { Container } from '@mui/material';

window.onresize = resize;

const TreeView = () => {
  const dispatch = useDispatch()
  const { activeNode, height, width, filter } = useSelector(({uiReducer}) => uiReducer);
  const { members } = useSelector(({dataReducer}) => dataReducer);
  const [flatArray, setFlatArray] = useState({});
    console.log(activeNode, height, width, filter)

  
  useEffect(() => {
    let newMembers = [];
    
      members.forEach(member => {
        console.log(member.parent)
          newMembers.push({...member, parentId: member.parent ? member.parent : null})
      })
    
    
    if(newMembers.length > 0) {
      let flat = flatToTreeView(newMembers);
      setFlatArray(flat[0])
    } else {
      setFlatArray({})
    }
      
    
      
    
  }, [members])
  
  useEffect(() => {
    if(!activeNode){
      let node = members.find(a => !a.parent); 
      console.log(node)
      if(node){
    dispatch({type: SET_ACTIVE_NODE, payload: node.id})    
      }
    }
  }, [])
  
  
  
  console.log(flatArray)
	return (
		<div id="container">
			<Header filter={filter} timestamp={json.timestamp}/>
			<Container >
			
			<TreeContainer
				activeNode={activeNode}
				data={flatArray}
				filter={filter}
				height={height}
				width={width}
				/>
				</Container>
		</div>
	);
  };
  
  export default TreeView;
