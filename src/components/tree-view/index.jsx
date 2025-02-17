import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import Header from './header';
import TreeContainer from './treeContainer';
import EditView from './edit-tree-view'
import json from './json';
import { resize } from '../../redux/reducers/actions';

import './style.css';
import { flatToTreeView } from '../../utils/helpers';
import { useState } from 'react';
import { SET_ACTIVE_NODE } from '../../redux/actions/types';

window.onresize = resize;

const TreeView = () => {
  const dispatch = useDispatch()
  const { activeNode, height, width, filter, treeView } = useSelector(({uiReducer}) => uiReducer);
  const { members } = useSelector(({dataReducer}) => dataReducer);
  const [flatArray, setFlatArray] = useState({});

  
  useEffect(() => {
    let newMembers = [];
    let sortArray = [...members];
    sortArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .forEach((member, index) => {
          newMembers.push({...member, id: index + 1})
      })
      console.log(sortArray)
      console.log(newMembers)

    if(newMembers.length > 0) {
      let flat = flatToTreeView(newMembers);
      setFlatArray(flat[0])
    } else {
      setFlatArray({})
    }
      
    if(!activeNode ){
      let node = newMembers[0]; 
      if(node){
          dispatch({type: SET_ACTIVE_NODE, payload: node.name})    
      }
    }
      
    
  }, [members])
  

  
	return (
		<div >
			{/* <Header filter={filter} timestamp={json.timestamp}/> */}
      <TreeContainer
				activeNode={activeNode}
				data={flatArray}
				filter={filter}
				height={height}
				width={width}
				/>
		
        {/* <EditView
				// activeNode={activeNode}
				// data={flatArray}
				// filter={filter}
				// height={height}
				// width={width}
				/>	 */}
		</div>
	);
  };
  
  export default TreeView;
