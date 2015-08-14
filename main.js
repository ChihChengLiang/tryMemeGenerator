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

  var updateCanvasImage = function(memeObj) {
    return function() {
      img.src = memeObj.file;
      canvas.height = memeObj.original_meta.height *
        canvasMaxWidth / memeObj.original_meta.width;
      render();
    }
  }

  var xhr = new XMLHttpRequest();
  var url = "http://i.memeful.com/api/all";
  xhr.open("GET", url, true);

  var data = {};

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);
      console.log(resp.data);
      data = resp.data;
      Object.keys(data).slice(0, 20).map(function(key) {
        var memeImg = document.createElement('img');
        memeImg.setAttribute("src", data[key].thumbnail);
        memeImg.setAttribute("alt", data[key].name);
        memeImg.addEventListener("click", updateCanvasImage(data[key]));
        sampleMemes.appendChild(memeImg);
      });

    }
  }
  xhr.send();

  var searchBar = document.getElementById('search-bar');
  var searchSuggestions = document.getElementById('search-suggestions');

  var createSuggestionElement = function(memeObj) {
    var suggestion = document.createElement('li');
    var container = document.createElement('div');
    var suggestionImg = document.createElement('img');
    suggestionImg.src = memeObj.thumbnail;
    suggestionImg.setAttribute("class", "thumb");
    var t = document.createTextNode(memeObj.name);
    container.setAttribute("class", "suggestion-item")
    container.appendChild(suggestionImg);
    container.appendChild(t);
    container.addEventListener("click", updateCanvasImage(memeObj));
    suggestion.appendChild(container);
    searchSuggestions.appendChild(suggestion);
  }

  searchBar.addEventListener("keyup", function() {
    console.log(this.value);
    while (searchSuggestions.firstChild) {
      searchSuggestions.removeChild(searchSuggestions.firstChild);
    }
    if (this.value != "") {
      var pattern = new RegExp(this.value, 'i');
      var results = Object.keys(data)
        .filter(function(key) {
          return pattern.test(data[key].name);
        })
        .map(function(key) {
          return data[key];
        });
      console.log(results);
      results.slice(0, 4).map(createSuggestionElement);
    }
  });

}
