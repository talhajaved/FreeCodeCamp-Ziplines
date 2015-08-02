var memoryString = " ";
var displayString = "0";
var calculatorLocked = false;

$(".digit-button").click(function() {
  if (calculatorLocked) return;
  memoryString += $(this).text();
  $("#memory-screen").text(memoryString + "_");
})

$(".sign-button").click(function() {
  if (calculatorLocked) return;
  if (memoryString.length === 0) {
    memoryString += "Ans" + $(this).val();
  } else {
    memoryString += $(this).val();
  }
  $("#memory-screen").text(memoryString + "_");
})

$("#equal-button").click(function() {
  if (calculatorLocked) return;
  if ($("#memory-screen").text() === "_") {
    return
  }
  if ($("#memory-screen").text() === " " + $("#display-screen").text()) {
    return
  }
  try {
    var Ans = Number(displayString);
    displayString = eval(memoryString).toString();
    $("#memory-screen").text(memoryString);
    memoryString = '';
    $("#display-screen").text(displayString);
  } catch (err) {
    calculatorLocked = true;
    $("#memory-screen").text("ERROR");
    $("#display-screen").text("ERROR");
  }
})

$("#clear-button").click(function() {
  calculatorLocked = false;
  displayString = "0";
  memoryString = '';
  $("#display-screen").text(displayString);
  $("#memory-screen").text(memoryString + "_");
})

$("#backspace-button").click(function() {
  if (calculatorLocked) return;
  if ($("#memory-screen").text().slice(-1) !== "_") {
    memoryString = $("#memory-screen").text(); 
  }
  if (memoryString.length === 0) {
    memoryString = memoryString;
  } else if (memoryString.length > 2 && memoryString.slice(-3) === "Ans") {
    memoryString = memoryString.slice(0, -3); 
  } else {
    memoryString = memoryString.slice(0, -1);
  }  
  $("#memory-screen").text(memoryString + "_");
  
})