console.log('Loaded!');
//alert("eree");

window.onload = function() {
	//alert("eree");
};

var counter=0;
var button = document.getElementById("btnCounter");
//alert(btnCtr.id);

button.onclick=function(){
	//alert(counter);
	/*var span = document.getElementById("spanCounter");
	counter++;
	span.innerHTML = counter.toString();*/

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState === XMLHttpRequest.DONE) {
			if(request.status===200) {
				var ctr=request.responseText;
				var span = document.getElementById("spanCounter");
				span.innerHTML = ctr.toString();
			}
		}
	};

	//request.open('GET','http://localhost/counter',true);
	request.open('GET','http://sankeerthsharma1.imad.hasura-app.io/counter',true);
	
	request.send(null);
};

var buttonSubmit = document.getElementById("btnSubmit");
//alert(buttonSubmit.id);


buttonSubmit.onclick=function(){
	//alert("abcd");

	var elmntName = document.getElementById("name");
	var nameVal = elmntName.value;

	var ulList = document.getElementById("nameList");

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState === XMLHttpRequest.DONE) {
			if(request.status===200) {
				var strNames="";
				//var names = ["name1", "name2", "name3"];
				var names=request.responseText;
				names = JSON.parse(names);
				for (var i=0;i<names.length;i++) {
					strNames += "<li>"+names[i]+"</li>";
				}
				
				//alert(strNames);
				ulList.innerHTML = strNames;
			}
		}
	};

	//request.open('GET','http://localhost/submitName?name='+nameVal,true);
	request.open('GET','http://sankeerthsharma1.imad.hasura-app.io/submitName?name='+nameVal,true);
	
	request.send(null);	
};

var buttonComment = document.getElementById("btnComment");
alert(buttonComment.id);

buttonComment.onclick=function(){
	alert("abcd");
};