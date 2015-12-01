'use strict';
var Tree = (function(){
  var tree = getTreeFromStorage();

  var itemTemplate = function(label){
    var idSequence = (localStorage.getItem('lastId') !== null) ? parseInt(localStorage.getItem('lastId')) : -1;
    idSequence++;
    localStorage.setItem('lastId', idSequence);
    return {
      'label': label,
      'id': idSequence,
      'children': []
    }
  };

  function getTreeFromStorage(){
    return (localStorage.getItem("tree") !== null) ? JSON.parse(localStorage.getItem('tree')) : [];
  }

  function getChild(object, path){
    if (path.length === 1) {
      return object[parseInt(path[0])];
    } else {
      var currentIndex = path.splice(0,1);
      return getChild(object[parseInt(currentIndex)]['children'], path);
    }
  }

  function getTree(){
    return tree;
  }

  function addToTree(selectedParentID, name){
    if (selectedParentID === 'root') {
      tree.push(new itemTemplate(name));
    } else {
      var pathSplit = selectedParentID.split('|');
      pathSplit.splice(0,1);
      var parent = getChild(tree, pathSplit);

      parent['children'].push(new itemTemplate(name));
    }

    localStorage.setItem('tree', JSON.stringify(tree));
  }

  return{
    getTree: getTree,
    addToTree: addToTree
  }
})();