function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

function convertTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return (str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2))
}

$(document).ready(function() {
  var manuallyStopped, timerStarted = false;
  var resetTimer = 1500;
  var stopSound = new Audio("http://www.ggaub.com/ltag/downloads/ATW-ON.WAV");
  
  var timer = $('#flipclock-timer').FlipClock(0, {
    autoStart: false,
    countdown: true,
/*    clockFace: 'MinuteCounter',*/
    callbacks: {
      interval: function() {
        var time = this.factory.getTime().time;
        if (time >= 0) {
          $('#timer-heading').text(convertTime(time));
        } else {
          this.stop();
          stopSound.play();
        }
      },
      init: function() {
        $('#timer-heading').text(convertTime(resetTimer));
      },
      start: function() {
        timerStarted = true;
      },
      stop: function() {
        timerStarted = false;
      },
    }
  });
  timer.setTime(resetTimer);

  $("#start-button").click(function() {
    timer.start();
  })

  $("#stop-button").click(function() {
    timer.stop();
  })

  $("#reset-button").click(function() {
    timer.stop();
    $('#timer-heading').text(convertTime(resetTimer));
    timer.setTime(resetTimer);
  })

  $("#minus-button").click(function() {
    if (timerStarted) return;
    var newTime;
    var curTime = timer.getTime().time;
    if (curTime < 60) {
      newTime = 0;
    } else {
      newTime = curTime - 59;
    }
    timer.setTime(newTime);
    $('#timer-heading').text(convertTime(newTime));
  })

  $("#add-button").click(function() {
    if (timerStarted) return;
    var newTime;
    var curTime = timer.getTime().time;
    if (curTime < 3540) {
      newTime = curTime + 61;
    } else {
      newTime = 3600;
    }
    timer.setTime(newTime);
    $('#timer-heading').text(convertTime(newTime));
  })

  $("#option1").click(function() {
    resetTimer = 1500;
    $("#reset-button").click();
    $("#label1").addClass("active");
    $("#label2").removeClass("active");
    $("#label3").removeClass("active");
  })
  $("#option2").click(function() {
    resetTimer = 300;
    $("#reset-button").click();
    $("#label1").removeClass("active");
    $("#label2").addClass("active");
    $("#label3").removeClass("active");
  })
  $("#option3").click(function() {
    resetTimer = 600;
    $("#reset-button").click();
    $("#label1").removeClass("active");
    $("#label3").addClass("active");
    $("#label2").removeClass("active");
  })

})