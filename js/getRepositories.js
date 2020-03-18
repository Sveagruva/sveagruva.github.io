function httpGet(Url)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", Url, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var json = JSON.parse(httpGet("https://api.github.com/users/sveagruva/repos"));

json.sort(function(a, b) {
    a = new Date(a.pushed_at);
    b = new Date(b.pushed_at);
    return a>b ? -1 : a<b ? 1 : 0;
});