var options = ["./images/rock.webp","./images/hand.png"]
const result = () => {
  var player1Got = Math.round(Math.random())
  var player2Got = 0;
  if ( player1Got === 0 ) {
    player2Got = 1;
  }
  document.querySelector('.player1Hand').innerHTML = `<img src="${options[player1Got]}" alt="">`;
  document.querySelector('.player2Hand').innerHTML = `<img src="${options[player2Got]}" alt="">`;
  if (player1Got === 0) {
    document.querySelector('.winner').textContent = "Winner is Player 2 🏳️‍🌈"
  } else {
    document.querySelector('.winner').textContent = "Winner is Player 1 🏳️‍🌈"
  }
  
}