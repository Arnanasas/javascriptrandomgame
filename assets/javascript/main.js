'use strict';
(function(){

//VARIABLES
var inputbox = document.querySelector( '.input' );
var addButton = document.querySelector( '.addButton' );
var deleteButton = document.querySelector( 'li button' );

 function getValue( input ) {
   return input.value;
 }

 addButton.addEventListener( 'click', toDoList );

 function toDoList() {

  // LIST + BUTTON CREATE FUNCTION

   var newListItem = document.createElement('li');
   var listItemText = document.createTextNode(getValue(inputbox));
   newListItem.appendChild(listItemText);
   console.log(newListItem);
   document.querySelector('.to-do-list').appendChild(newListItem);
   var newButton = document.createElement('button');
   var buttonText = document.createTextNode('X');
   newButton.appendChild(buttonText);
   var newButtonInList = document.querySelector('li:last-of-type').appendChild(newButton);
 }



 function finishButton() {
   var listSelector = document.querySelector( 'li' )
   listSelector.remove(listSelector.selectedIndex);
 }



// window.localStorage()






}());
