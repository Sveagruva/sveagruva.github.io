function redirect(link){
    if(typeof(link) == "string"){
        window.location.replace(link);
        window.location.href = link;
    }else{
        console.log("SVcomfortable: redirect get something diferent from string")
    }
}

function getWebHTMLContent(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}