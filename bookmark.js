class bookmark {
	 constructor(name,url){
		 this.name = name;
		 this.url = url;
	}
}
class UI {
	// function for displying you favourite websites
 static displayBookmarks(){
 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var websiteList = document.querySelector(".website-list");
  websiteList.innerHTML = "";
if(bookmarks !== null){
  for(var i=0; i<bookmarks.length; i++){
  	let name = bookmarks[i].name;
  	let url = bookmarks[i].url;
  	websiteList.innerHTML += `<div class="list">
  	<h3>${name}</h3>
  	<a class="vis-web" target="_blank" href="${url}">Visit</a>
  	<a class="delete" onclick=deleteBookMark("${url}") href="#">Delete</a>
  	</div>`
  }
}
 }
 

 static validateForm(name,url){
 	if(!name || !url){
 		alert("please fill all fields")
 		return false;
 	}

  var expression = /[a-zA-Z0-9@:%._\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%._\+.~#?&//=]*)?/gi;
 	var regex = new RegExp(expression);
 	if(!url.match(regex)){
 		alert("Please use a valid URL");
 		return false;
 	}
 	return true;
 
 }
 static saveBookMark(Bookmark){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var websiteList = document.querySelector(".website-list");
  websiteList.innerHTML = "";

  for(var i=0; i<bookmarks.length; i++){
  	let name = bookmarks[i].name;
  	let url = bookmarks[i].url;
  	websiteList.innerHTML += `<div class="list">
  	<h3>${name}</h3>
  	<a class="vis-web" target="_blank" href="${url}">Visit</a>
  	<a class="delete" onclick=deleteBookMark("${url}") href="#">Delete</a>
  	</div>`
  }
 
 }

}


class store {
	static storeBookMark(Bookmark){
		if(localStorage.getItem('bookmarks') === null){
			var bookmarks = [];
			bookmarks.push(Bookmark);
			localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
		}else {
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			bookmarks.push(Bookmark);
			localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
		}
	
	}

}




document.addEventListener('DOMContentLoaded',UI.displayBookmarks());
const form = document.querySelector(".form");
form.addEventListener('submit',(e)=>{
	e.preventDefault();
	const name = document.querySelector(".website-input").value;
	const url = document.querySelector(".url-input").value;
	if(UI.validateForm(name,url)){
		const Bookmark = new bookmark(name,url);
		store.storeBookMark(Bookmark);
		UI.saveBookMark(Bookmark);
	
	}
	document.querySelector(".form").reset()
})

function deleteBookMark(url){
	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(let i=0; i<bookmarks.length; i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i,1)
		}
	}
	localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
	UI.displayBookmarks()
}