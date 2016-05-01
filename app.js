const apiUrl  = `https://wiki.astha.me/w/api.php`

function getQuery(obj) {
    const query = Object.keys(obj).reduce((query, key) => {
        return query + `${key}=${encodeURIComponent(obj[key])}&`
    }, '?')
    return query.slice(0, -1)
}

function getUrl(obj) {
    return apiUrl + getQuery(obj)
}

function getData(data){
    var searchArr = data.query.search;
    return searchArr.map(v => ({
        snippet: v.snippet,
        title: v.title
    }));
}
function setData(data) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    var tabs = data.map(e => {
        var div = document.createElement('div');
        div.className = 'single-tab';
        div.innerHTML += `<h3>${e.title}</h3>`;
        div.innerHTML += `<p>${e.snippet}</p>`;
        div.onclick = () => {
            window.location.href = 'https://en.wikipedia.org/wiki/' + e.title;
        };
        return div;
    });

   tabs.forEach(tab => content.appendChild(tab));
}
function searchVal(){
    var y = document.getElementById('search-box').value;
    console.log(y);
    getWiki(y);
}
function getWiki(y){
    var url = getUrl({
        action: 'query',
        list: 'search',
        srsearch: y,
        format: 'json'
    })
    var x = document.getElementById('content');
    fetch(url)
    .then(response => response.json())
    .then(v => {
        console.log(v)
        return v;
    })
    .then(getData)
    .then(setData)
}
