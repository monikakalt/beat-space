function toggleVideo(state) {
    var div = document.getElementById("popupVid");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    func = state == 'show' ? 'playVideo' : 'pauseVideo';
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
   
    if(state == 'show') {
      document.getElementById("playButton").style.display = "none";
      document.getElementById("pauseButton").style.display = "block";
    }
    else {
      document.getElementById("playButton").style.display = "block";
      document.getElementById("pauseButton").style.display = "none";
    }
}



// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         events: {
//             'onReady': onPlayerReady
//         }
//     });
// }

// function onPlayerReady(event) {
//     event.target.playVideo();
// }

//   v = 0.1;
//   v1 = 0.5;
//   v2 = 0.6;

//   console.log(Math.ceil(v));
//   console.log(Math.ceil(v1));
//   console.log(Math.ceil(v2));

// setInterval(CheckVideoTime,1000);

// function CheckVideoTime() {
//   console.log(Math.ceil(player.getCurrentTime()));
// }
