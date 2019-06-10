//first module
//Budget controller
var budgetController = (function() {
  //function constructor to create objects, object will inherit this constructor

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem,ID;

      //Create new ID

      if (data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      //when id is empty than new array should be zero



      //Create new item basec od 'inc' or 'exp' type

      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }


      //Push it into our data structure
      data.allItems[type].push(newItem);

      //Return the new element
      return newItem, ID;
    }
  };
})(); //iife

//second module Ui controller

var UIController = (function() {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, //will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function() {
      return DOMStrings; //exposing domstrings to the public
    }
  };
})();

//GLOBAL APP CONTROLLER

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        //which for older browsers
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {

    var input, newItem;

    //1. Get the field input data

    input = UICtrl.getInput();

    //2. Ad the item to the budget controller

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add the item to the UI

    //4. Calculate the budget

    //5. display the budget on the UI
  };

  return {
    init: function() {
      console.log("Application has started.");
      setupEventListeners();
    }
  };
})(budgetController, UIController);
