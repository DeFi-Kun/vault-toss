const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const coin = { x: 300, y: 700, radius: 15, vx: 0, vy: 0, isMoving: false };
let wind = (Math.random() - 0.5) * 0.8;

// Load Vault Logo
const targetImage = new Image();
targetImage.src = 'https://raw.githubusercontent.com/DeFi-Kun/vault-toss/main/logo.png'; // hosted logo, update later if needed

const target = { x: 270, y: 100, width: 60, height: 80 };

canvas.addEventListener('click', (e) => {
  if (!coin.isMoving) {
    const rect = canvas.getBoundingClientRect();
    const dx = e.clientX - rect.left - coin.x;
    const dy = e.clientY - rect.top - coin.y;
    coin.vx = dx * 0.05 + wind;
    coin.vy = dy * 0.05;
    coin.isMoving = true;
  }
});

function drawCoin() {
  ctx.beginPath();
  ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#fcd34d';
  ctx.fill();
}

function drawTarget() {
  ctx.drawImage(targetImage, target.x, target.y, target.width, target.height);
}

function update() {
  if (coin.isMoving) {
    coin.x += coin.vx;
    coin.y += coin.vy;
    coin.vy += 0.2;

    if (coin.y > canvas.height) {
      coin.x = 300;
      coin.y = 700;
      coin.vx = coin.vy = 0;
      coin.isMoving = false;
      wind = (Math.random() - 0.5) * 0.8;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTarget();
  drawCoin();
  update();
  requestAnimationFrame(gameLoop);
}

targetImage.onload = gameLoop;
