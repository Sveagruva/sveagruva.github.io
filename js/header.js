function getWebHTMLContent(theUrl){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

document.querySelector("body").insertAdjacentHTML('afterbegin',getWebHTMLContent("/header.txt"));