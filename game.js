const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

let dice = [
  { x: 60,  y: 200, size: 70, num: 1, rotating: false, rot: 0 },
  { x: 220, y: 270, size: 70, num: 1, rotating: false, rot: 0 },
  { x: 60,  y: 360, size: 70, num: 1, rotating: false, rot: 0 },
  { x: 220, y: 430, size: 70, num: 1, rotating: false, rot: 0 },
  { x: 140, y: 315, size: 70, num: 1, rotating: false, rot: 0 }
];
let isRolling = false;
let showHelp = false;
let helpPage = 1;

function drawBackground() {
  ctx.fillStyle = '#3D2B1F';
  ctx.fillRect(0,0,W,H);
  ctx.fillStyle = '#4b362144';
  for(let i=0;i<H;i+=20){
    ctx.fillRect(0,i,W,2);
  }
}

function drawAll() {
  drawBackground();
  ctx.fillStyle = '#ff6b35';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('菜就多练', W/2, 100);

  dice.forEach(item => drawRealDice(item));
  drawRealButton();
  drawHelpButton();

  if (showHelp) {
    drawHelpPanel();
  }
}

function drawRealDice(d) {
  ctx.save();
  ctx.shadowColor = '#00000099';
  ctx.shadowBlur = 25;
  ctx.shadowOffsetX = 8;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = d.rotating ? '#fff59d' : '#ffffff';
  roundRect(d.x, d.y, d.size, d.size, 16);
  ctx.shadowColor = 'transparent';
  drawDicePoints(d);
  ctx.restore();
}

function drawDicePoints(d) {
  const cx = d.x + d.size/2;
  const cy = d.y + d.size/2;
  const p = 18;
  const dot = (x,y)=>{
    ctx.beginPath();
    ctx.arc(x,y,11,0,Math.PI*2);
    ctx.fill();
  };
  if(d.num===1) { ctx.fillStyle = "#d32f2f"; dot(cx, cy); }
  if(d.num===2){ ctx.fillStyle = "#222"; dot(d.x+p,d.y+p); dot(d.x+d.size-p,d.y+d.size-p); }
  if(d.num===3){ ctx.fillStyle = "#222"; dot(d.x+p,d.y+p); dot(cx,cy); dot(d.x+d.size-p,d.y+d.size-p); }
  if(d.num===4){ ctx.fillStyle = "#d32f2f"; dot(d.x+p,d.y+p); dot(d.x+d.size-p,d.y+p); dot(d.x+p,d.y+d.size-p); dot(d.x+d.size-p,d.y+d.size-p); }
  if(d.num===5){ ctx.fillStyle = "#222"; dot(d.x+p,d.y+p); dot(d.x+d.size-p,d.y+p); dot(d.x+p,d.y+d.size-p); dot(d.x+d.size-p,d.y+d.size-p); ctx.fillStyle = "#d32f2f"; dot(cx,cy); }
  if(d.num===6){ ctx.fillStyle = "#222"; dot(d.x+p,d.y+p); dot(d.x+d.size-p,d.y+p); dot(d.x+p,cy); dot(d.x+d.size-p,cy); dot(d.x+p,d.y+d.size-p); dot(d.x+d.size-p,d.y+d.size-p); }
}

function drawRealButton() {
  ctx.save();
  ctx.shadowColor = '#00000088';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = '#e64a19';
  roundRect(W/2-110, H-130, 220, 80, 40);
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 30px Arial';
  ctx.fillText(isRolling ? '🎲 摇骰子中...' : '🎯 点击摇骰子', W/2, H-80);
  ctx.restore();
}

function drawHelpButton() {
  ctx.save();
  ctx.fillStyle = '#555';
  roundRect(W-70, 40, 60, 50, 10);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px Arial';
  ctx.fillText('说明', W-40, 70);
  ctx.restore();
}

function drawHelpPanel() {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.fillRect(0,0,W,H);
  ctx.fillStyle = '#fff';
  roundRect(W/2-290, H/2-180, 580, 450, 22);

  ctx.fillStyle = '#e64a19';
  ctx.font = 'bold 34px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`游戏说明 - 系统${helpPage}`, W/2, H/2-110);

  ctx.font = '24px Arial';
  ctx.textAlign = 'left';
  const l = W/2 - 250;
  let y = H/2 - 60;
  const h = 46;

  if(helpPage === 1){
    ctx.fillStyle = '#222';
    ctx.fillText('系统1：基础摇骰子', l, y); y+=h;
    ctx.fillText('• 点击底部按钮摇骰子', l, y); y+=h;
    ctx.fillText('• 骰子随机滚动生成点数', l, y); y+=h;
    ctx.fillText('• 可无限次重复摇骰子', l, y); y+=h;
    ctx.fillText('• 适合快速开局娱乐', l, y); y+=h;
  }
  if(helpPage === 2){
    ctx.fillStyle = '#222';
    ctx.fillText('系统2：手动调节点数', l, y); y+=h;
    ctx.fillText('• 点击任意骰子切换点数', l, y); y+=h;
    ctx.fillText('• 1-6循环切换', l, y); y+=h;
    ctx.fillText('• 适合自定义结果娱乐', l, y); y+=h;
    ctx.fillText('• 操作隐蔽', l, y); y+=h;
  }
  if(helpPage === 3){
    ctx.fillStyle = '#222';
    ctx.fillText('系统3：多人互动玩法', l, y); y+=h;
    ctx.fillText('• 与朋友比点数大小', l, y); y+=h;
    ctx.fillText('• 适合打赌、惩罚游戏', l, y); y+=h;
    ctx.fillText('• 单人多人都能玩', l, y); y+=h;
    ctx.fillText('• 随时开局长期可玩', l, y); y+=h;
  }

  ctx.fillStyle = '#999';
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('点击任意位置关闭', W/2, H/2 + 180);
  ctx.restore();
}

function roundRect(x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
  ctx.fill();
}

function rollDice() {
  if (isRolling) return;
  isRolling = true;
  let count = 0;
  const interval = setInterval(() => {
    dice.forEach(i=>{
      i.num = Math.floor(Math.random()*6)+1;
      i.rotating = true;
    });
    count++;
    if (count > 18) {
      clearInterval(interval);
      isRolling = false;
      dice.forEach(i=>i.rotating = false);
    }
  }, 50);
}

canvas.addEventListener('touchstart',(e)=>{
  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;

  if(showHelp){
    showHelp = false;
    return;
  }

  if(x > W-70 && x < W-10 && y > 40 && y < 90){
    showHelp = true;
    helpPage = 1;
    return;
  }

  if(x>W/2-110 && x<W/2+110 && y>H-130 && y<H-50){
    rollDice();
    return;
  }

  dice.forEach(d=>{
    if(x>d.x && x<d.x+d.size && y>d.y && y<d.y+d.size){
      d.num = d.num>=6 ? 1 : d.num+1;
    }
  });
});

function loop(){drawAll();requestAnimationFrame(loop);}
loop();
