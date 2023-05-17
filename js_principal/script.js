
let container = document.getElementById("wrapper");


let games = [
{
    game_name: "Typing Game",
    img: "img/1.png",
    link: "typing_test/index.html" 
},
{
    game_name: "Puzzle",
    img: "img/2.png",
    link: "puzzle/index.html"
},
{
    game_name: "Quiz",
    img: "img/3.png",
    link: "quiz/index.html"
},

{
    game_name: "Memoria",
    img: "img/4.png",
    link: "memory-game/index.html"
}
];



games.forEach(e => container.innerHTML += `
<div class="card cardz" style="width: 18rem; " id="">
    <img src="${e.img}" class="card-img-top" style="padding: 10px; height: 250px">
    <div class="card-body">
      <h5 class="card-title" style="text-align: center"><b>${e.game_name}</b></h5>
      <a href="${e.link}" class="btn btn-primary center" style="background: linear-gradient(90deg,rgba(248,73,27,1) 0%,rgba(241,47,63,1) 50%,rgba(220,24,96,1) 100%) !important; padding: 9px 0px; border-radius: 5px; color: white; font-size: 16px; border: none;">Jugar!</a>
    </div>
</div>`);

