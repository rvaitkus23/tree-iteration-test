describe('TreeObject', function(){

  beforeEach(function () {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return (store[key])? store[key] : null;
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
    });
  });

  describe('getTree', function(){

    it('should return empty array on first run', function(){
      var tree = Tree.getTree();
      expect(tree).toEqual([]);
    });

    it('should add item to tree', function(){
      var expectedResult = [
        {id: 0,
          label: "jonas",
          children: []
        }
      ];
      Tree.addToTree('root', 'jonas');
      expect(Tree.getTree()).toEqual(expectedResult);
    });
  });


});