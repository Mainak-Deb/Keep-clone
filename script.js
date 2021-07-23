
var thm = document.querySelector(':root');
var neg=false;

let db = new Localbase('db')






function tooglemode(){
    if(neg){
        neg=false;
        thm.style.setProperty('--theme', "#ffffff" );
        thm.style.setProperty('--theme2',"#edebeec6");
        thm.style.setProperty('--themefont',"#2e2d2fc6");
    }else{
        neg=true;
        thm.style.setProperty('--theme', "#191919f1" );
        thm.style.setProperty('--theme2',"#565454c7");
        thm.style.setProperty('--themefont',"#f3f3f3c6");
    }
}

function newinput(){
    document.getElementById("notenormal").style.display = "none";
    document.getElementById("notetake").style.display = "block";
}

function closeinput(){
    document.getElementById("notenormal").style.display = "block";
    document.getElementById("notetake").style.display = "none";
    document.getElementById("titleinput").value="";
    document.getElementById("bodyinput").value="Please take a note";
    document.getElementById("bodyinput").style.backgroundColor='var(--theme2)';
    document.getElementById("titleinput").style.backgroundColor='var(--theme2)';
    document.getElementById("inputoptions").style.backgroundColor='var(--theme2)';
    
}


function colorinput(x){
    document.getElementById("titleinput").style.backgroundColor = x;
    document.getElementById("bodyinput").style.backgroundColor =x;
    document.getElementById("inputoptions").style.backgroundColor =x;
    
}



function takeinput(){
    var title = document.getElementById("titleinput").value;
    var note = document.getElementById("bodyinput").value;
    var bgcolour = document.getElementById("bodyinput").style.backgroundColor;
    var makeborder;
    
    var maindata={
       title: title,
       note: note,
       col:bgcolour
    }

    db.collection('notes').add(maindata)
    
    
    console.log(maindata);
    document.getElementById("titleinput").value="";
    document.getElementById("bodyinput").value="Please take a note";
    document.getElementById("bodyinput").style.backgroundColor='var(--theme2)';
    document.getElementById("titleinput").style.backgroundColor='var(--theme2)';
    document.getElementById("inputoptions").style.backgroundColor='var(--theme2)';
    
    closeinput();
    location.reload();
    
}
function loadtext(){
    var x=document.getElementById('bodyinput').value;
    var cmp="Please take a note"
    if(x.localeCompare(cmp)==0){
        console.log(x)
        document.getElementById('bodyinput').value=""
    }else{
        console.log(x)
    }
}
function reloadnotes(){
    console.log("problem")
    db.collection('notes').get().then(keeps => {
        var notefield=``;
        if(keeps.length>0){
        for (let x in keeps) {
            console.log(keeps[x].title);
            console.log(x);
            var bgcolour=keeps[x].col;
            if(bgcolour==''){
                bgcolour=`var(--theme)`
                var makeborder="border: 2px solid var(--theme2);"
            }else{
                var makeborder="";
            }
            var newnote=`<div  class="noteitems" style="background-color:`
                + keeps[x].col+`;`+makeborder+
                `;"> <section class="boxtitle">`
                +keeps[x].title+
                `</section> <hr><section  class="boxbody">`
                + keeps[x].note+
                `</section></div>`
            notefield=newnote+notefield
            //console.log(notefield)
        }
        document.getElementById("mainnotes").innerHTML=notefield;
    }
    })
}

reloadnotes();

