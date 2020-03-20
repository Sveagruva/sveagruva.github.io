if(typeof(json) != "undefined"){
    let i = 0;
    json.forEach(element => {
        if(element.language == "Java" && i < 6){
            i++;
            document.write('<a class="repository" target="_blank" href="' + element.svn_url + '">');
            document.write('<div class="name">' + element.name + '</div>');
            document.write('<div class="description">' + (element.description != null ? element.description : "")  + '</div></a>');
        }
    });
    if(i == 0){
        document.write('<a class="repository">');
        document.write('<div class="name">seems like its empty</div></a>');
    }
}else{
    document.write("can't get repositories");
}