var treePrintTest = {};

treePrintTest.tree = [
  {"label":"jonas",
    "id":0,
    "children":[
      {"label":"jod",
        "id":2,
        "children":[
          {"label":"dar",
            "id":3,
            "children":[]}
        ]
      }
    ]
  },
  {"label":"lud",
    "id":1,
    "children":[]}];

treePrintTest.expectedOutput = 'jonas<br>-jod<br>--dar<br>lud<br>';

describe('TreePrint', function(){

  describe('using non empty array', function(){
    it('should get correct output using recursive method',function(){
      var output = TreePrint.recursive(treePrintTest.tree,0);
      expect(output).toBe(treePrintTest.expectedOutput);
    });

    it('should get correct output using iterative method',function(){
      var output = TreePrint.iterative(treePrintTest.tree);
      expect(output).toBe(treePrintTest.expectedOutput);
    });
  });

  describe('using non empty array', function(){
    it('should get correct output using recursive method',function(){
      var output = TreePrint.recursive([],0);
      expect(output).toBe('');
    });

    it('should get correct output using iterative method',function(){
      var output = TreePrint.iterative([]);
      expect(output).toBe('');
    });
  });

});