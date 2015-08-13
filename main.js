window.onload = function() {
  var canvas = document.getElementById('main-canvas');
  var topCaption = document.getElementById('top-caption');
  var bottomCaption = document.getElementById('bottom-caption');
  var csl = document.getElementById('csl');
  var btnDownload = document.getElementById('download');
  var sampleMemes = document.getElementById('sample-memes');
  var ctx = canvas.getContext('2d');
  var canvasMaxWidth = 300;
  var margin = 0.05;

  var img = new Image();
  img.src = "/cat.jpg";

  var drawImg = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  var drawText = function(text, x, y) {
    var params = [text, x, y, canvas.width];
    ctx.font = "30px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillText.apply(ctx, params);
    ctx.strokeText.apply(ctx, params);
  }

  var drawTextLine = function(text, top) {
    var lines = text.split("\n");
    for (ii = 0; ii < lines.length; ii++) {
      var wid = ctx.measureText(lines[ii]).width;
      var x = canvas.width > wid ? canvas.width / 2 - wid / 2 : 0;
      var y = (top ? 30 : canvas.height - 30) + 30 * ii;
      drawText(lines[ii], x, y);
    }
  }

  var drawWholeText = function() {
    topLine = topCaption.value.toUpperCase();
    bottomLine = bottomCaption.value.toUpperCase();
    drawTextLine(topLine, true);
    drawTextLine(bottomLine);
  }

  var render = function() {
    drawImg();
    drawWholeText();
  }
  topCaption.addEventListener("keyup", render, false);
  bottomCaption.addEventListener("keyup", render, false);

  img.addEventListener("load", function() {
    drawImg();
    drawWholeText();
  }, false);

  var downloadCanvas = function(link, filename) {
    link.href = canvas.toDataURL();
    link.download = filename;
  }

  btnDownload.addEventListener("click", function() {
    downloadCanvas(this, "foo.png");
  });

  var xhr = new XMLHttpRequest();
  var url = "http://i.memeful.com/api/all";
  xhr.open("GET", url, true);


  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);
      console.log(resp.data);
      var data = resp.data;
      Object.keys(data).slice(0, 20).map(function(key) {
        var memeImg = document.createElement('img');
        var src = data[key].file;
        memeImg.setAttribute("src", src);
        memeImg.setAttribute("alt", data[key].name);
        memeImg.addEventListener("click", function() {
          img.src = src;
          canvas.height = data[key].original_meta.height *
            canvasMaxWidth / data[key].original_meta.width;

          render();
        })
        sampleMemes.appendChild(memeImg);
      });

    }
  }
  xhr.send();
}
