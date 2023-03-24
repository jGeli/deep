import React, { Component, useState } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

function Tree() {
  const [treeData, setTreeData] = useState([
    { title: 'Chicken', children: [{ title: 'Egg' }] },
    { title: 'Fish', children: [{ title: 'fingerline' }] },
  ])

    return (
        <SortableTree
          treeData={treeData}
          onChange={(treeData) => setTreeData(treeData)}
        />
    );
}

export default Tree