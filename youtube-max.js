/* A bookmarklet to maximize any YouTube video in your browser (without going 
full-screen) and set an HD quality.

YouTube documentation: https://developers.google.com/youtube/js_api_reference

Author: Kamil Páral <github.com/kparal>, 2013
License: AGPLv3+
*/

quality = "hd720";

function getVideoID() {
  url = window.location.toString();
  if (url.indexOf("youtube.com") < 0) {
      return;
  }
  id = url.replace(/^.*[\?&]v=([^&]+).*/,"$1");
  return id;
}

function getCurrentTime() {
  mp = document.getElementById("movie_player");
  if (mp == null) {
    mp = document.getElementsByTagName("video")[0];
  }
  if (mp == null) {
    return;
  }
  return mp.getCurrentTime();
}

time = getCurrentTime();
if (time == null) {
  time = 0;
}

function main() {
  id = getVideoID();
  if (id == undefined) {
      return;
  }
  
  script2 = document.createElement("script");
  script2.type = "text/javascript";
  script2.text=['function onYouTubePlayerReady(playerId) {',
    'ytplayer = document.getElementById("myytplayer");',
    'ytplayer.setPlaybackQuality("'+quality+'");',
    '}'].join('\n');
  head.appendChild(script2);

  document.getElementsByTagName("body")[0].innerHTML='<div id="ytapiplayer">You need Flash player 8+ and JavaScript enabled to view this video.</div>';
  params = { allowScriptAccess: "always" };
  atts = { id: "myytplayer" };
  swfobject.embedSWF("http://www.youtube.com/v/"+id+"?enablejsapi=1&version=3&autoplay=1&autohide=1&start="+time,"ytapiplayer", "100%", "100%", "8", null, null, params, atts);
  
  history.pushState({}, '', '#max');
}

head = document.getElementsByTagName('head')[0];
script = document.createElement("script");
script.src="http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js";
script.onload = main;
head.appendChild(script);
void(0);

