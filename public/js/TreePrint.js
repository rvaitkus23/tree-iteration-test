'use strict';
var TreePrint = (function(){
  var recursive = function(objects, depth){
    var output = '';
    for (var i = 0, il = objects.length; i<il; i++){
      output += new Array(depth+1).join('-') + objects[i]['label'] + '<br>';
      if (objects[i]['children'].length > 0) {
        output += recursive(objects[i]['children'], depth + 1);
      }
    }
    return output;
  };

  var iterative = function(objects){
    var depth = 0;
    var indexes = [0];
    var objectsArrays = [objects];
    var object = (objects.length > 0) ? objects[0] : undefined;

    var output = '';

    while (object) {
      output += new Array(depth + 1).join('-') + object['label'] + '<br>';

      // if object contains children get to them
      if (object['children'].length > 0) {
        depth++;
        indexes[depth] = 0;
        objectsArrays[depth] = object['children'];
        object = object['children'][0];

        // otherwise check if has siblings
      } else if (objectsArrays[depth][indexes[depth] + 1]) {
        indexes[depth]++;
        object = objectsArrays[depth][indexes[depth]];

        // get to parent element and check for siblings
      } else {
        do {
          depth--;
          if (depth < 0){
            return output;
          }
        } while (!objectsArrays[depth][indexes[depth] + 1]);
        indexes[depth]++;
        object = objectsArrays[depth][indexes[depth]];
      }
    }
    console.log('have not returned before');
    return output;
  };

  return{
    recursive: recursive,
    iterative: iterative
  }
})();