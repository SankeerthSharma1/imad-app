var buttonComment = document.getElementById("btnComment");
//alert(buttonComment.id);

/*buttonComment.onclick=function(){
	alert("abcd");
};*/

function postComment() {	
	var elmntComment= document.getElementById("comment");
	var commentVal = elmntComment.value;
	//alert(commentVal);
	var commentList = document.getElementById("commentList");

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState === XMLHttpRequest.DONE) {
			if(request.status===200) {
				var strComments="";
				//var names = ["name1", "name2", "name3"];
				var comments=request.responseText;
				comments = JSON.parse(comments);
				for (var i=0;i<comments.length;i++) {
					strComments += "<li>"+comments[i]+"</li>";
				}
				
				//alert(strComments);
				commentList.innerHTML = strComments;
			}
		}
	};

	request.open('GET','http://localhost/submitComment?comment='+commentVal,true);
	request.send(null);	
}
