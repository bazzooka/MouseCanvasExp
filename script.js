var bubble = document.getElementById('bubble')
  mouseX = 0,
  mouseY = 0,
  lastMouseX = -1,
  lastMouseY = -1,
  mouseSpeed = 0,
  rotation = 0,
  nullObj = {
    x: 0,
    y: 0
  };

document.addEventListener("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseSpeed = Math.max(Math.abs(lastMouseX - mouseX), Math.abs(lastMouseY - mouseY));
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  
});

var updatePath = function() {
  var path = bubble.getAttribute('d');
  var largeur = 100,
    hauteur = 70,
    startX = mouseX,
    startY = mouseY - hauteur,
    larg2 = mouseX - largeur / 2,
    offsetX = 40;

  //nullObj.x = larg2;

  TweenMax.to(nullObj, mouseSpeed / 50, {
    x: larg2,
    y: startY,
    ease: Power1.easenone
  });

  var newPath = "",
    startPosition = "M" + (nullObj.x) + ", " + startY + " ",
    arc = "A 25 25 45 1 1 " + (nullObj.x + largeur) + " " + startY + " ",
    curve1 = "C " + (nullObj.x + largeur) + " " + (nullObj.y + 50) + " " + (nullObj.x + offsetX) + " " + (nullObj.y + 70) + " " + mouseX + " " + mouseY,
    curve2 = "C " + (nullObj.x + offsetX) + " " + (nullObj.y + 70) + " " + (nullObj.x) + " " + (nullObj.y + 50) + " " + nullObj.x + " " + startY;
 
  newPath = startPosition + arc + curve1 + curve2;

  bubble.setAttribute('d', newPath);
  
  rotation = Math.atan2((nullObj.x + largeur/2)- mouseX,- ((nullObj.y)- mouseY) )*(180/Math.PI);	
  
  bubble.style['transform-origin'] = mouseX + "px " + mouseY + "px";
  
  bubble.style.transform = "rotate(" + rotation + "deg)";
}

var onUpdate = function(time) {
  updatePath();
  //console.log(nullObj.x);
  requestAnimationFrame(onUpdate);
}

onUpdate(0);