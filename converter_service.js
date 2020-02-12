const path = require("path");
const exec = require("child_process").exec;

const url = `https://v.bizuni.vn/video/asset/video/186/186.m3u8?v=${Math.round(
  new Date().getTime() / 1000
)}`;
const urlTest =
  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

function initialize() {
  var urls = [urlTest];

  var headers = {};

  function loadVideo(des, url, headers) {
    var header = "";
    if (headers) {
      header = ' -headers "';
      var headerCount = 0;
      for (var h in headers) {
        header += h + ": ";
        header += headers[h];
        if (headerCount < headers.length - 1) header += ",";
        headerCount++;
      }
      header += '"';
    }

    console.log("Downloading video : " + url);
    const cmd = `ffmpeg -i ${url} -c copy -bsf:a aac_adtstoasc ${des}`;
    // Run cmd
    exec(cmd, function(error, stdout, stderr) {
      console.log("End process");
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
      if (error !== null) {
        console.log(" exec error: " + error);
      }
    });
  }

  for (var i = 0; i < urls.length; i++) {
    loadVideo("./video/video-" + i + ".mp4", urls[i], headers);
  }
}
module.exports = {
  initialize
};
