function getAndUpdate(){
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if(tit==""){
        return;
    }
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}

function update(){
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = []; 
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } 
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    // Populate the table
    let tableBody = document.getElementById("tablebody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td><button class="btn btn-sm btn-primary task" id="row${index}"  >Done</button></td> 
        </tr>`; 

    });

    

    tableBody.innerHTML = str;

    let deleteIndex = document.querySelectorAll(".task");

    deleteIndex.forEach((element,index)=> element.addEventListener("click",function(){
        deleted(index);
    }));

    if(str===""){
        document.getElementById("items").style.visibility="hidden";
        document.getElementById("empty").style.display="block";
    }
    else{
        document.getElementById("items").style.visibility="visible";
        document.getElementById("empty").style.display="none";

    }

}


add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

let titleBox =document.getElementById("title");
titleBox.addEventListener("keyup",function(event){
    if(event.code=== "Enter" ){
        console.log("ente");
        // add.click();
        getAndUpdate();
    }
});

let desBox =document.getElementById("description");
desBox.addEventListener("keyup",function(event){
    if(event.code=== "Enter" ){
        console.log("ente");
        // add.click();
        getAndUpdate();
    }
});


 

function deleted(itemIndex){

    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();


}



// for (i of deleteIndex) {
//     i.addEventListener('click', deleted(i.dataset.ind)
//     )};
// for (let i = 0; i < deleteIndex.length; i++) {
//         deleteIndex[i].addEventListener("click",deleted(deleteIndex[i].dataset.ind));
//   }
  

function clearStorage(){
    if (confirm("Do you really want to clear?")){
    console.log('Clearing the storage');
    localStorage.clear();
    update();

    }
}

clearStor=document.getElementById("clearStorage");
clearStor.addEventListener("click",clearStorage);