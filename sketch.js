let fundoDoEspaco;
let imagemDaNave;
let imagemOvni;
let imagemAsteroide;
let imagemCoracao;
let fonte;
let somDeFundo; 
let somDeColisao;
let somDePonto;

// Posição inicial da nave
let yNave = 366;
let xNave = 100;

// Posições iniciais dos OVNIs
let xOvni1 = 800;
let xOvni2 = 1000;
let yOvni = 40;

// Velocidades dos OVNIs
let velocidadeOvni1 = 3;
let velocidadeOvni2 = 2;

// Posição inicial do asteroide
let xAsteroide = 600;
let yAsteroide = 150;
let velocidadeAsteroide = 3;

// Pontuação inicial
let pontuacao = 0;

// Vidas iniciais
let vidas = 3;

// Flag para controlar o estado do jogo
let jogoEmAndamento = true;

function preload() {
  fundoDoEspaco = loadImage("imagens/espac0.jpg");
  imagemDaNave = loadImage("imagens/nave.png");
  imagemOvni = loadImage("imagens/ovni.png");
  imagemAsteroide = loadImage("imagens/asteroide.png");
  imagemCoracao = loadImage("imagens/coracao.png");
  somDeFundo = loadSound("sons/somDeFundo.mp3");
  somDeColisao = loadSound("sons/colisao.mp3");
  somDePonto = loadSound("sons/ponto.mp3");
}

function setup() {
  createCanvas(800, 500);
  textFont("Arial");
  textSize(24);
  textAlign(CENTER, CENTER);
  somDeFundo.loop(); // Toca o som de fundo em loop
}

function draw() {
  background(fundoDoEspaco);
  
  if (jogoEmAndamento) {
    mostraNave();
    mostraOvni(xOvni1);
    mostraOvni(xOvni2);
    movimentaOvni();
    movimentaNave();
    mostraAsteroide();
    movimentaAsteroide();
    verificarColisao();
    exibirPontuacao();
    exibirVidas();
  } else {
    fill(255, 0, 0);
    textSize(64);
    text("Game Over", width / 2, height / 2);
  }
}

function mostraNave() {
  image(imagemDaNave, xNave, yNave, 80, 80);
}

function mostraOvni(x) {
  image(imagemOvni, x, yOvni, 70, 70);
}

function movimentaOvni() {
  xOvni1 -= velocidadeOvni1;
  xOvni2 -= velocidadeOvni2;

  if (xOvni1 < -70) {
    xOvni1 = width;
  }

  if (xOvni2 < -70) {
    xOvni2 = width;
  }
}

function movimentaNave() {
  if (keyIsDown(UP_ARROW)) {
    yNave -= 3;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yNave += 3;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xNave += 3;
  }
  if (keyIsDown(LEFT_ARROW)) {
    xNave -= 3;
  }
}

function mostraAsteroide() {
  image(imagemAsteroide, xAsteroide, yAsteroide, 50, 50);
}

function movimentaAsteroide() {
  xAsteroide -= velocidadeAsteroide;

  if (xAsteroide < -50) {
    xAsteroide = width;
    yAsteroide = random(100, 300);
  }
}

function verificarColisao() {
  let limiteEsquerdo = xNave + 20;
  let limiteDireito = xNave + 60;
  let limiteSuperior = yNave + 20;
  let limiteInferior = yNave + 60;

  if (
    (limiteDireito > xOvni1 &&
      limiteEsquerdo < xOvni1 + 70 &&
      limiteInferior > yOvni &&
      limiteSuperior < yOvni + 70) ||
    (limiteDireito > xOvni2 &&
      limiteEsquerdo < xOvni2 + 70 &&
      limiteInferior > yOvni &&
      limiteSuperior < yOvni + 70)
  ) {
    somDeColisao.play(); // Toca o som de colisão
    xNave = 100;
    yNave = 366;
    vidas--; // Perde uma vida
    if (vidas === 0) {
      // Game Over
      jogoEmAndamento = false; // Define o jogo como encerrado
      setTimeout(() => {
        vidas = 3; // Reinicia as vidas
        pontuacao = 0; // Reinicia os pontos
        xNave = 100;
        yNave = 366;
        jogoEmAndamento = true; // Define o jogo como em andamento novamente
      }, 3000); // Aguarda 3 segundos antes de reiniciar o jogo
    }
  }

  if (
    limiteDireito > xAsteroide &&
    limiteEsquerdo < xAsteroide + 50 &&
    limiteInferior > yAsteroide &&
    limiteSuperior < yAsteroide + 50
  ) {
    somDeColisao.play(); // Toca o som de colisão
    xNave = 100;
    yNave = 366;
    vidas--; // Perde uma vida
    if (vidas === 0) {
      // Game Over
      jogoEmAndamento = false; // Define o jogo como encerrado
      setTimeout(() => {
        vidas = 3; // Reinicia as vidas
        pontuacao = 0; // Reinicia os pontos
        xNave = 100;
        yNave = 366;
        jogoEmAndamento = true; // Define o jogo como em andamento novamente
      }, 3000); // Aguarda 3 segundos antes de reiniciar o jogo
    }
  }

  if (yNave < 0) {
    // Nave atingiu o topo
    pontuacao++;
    yNave = 366;
     somDePonto.play();
  }
}

function exibirPontuacao() {
  fill(color(253, 240, 115))
  text(" " + pontuacao, width/2, 30); 
  colorMode(253, 240, 115);
}

function exibirVidas() {
  for (let i = 0; i < vidas; i++) {
    image(imagemCoracao, 20 + i * 30, height - 30, 20, 20);
  }
}
