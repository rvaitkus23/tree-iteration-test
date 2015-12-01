(function () {

  'use strict';
  $(document).ready(function () {
    $('.modal-trigger').leanModal();

    $('#add-item-save').click(AddItemHandler);

    $('#output-recursive > .reprint-button').click(recursiveTreePrint);
    $('#output-iterative > .reprint-button').click(iterativeTreePrint);

    printSelectOptions();
    printTrees();

    function printSelectOptions(){
      var options = '<option value="root">-- Root --</option>';
      $('#add-item-parent').html(options + recursiveOptionPrint(Tree.getTree(), 'root', 0))
        .material_select();
    }

    function recursiveOptionPrint(object,route, depth){
      var output = '';
      for (var i = 0, il = object.length; i<il; i++){
        output += '<option value="' + route + '|' + i + '">' +
          new Array(depth+1).join('-') + object[i]['label'] + '</option>';
        if (object[i]['children'].length > 0) {
          output += recursiveOptionPrint(object[i]['children'], route + '|' + i, depth + 1);
        }
      }
      return output;
    }

    function AddItemHandler(){
      var parentDom = $('#add-item-parent'), nameDom = $('#add-item-name');
      var selectedParentID = parentDom.val();
      var name = nameDom.val();

      // adds to the root
      Tree.addToTree(selectedParentID, name);

      nameDom.val("");
      parentDom.val("root");
      printSelectOptions();
      printTrees();
    }

    function printTrees(){
      recursiveTreePrint();
      iterativeTreePrint();
    }

    function recursiveTreePrint(){
      var recursiveStart = performance.now();
      var outputDom = $('#output-recursive');
      outputDom.children('.print-result').html(TreePrint.recursive(Tree.getTree(),0));
      outputDom.children('.print-time').text('Time took to print ' + (performance.now() - recursiveStart) + 'ms');
    }

    function iterativeTreePrint(){
      var iterativeStart = performance.now();
      var outputDom = $('#output-iterative');
      outputDom.children('.print-result').html(TreePrint.iterative(Tree.getTree()));
      outputDom.children('.print-time').text('Time took to print ' + (performance.now() - iterativeStart) + 'ms');
    }
  });

}());
