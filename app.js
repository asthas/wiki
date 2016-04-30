function getWiki(){
    var url = "http://en.wikipedia.org/w/api.php?callback=?";
    var x = document.getElementById('i');
    x.setAttribute('src', url);
}
getWiki();
