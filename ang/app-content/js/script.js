function toggleVideo(state) {
   // document.getElementById("GlobalPlayer").setAttribute("ng-controller", "PlayerController");

    var div = document.getElementById("playing-music");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    func = state == 'show' ? 'playVideo' : 'pauseVideo';
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
   
    if(state == 'show') {
      document.getElementById("playButton").style.display = "none";
      document.getElementById("pauseButton").style.display = "inline-block";
    }
    else {
      document.getElementById("playButton").style.display = "inline-block";
      document.getElementById("pauseButton").style.display = "none";
    }
}

function repeatButtonShow()
{
	document.getElementById("playButton").style.display = "none";
      document.getElementById("pauseButton").style.display = "none";
      document.getElementById("repeatButton").style.display = "inline-block";

}

function changeSrc() {
   player.loadVideoById("https://www.youtube.com/embed/JpngcB-XoGI"); // tipo pakeičia dainą, bet current time neveikia. Veikį tik pas Dovį
}
function toggleVideoExpand(state) {
	if(state == 'show') {
		document.getElementById("playing-music").style.display = "block";
		document.getElementById("expandButton").style.display = "none";
		document.getElementById("compressButton").style.display = "inline-block";
		document.getElementById("fullExpandButton").style.display = "inline-block";
		document.getElementById("fullCompressButton").style.display = "none";
		document.getElementById("playing-music").classList.remove("full-width-expanded-video");
	} else if(state == 'full-width') {
		document.getElementById("fullExpandButton").style.display = "none";
		document.getElementById("fullCompressButton").style.display = "inline-block";
		document.getElementById("playing-music").classList.add("full-width-expanded-video");
	} else if(state == 'compress-full-width') {
		document.getElementById("fullExpandButton").style.display = "inline-block";
		document.getElementById("fullCompressButton").style.display = "none";
		document.getElementById("playing-music").classList.remove("full-width-expanded-video");
	} else {
		document.getElementById("playing-music").style.display = "none";
		document.getElementById("expandButton").style.display = "inline-block";
		document.getElementById("compressButton").style.display = "none";
		document.getElementById("fullExpandButton").style.display = "none";
		document.getElementById("fullCompressButton").style.display = "none";
		document.getElementById("playing-music").classList.remove("full-width-expanded-video");
	}
}

// function progress(percent, $element) {
//   var progressBarWidth = percent * $element.width() / 100;

// // $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
//   console.log("progressBarWidth: " + progressBarWidth);
//   $element.find('#progressBar').animate({ width: progressBarWidth });
// }

 //   (function (window) {
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
      events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
      }
  });
}
var time_update_interval;
//})(window);
function onPlayerReady(event){
  //  player.mute();
  // $('#full-time').html(secondsTimeSpanToHMS(Math.ceil(player.getDuration())));
  // videoStarted = true;

   // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)
}

// function secondsTimeSpanToHMS(s) {
//     var h = Math.floor(s/3600); //Get whole hours
//     s -= h*3600;
//     var m = Math.floor(s/60); //Get remaining minutes
//     s -= m*60;
//     return m+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
// }

$(document).bind("DOMSubtreeModified",function(){
  $('#progress-bar').on('mouseup touchend', function (e) {
      // Calculate the new time for the video.
      // new time in seconds = total duration in seconds * ( value of range input / 100 )
      var newTime = player.getDuration() * (e.target.value / 100);

      // Skip video to new time.
      player.seekTo(newTime);

  });
  // $('.main-display .song.item .item-image .item-name').matchHeight();
})

$(document).bind("DOMSubtreeModified",function(){
  if(window.location.hash == '#!/register' || window.location.hash == '#!/login') {
    $('#navbar-login').show();
    $('#navbar-logout').hide();
    $('#hello-user').hide();
  } else {
    $('#navbar-login').hide();
    $('#navbar-logout').show();
    $('#hello-user').show();
  }
})

// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}

// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() ));
}

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}

// $('#full-time').html(player.getDuration())

// setInterval(CheckVideoTime,1000);

// function CheckVideoTime() {
//   if(videoStarted) {
//     $('#current-time').html(secondsTimeSpanToHMS(Math.ceil(player.getCurrentTime())));
//   }
// }

var isClicked = false;
$( "#repeatButton" ).on( "click", function() {
  isClicked = true;
});

function onPlayerStateChange(event) {
  if (event.data === 0){  // kai video pasibaigia užkrauna kitą
    // Repeat knopkė vietoj pause
    repeatButtonShow();
    setTimeout(function(){ 
      if(!isClicked) {
        $('#NextSongTrigger').click();
        onYouTubePlayerAPIReady(); 
      }
    }, 2000);    
  }
  else if (event.data === 2){  // kai video pasibaigia užkrauna kitą
    // Paused knopkė
    toggleVideo('hide')
  }
  else if (event.data === 1){  // kai video pasibaigia užkrauna kitą
    // Play knopkė
    toggleVideo('show')
  }

  // var mytimer;
  // if (event.data == YT.PlayerState.PLAYING) {

  //   var playerTotalTime = player.getDuration();

  //   mytimer = setInterval(function() {
  //     var playerCurrentTime = player.getCurrentTime();
  //     console.log("playerCurrentTime: " + playerCurrentTime);
  //     var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;

  //     console.log("playerTimeDifference: " + playerTimeDifference);
  //     progress(playerTimeDifference, $('#progressBar'));
  //   }, 1000);        
  // } else {
    
  //   clearTimeout(mytimer);
  // }

}


