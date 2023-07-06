const gameBoard = document.querySelector("#gameBoard");
const digits = document.querySelector("#digits");
//const delete =document.querySelector("#delete");
let prevSelected=null;

window.onload = () => {
    for (let i = 0; i < 9; i++) {
       for (let j = 0; j < 9; j++) {
          const div = document.createElement("div");
          div.classList.add("tile");
          div.id =i*9+j;
          div.addEventListener("click",selectTile);
          //div.setAttribute("row",i);
          //div.setAttribute("col",j);
          if(i==2||i==5){
            div.classList.add("border-bottom");
          }
          if(j==2 || j==5){
            div.classList.add("border-right");
          }
          gameBoard.appendChild(div);
          
      }
   }

   for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("tile");
    div.innerText = i + 1;  
    div.addEventListener("click",addNum);
    digits.appendChild(div);
 }

 var arr= [[], [], [], [], [], [], [], [], []];
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}

var board = [[], [], [], [], [], [], [], [], []];
function fillboard(board) {
  for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
          if (board[i][j] != 0) {
              arr[i][j].innerText = board[i][j];
              arr[i][j].classList.add("filled");
          }
          else{
              arr[i][j].innerText = " ";
              arr[i][j].classList.remove("filled");
          }
          
  }
}
}

let getpuzzle = document.getElementById("getpuzzle");
let solvepuzzle =document.getElementById("solvepuzzle");
getpuzzle.onclick = function()  {
    fetch("https://sugoku.onrender.com/board?difficulty=easy")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      board= data.board; 
      fillboard(board);
    })
    .catch(error => {
      console.error("error", error);
    });



};
//var fullboard=[[], [], [], [], [], [], [], [], []];
 solvepuzzle.onclick = () => {
   solvesudoko(board, 0, 0, 9);
};
function canplace( board, i,j,no, n ){
  //check rows and columns
  for (let k=0;k<n;k++){
     if(board[i][k]==no || board[k][j]==no){
         return false;
     }
  }
  //check for subgrid
    let sn=Math.sqrt(n);
    let sx=Math.floor(i/sn)*sn;
    let sy=Math.floor(j/sn)*sn;
    for(let x=sx; x<sx+sn; x++){
     for(let y=sy; y<sy+sn; y++){
         if(board[i][j]==no){
             return false;
         }
     }
    }
 return true;
 }
function solvesudoko( board, i,j,n){
  //base case

  if(i==n){
      //print the board
      /*for(let i=0;i<n;i++){
          for(let j=0;j<n;j++){
              cout<<board[i][j]<<" ";
          }
          cout<<endl;
      }*/
      fillboard(board);

       return true;
  }
  //recursive case
  //reached end of the row
  if(j==n){
    return  solvesudoko(board,i+1,0,n);
  }
  //skip already filled box
  if(board[i][j]!=0){
      return solvesudoko(board,i,j+1,n);
  }
  //box to be filled
  for(let no=1;no<=n;no++){
      if(canplace(board,i,j,no,n)){
          board[i][j]=no;
          let subsolution=solvesudoko(board,i,j+1,n);
          if(subsolution){
              return true;
          }
      }
  }
  //backtracking
  //if no number gives solution return false
  board[i][j]=0;
  return false;

}

 
 

};

function selectTile(){
    if(prevSelected!=null){
      prevSelected.classList.remove("selectTile");
 }
    prevSelected.innerText=this.innerText;
   prevSelected.classList.add("selectTile");
    
 }
 //var fullboard=[[], [], [], [], [], [], [], [], []];
 //fullboard=solvesudoko(board,0,0,9);
 function addNum(){
    if(prevSelected.innerText==" "){
    prevSelected.innerText=this.innerText;
    }
   /* let row =prevSelected.getAttribute("row");
    let col = prevSelected.getAttribute("col");
    if(prevSelected.innerText==fullboard[row][col]){

    }
    else{
     prevSelected.classList.add("wrong");
    }*/

 }