
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
        thm.style.setProperty('--theme2',"#565454");
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

function colorinput2(x){
    document.getElementById("titleinput2").style.backgroundColor = x;
    document.getElementById("bodyinput2").style.backgroundColor =x;
    document.getElementById("inputoptions2").style.backgroundColor =x;
}


function takeinput(){
    var title = document.getElementById("titleinput").value;
    var note = document.getElementById("bodyinput").value;
    var bgcolour = document.getElementById("bodyinput").style.backgroundColor;
    var makeborder;
    
    var maindata={
       id:Date.now(),
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
            var newnote=`<div  class="noteitems" onclick='openmodal(["`+
            String( keeps[x].id)+`","`+String( keeps[x].title)+`","`+String( keeps[x].note)+`","`+String( keeps[x].col)
            +`"])' id="note`+
            keeps[x].id
            +`" style="background-color:`
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






var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");


function openmodal(x){
    document.getElementById("idinput").innerHTML =x[0];
    document.getElementById("titleinput2").value=x[1];
    document.getElementById("bodyinput2").value=x[2];
    document.getElementById("titleinput2").style.backgroundColor = x[3];
    document.getElementById("bodyinput2").style.backgroundColor =x[3];
    document.getElementById("inputoptions2").style.backgroundColor =x[3];
    
    modal.style.display = "block";

}


function editmodal(){
    id=parseInt(document.getElementById("idinput").innerHTML);
    newtitle=document.getElementById("titleinput2").value;
    newbody=document.getElementById("bodyinput2").value;
    newcol=document.getElementById("bodyinput2").style.backgroundColor;
    console.log(id,newtitle,newbody,newcol)
    db.collection('notes').doc({ id: id }).update({
        title: newtitle,
        note: newbody,
        col:newcol
    })
    closemodal();
    location.reload();
}



function closemodal(){
    modal.style.display = "none";
}


function deletenote(){
    id=parseInt(document.getElementById("idinput").innerHTML);
    db.collection('notes').doc({ id: id }).delete();
    closemodal();
    location.reload();
}

var input = document.getElementById("titlesearch");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   searchtitle();
  }
});


function searchtitle(){
    var searchvalue=document.getElementById("titlesearch").value;
    console.log(searchvalue)
    db.collection('notes').doc({ title: searchvalue }).get().then(document => {
        console.log(document)
      })
}



var span = document.getElementsByClassName("close")[0];

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




