document.querySelector('#myForm').addEventListener('submit',saveBookmark);
addEventListener('DOMContentLoaded',fetchBookmarks);
function saveBookmark(e){
e.preventDefault();
// Get form values
const siteName=document.querySelector('#siteName').value;
const siteUrl=document.querySelector('#siteUrl').value;
if(!validateForm(siteName,siteUrl)){
    return false;
}

const bookmark={
    name:siteName,
    url:siteUrl
}
// Test if bookmark is null

if(localStorage.getItem('bookmarks')===null){
    let bookmarks=[];
    bookmarks.push(bookmark);
    // Set local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}else{
    // Get bookmark from localstorage
    let bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);

    // Reset to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

}
// Clear form
document.getElementById('myForm').reset();
fetchBookmarks();
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url===url){
            // Remove from local storage
           bookmarks.splice(i,1); 
        }
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

        fetchBookmarks();
    }
}

function fetchBookmarks(){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
  
    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;
  
      bookmarksResults.innerHTML += '<div class="card card-body mb-4 p-5 text-white bg-secondary">'+
                                    '<h3>'+name+
                                    ' <a class="btn btn-primary mt-3 mb-3" target="_blank" href="'+url+'">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger">Delete</a> ' +
                                    '</h3>'+
                                    '</div>';
    }
  }
  
  function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in all fields!');
        return false;
    }
    
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      if(!siteUrl.match(regex)){
          alert('Please use a valid URL');
          return false;
      }
      return true;
  }