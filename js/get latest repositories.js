function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let name = [];
let data = [];
let link = [];
let IndexForStart = 0;
let IndexFroEnd = 0;
let dataLates = []; // repositories in descending order of dates

function get(code){
    if(code.indexOf('"name"') != -1){
        IndexForStart = code.indexOf('"name"') + 9;
        IndexForEnd = code.indexOf('"', IndexForStart);
        name.push(code.slice(IndexForStart, IndexForEnd));

        IndexForStart = code.indexOf('"updated_at"') + 15;
        IndexForEnd = code.indexOf('"', IndexForStart);
        data.push(code.slice(IndexForStart, IndexForEnd));

        IndexForStart = code.indexOf('"svn_url"') + 12;
        IndexForEnd = code.indexOf('"', IndexForStart);
        link.push(code.slice(IndexForStart, IndexForEnd));

        let code2 = code.slice(IndexForEnd);
        get(code2);
    }
}

get(httpGet("https://api.github.com/users/sveagruva/repos"));

data.forEach(function(item, i, data) {
    data[i] = data[i].replace("T", " ");
    data[i] = data[i].replace("Z", "");
});

function orderdates(data, i2){
    var min = "9999-99-99 99:99:99";
    dataLates[i2] = 0;

    data.forEach(function(item, i, data) {
       if((data[i].slice(0,data[i].indexOf(" "))).slice(0,(data[i].slice(0,data[i].indexOf(" "))).indexOf("-")) <=  (min.slice(0,min.indexOf(" "))).slice(0,(min.slice(0,min.indexOf(" "))).indexOf("-"))){
            //check yers
            if((data[i].slice(0,data[i].indexOf(" "))).slice(0,(data[i].slice(0,data[i].indexOf(" "))).indexOf("-")) <  (min.slice(0,min.indexOf(" "))).slice(0,(min.slice(0,min.indexOf(" "))).indexOf("-"))){
                min = data[i];
                dataLates[i2] = i;
            }else{
               
                if(data[i].slice(0,data[i].indexOf(" ")).slice(data[i].slice(0,data[i].indexOf(" ")).indexOf("-")+1).slice(0,data[i].slice(0,data[i].indexOf(" ")).slice(data[i].slice(0,data[i].indexOf(" ")).indexOf("-")+1).indexOf("-")) <= min.slice(0,min.indexOf(" ")).slice(min.slice(0,min.indexOf(" ")).indexOf("-")+1).slice(0,min.slice(0,min.indexOf(" ")).slice(min.slice(0,min.indexOf(" ")).indexOf("-")+1).indexOf("-"))){
                    //check mount
                    if(data[i].slice(0,data[i].indexOf(" ")).slice(data[i].slice(0,data[i].indexOf(" ")).indexOf("-")+1).slice(0,data[i].slice(0,data[i].indexOf(" ")).slice(data[i].slice(0,data[i].indexOf(" ")).indexOf("-")+1).indexOf("-")) == min.slice(0,min.indexOf(" ")).slice(min.slice(0,min.indexOf(" ")).indexOf("-")+1).slice(0,min.slice(0,min.indexOf(" ")).slice(min.slice(0,min.indexOf(" ")).indexOf("-")+1).indexOf("-"))){
                        //check day
                        if(data[i].slice(0,data[i].indexOf(" ")).slice(data[i].indexOf(data[i].slice(0,data[i].indexOf(" ")).slice(data[i].slice(0,data[i].indexOf(" ")).indexOf("-")+1).slice(0,data[i].slice(0,data[i].indexOf(" ")).slice(data[i].slice(0,data[i].indexOf(" ")).indexOf("-")+1).indexOf("-")))+3) <= min.slice(0,min.indexOf(" ")).slice(min.indexOf(min.slice(0,min.indexOf(" ")).slice(min.slice(0,min.indexOf(" ")).indexOf("-")+1).slice(0,min.slice(0,min.indexOf(" ")).slice(min.slice(0,min.indexOf(" ")).indexOf("-")+1).indexOf("-")))+3)){
                            if(data[i].slice(0,data[i].indexOf(" ")).slice(data[i].indexOf(data[i].slice(0,data[i].indexOf(" ")).slice(data[i].slice(0,data[i].indexOf(" ")).indexOf("-")+1).slice(0,data[i].slice(0,data[i].indexOf(" ")).slice(data[i].slice(0,data[i].indexOf(" ")).indexOf("-")+1).indexOf("-")))+3) == min.slice(0,min.indexOf(" ")).slice(min.indexOf(min.slice(0,min.indexOf(" ")).slice(min.slice(0,min.indexOf(" ")).indexOf("-")+1).slice(0,min.slice(0,min.indexOf(" ")).slice(min.slice(0,min.indexOf(" ")).indexOf("-")+1).indexOf("-")))+3)){
                                //check hour sec nanosec
                                if(data[i].slice(data[i].indexOf(" ")).slice(0,data[i].slice(data[i].indexOf(" ")).indexOf(":")) <= min.slice(min.indexOf(" ")).slice(0,min.slice(min.indexOf(" ")).indexOf(":"))){
                                    if(data[i].slice(data[i].indexOf(" ")).slice(0,data[i].slice(data[i].indexOf(" ")).indexOf(":")) == min.slice(min.indexOf(" ")).slice(0,min.slice(min.indexOf(" ")).indexOf(":"))){
                                        //check sec
                                        if(data[i].slice(data[i].indexOf(" ")).slice(data[i].slice(data[i].indexOf(" ")).indexOf(":")+1).slice(0,data[i].slice(data[i].indexOf(" ")).slice(data[i].slice(data[i].indexOf(" ")).indexOf(":")+1).indexOf(":")) < min.slice(min.indexOf(" ")).slice(min.slice(min.indexOf(" ")).indexOf(":")+1).slice(0,min.slice(min.indexOf(" ")).slice(min.slice(min.indexOf(" ")).indexOf(":")+1).indexOf(":"))){
                                            min = data[i];
                                            dataLates[i2] = i;
                                        }
                                    }else{
                                        min = data[i];
                                        dataLates[i2] = i;
                                    }
                                }
                            }else{
                                min = data[i];
                                dataLates[i2] = i;
                            }
                        }
                    }else{
                        min = data[i];
                        dataLates[i2] = i;
                    }
                }
            }
        }
    });

    if(data[dataLates[i2]] != "9999-99-99 99:99:99"){
        data[dataLates[i2]] = "9999-99-99 99:99:99";  
        orderdates(data, i2+1);
    }
}     

orderdates(data, 0);
dataLates.pop();
dataLates.reverse();

const rep = document.querySelector(".latest_repositories-content");
for (let i = 0; i < 3; i++) {
    if(dataLates[i] != undefined){
        // document.write("<a target='_blank' href='" + link[dataLates[i]] + "'>" + name[dataLates[i]] + "</a>");

        //body.insertAdjacentHTML('afterend', '<style>html::-webkit-scrollbar{display: none;}</style>'); if you don't know how to hide default scrollbar
        rep.insertAdjacentHTML('beforeend', "<a target='_blank' href='" + link[dataLates[i]] + "'>" + name[dataLates[i]] + "</a>");
    }
}
