var timeoutLock = []; //To be used with the iterator 'it'; a variable to individualize every mouse-over triggering a tooltip
var it = 0;

const tooltipTrigger = document.querySelectorAll('.tipper'); //all elements which trigger a tooltip (which are '.input_box'es)
const tooltips = document.querySelectorAll('.tooltip.default'); //all tooltips

const buttonsChangeNumber = document.querySelectorAll('.buttons_change_number'); //All containers for the increment/decrement buttons - used by scroll
const buttonsIncrement = document.querySelectorAll('.change_number.increment'); //All increment-buttons for input[type=number]
const buttonsDecrement = document.querySelectorAll('.change_number.decrement'); //All decrement-buttons for input[type=number]

const buttonMinimize = document.querySelector('.util_button.button_smallscreen'); //The utility button to make the tool a snazzy window
const buttonMaximize = document.querySelector('.util_button.button_fullscreen'); //The utility button to not make the tool a snazzy window (aka fullscreen)
const buttonClose = document.querySelector('.util_button.button_close'); //The utility button to close the tool and go back to the menu

//Event-listeners which do stuff - ForEach not valid due to IE support
 //Procedure of tooltips showing and hiding when the mouse has entered or left the specified area
for (i = 0; i < tooltipTrigger.length; i++ ) {
  tooltipTrigger[i].addEventListener('mouseenter', tooltipIn);
  tooltipTrigger[i].addEventListener('mouseleave', tooltipOut);
}
 //Incrementing the specific input after the increment button has been pressed
for (i = 0; i < buttonsIncrement.length; i++) {
  buttonsIncrement[i].addEventListener('click', inputIncrement);
}
 //Decrementing the specific input after the decrement button has been pressed
for (i = 0; i < buttonsDecrement.length; i++) {
  buttonsDecrement[i].addEventListener('click', inputDecrement);
}
 //Adding an eventListener for a trigger of the scroll wheel on the increment/decrement buttons
for (i = 0; i < buttonsChangeNumber.length; i++) {
  buttonsChangeNumber[i].addEventListener('wheel', inputNumberScroll);
}
 //Adding eventlisteners for the specific use-cases of the utility buttons
buttonMinimize.addEventListener('click', minimizeTool);
buttonMaximize.addEventListener('click', maximizeTool);
buttonClose.addEventListener('click', closeTool);

//Functions for the utility buttons
 //Making the tool a cool window
function minimizeTool() {
  if (!this.classList.contains('active')) {
    document.body.classList.remove('fullscreen')
	buttonMaximize.classList.remove('active');
	this.classList.add('active');
  }
}
 //Making the tool fullscreen
function maximizeTool() {
  if (!this.classList.contains('active')) {
    document.body.classList.add('fullscreen')
	buttonMinimize.classList.remove('active');
	this.classList.add('active');
  }
}
function closeTool() {
  document.body.classList.add('closing');
  setTimeout(function() {
    window.location = '../tools.html';
  }, 400);
}

//Computing tooltips
for (i = 0; i < tooltips.length; i++) {
  tooltips[i].style.clipPath = 'polygon(-5px 150%, 13px -50%, ' + (tooltips[i].offsetWidth + 5) + 'px -50%, ' + (tooltips[i].offsetWidth - 13) + 'px 150%)';
}

//Tooltips when having hovered over a specific element (most-likely every input_box) for a specific amount of time
 //Execution of the procedure once the mouse has entered the target
function tooltipIn() {
  let eventTarget = this;
  timeoutLock[it] = eventTarget;
  setTimeout(function() {
    if (timeoutLock[it] == eventTarget) {
      eventTarget.classList.add('active_tip');
    }
  }, 700);
}
 //Termination of the procedure once the mouse has exited the target
function tooltipOut() {
  timeoutLock[it] = null;
  it++;
  let eventTarget = this;
  eventTarget.classList.remove('active_tip');
}

//Increment / decrement of input[type=number] on the specific buttons - global for all input[type=number]
 //Execution via a click
function inputIncrement() {
  let thisInput = this.parentNode.parentNode.children[0];
  thisInput.value++;
  thisInput.focus();
}
function inputDecrement() {
  let thisInput = this.parentNode.parentNode.children[0];
  thisInput.value--;
  thisInput.focus();
}
 //Execution via a scroll wheel event
function inputNumberScroll(e) {
  let scrollY = e.deltaY;
  if (scrollY == 0) {
    return;
  }
  let thisInput = this.parentNode.children[0];
  if (scrollY > 0) {
    thisInput.value--;
  }
  else if (scrollY < 0) {
    thisInput.value++;
  }
  thisInput.focus();
}
