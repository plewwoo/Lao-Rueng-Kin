var myIndex1 = 0;
var myIndex2 = 1;
var myIndex3 = 2;
carousel();
carousel2();
carousel3();

function carousel() {
  var i;
  var x = document.getElementsByClassName("pic1");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex1++;
  if (myIndex1 > x.length) {myIndex1 = 1}    
  x[myIndex1-1].style.display = "block";  
  setTimeout(carousel, 5000); // Change image every 2 seconds
}

function carousel2() {
  var i;
  var x = document.getElementsByClassName("pic2");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex2++;
  if (myIndex2 > x.length) {myIndex2 = 1}    
  x[myIndex2-1].style.display = "block";  
  setTimeout(carousel2, 5000); // Change image every 2 seconds
}

function carousel3() {
  var i;
  var x = document.getElementsByClassName("pic3");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex3++;
  if (myIndex3 > x.length) {myIndex3 = 1}    
  x[myIndex3-1].style.display = "block";  
  setTimeout(carousel3, 5000); // Change image every 2 seconds
}