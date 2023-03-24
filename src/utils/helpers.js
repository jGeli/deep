


export const flatToTreeView = (flatArray) => {
    // sort array by id
    flatArray.sort((a, b) => a.id - b.id);
  
    // create an object with all nodes
    const nodes = {};
    flatArray.forEach(obj => nodes[obj.id] = {...obj, children: []});
  
    // create the tree
    let root = {id: 0, name: "Root", children: []};
    for (let id in nodes) {
      const node = nodes[id];
      const parent = nodes[id >> 1];
      if (parent) {
        parent.children.unshift(node);
        if (parent.children.length > 2) {
          parent.children.shift();
        }
      } else {
        root.children.unshift(node);
        if (root.children.length > 2) {
          root.children.shift();
        }
      }
    }
  
    // return the root node as an array
    return root.children;
  }
  
  export const flatToTreeViewv2 = (flatArray) => {

    const idToNode = {}; // map id to node object
  
    // create a node object for each item in the flat array and add it to the idToNode map
    flatArray.forEach(item => {
      const node = {
        ...item,
        id: item.id,
        parentId: item.parentId,
        firstName: item.firstName,
        lastName: item.lastName,
        children: []
      };
      idToNode[item.id] = node;
    });
  
    // add each node to its parent's children array (or to the root node's children array if it has no parent)
    flatArray.forEach(item => {
      const node = idToNode[item.id];
      if (item.parentId !== null) {
        const parent = idToNode[item.parentId];
        parent.children.push(node);
      } else {
        node.parentId = undefined; // remove parentId property to indicate it is a root node
      }
    });
  
    // find and return the top-level nodes (i.e. nodes with no parent)
    const topLevelNodes = flatArray.filter(item => item.parentId === null).map(item => idToNode[item.id]);
    return topLevelNodes;
  
      // const treeMap = {};
      // const treeArray = [];
    
      // // First, map the nodes of the array to an object using their ids as keys
      // flatArray.forEach((node) => {
      //   treeMap[node._id] = {...node, children: []};
      // });
    
      // // Then, iterate over the array again and create the tree structure
      // flatArray.forEach((node) => {
      //   const parent = treeMap[node.parentId];
      //   if (parent) {
      //     parent.children.push(treeMap[node._id]);
      //   } else {
      //     treeArray.push(treeMap[node._id]);
      //   }
      // });
    
      // return treeArray;
    }
//   This function takes a flat array of objects with an id and parentId property, and returns a treeview object with a children array that includes an object with a parentId belonging to the parent object.
  
//   Here's an example input and output:
  
export const sortByDate = (data) => {
  let array = data
  let newArray = array.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

 return newArray
}

export const MembershipFee = [12000, 24000, 48000, 60000]

  