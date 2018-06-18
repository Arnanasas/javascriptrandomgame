'use strict';
(function(){

// VARIABLES
var input        = document.querySelector( '.input' );
var button       = document.querySelector( 'button' );
var database     = window.localStorage;
var list         = document.querySelector('.to-do-list');
var editIndex    = null;
var parag = document.querySelector('.time_today');

if( database.getItem('tasks') ) {
  refreshTasks();
  todayTime();
}


// LOGIC
button.addEventListener('click', init);


// FUNCTIONS
parag.addEventListener('mouseover', paragraphHover)

// IF YOU HOVER ON PARAGRAPH
function paragraphHover() {
  var parag = document.querySelector('.time_today');
  var time = getDay();
  confirm("Hurry up doing you tasks! It's " + time + " already!");
}

// TO GET TODAYS DAY
function todayTime() {
  var parag = document.querySelector('.time_today');
  var time = getDay();
  parag.innerHTML = "Today is " + time;
}

function init() {

  var action    = button.getAttribute( 'data-action' );
  var task      = input.value;
  var tasks     = database.getItem( 'tasks' );

  if (action == 'add' && input.value != '') {

    input.value = '';

    // Object
    var taskObject = {};
    var dar = getDay();
    taskObject.isCompleted = false;
    taskObject.text = task;

// FIRST TASK IF
    if ( tasks == null) {

      var tasksArray = [];
      tasksArray.push(taskObject);
      database.setItem ( 'tasks', JSON.stringify( tasksArray ) )
    }
    else {

      var tasksJson = database.getItem('tasks');
      var tasksArray = JSON.parse( tasksJson );
      tasksArray.push( taskObject );
      database.setItem('tasks', JSON.stringify( tasksArray ) );

    }
  }
  else {
    var tasks = database.getItem('tasks');
    var tasksArray = JSON.parse( tasks );
    var text = input.value;
    tasksArray[editIndex].text = text;
    database.setItem('tasks', JSON.stringify( tasksArray) );
    // button.textContent = 'Add';
    button.setAttribute('data-action', 'add');
    button.setAttribute('class', 'icon-plus');
    input.value = '';
  }
      refreshTasks();
}

// FUNCTION WHICH REFRESHES OUR BROWSER CONTENT
function refreshTasks() {

  if ( database ) {

    var tasks = database.getItem('tasks');
    var tasksArray = JSON.parse( tasks );
    list.innerHTML = '';
    tasksArray.forEach(function(element, index) {
      list.innerHTML += `<li ${element.isCompleted ? 'class="completed"' : '' } data-index="${index}"><span>${element.text}</span><p class="innerLi">Čia bus laikas</p><button class="icon-minus-square"></button></li>`
    });

  setListener();
  }

}

// FUNCTION TO SET EVENT LISTENERS
function setListener() {
  var deleteButtons = document.querySelectorAll('li button');
  deleteButtons.forEach( function( element ){
    element.addEventListener('click', preRemoveTask);
    element.previousElementSibling.addEventListener('click', editTask);
    element.parentNode.addEventListener('dblclick', completed);
  } )
}

// FUNCTION TO DEFINE COMPLETED TASKS
function completed() {

  var index = this.getAttribute('data-index');
  var tasks = database.getItem('tasks');
  var tasksArray = JSON.parse( tasks );
  if (tasksArray[index].isCompleted) {

    tasksArray[index].isCompleted = false;

  } else {

    tasksArray[index].isCompleted = true;

  }

  database.setItem('tasks', JSON.stringify( tasksArray));
  refreshTasks();

}

// FUNCTION TO EDIT TASK
function editTask() {

// PADARYTI JOG REDAGUOTU SPAN TEXTA NE PARAGRAPHO
  // var text    = this.textContent;
  editIndex   = this.parentNode.getAttribute( 'data-index' );
  input.value = text;
  button.setAttribute( 'data-action', 'save' );
  button.setAttribute('class', 'icon-check');

}

 // FUNCTION THAT ASKS ARE YOU REALLY WANT TO DELETE TASKS
 function preRemoveTask() {
   if (confirm("Are you sure wonna delete this task?")) {
     var index = this.parentNode.getAttribute('data-index');
     var tasksJson = database.getItem('tasks');
     var tasksArray = JSON.parse( tasksJson );
     tasksArray.splice(index, 1);
     database.setItem('tasks', JSON.stringify( tasksArray ))
     refreshTasks();
 } else {
     alert("Goodjob! Never give up and do everything in time!");
 }
 }

// FUNCTION TO REMOVE TASK
// function removeTask() {
//   var index = this.parentNode.getAttribute('data-index');
//   var tasksJson = database.getItem('tasks');
//   var tasksArray = JSON.parse( tasksJson );
//   tasksArray.splice(index, 1);
//   database.setItem('tasks', JSON.stringify( tasksArray ))
//   refreshTasks();
// }

getDay();
// FUNCTION WHICH GETS DAY WHEN CONFIRMED A CHANGE
function getDay() {
    var d = new Date();
    var n = d.getDay();
  if (n == 1) {
    n = 'Monday';
  }
  else if (n == 2) {
    n = 'Tuesday';
  }
  else if (n == 3) {
    n = 'Wednesday';
  }
  else if (n == 4) {
    n = 'Thursday';
  }
  else if (n == 5) {
    n = 'Friday';
  }
  else if (n == 6) {
    n = 'Saturday';
  }
  else {
    n = 'Sunday';
  }
  return n;
}




}());
