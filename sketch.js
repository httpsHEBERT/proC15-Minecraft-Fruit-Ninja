//estado de jogo
var estado = "inicio";

//pontuação geral (invisível)
var pontuação = 0;

//pontuação por frutas (visível)
var maçãP = 0, cenouraP = 0, melanciaP = 0, beterrabaP = 0;

//fruta escolhida
var resultado;

//planos de fundo
var cenário, cenário1, cenário2, cenário3;

//sprites de menu e fim de jogo
var fruitNinja, jogar, hotBar, vocêMorreu, renascer, menu;
var fruitNinjaImg, jogarImg, hotBarImg, vocêMorreuImg, renascerImg, menuImg;

//sprites da hot bar
var maçãH, cenouraH, melanciaH, beterrabaH, espadaH;
var dica, dicaImg, dica1, dica1Img;

//sprites do jogo
var espada, fruta, monstros;
var espadaImg , maçã, maçãCortada, cenoura, melancia, beterraba, morcego, creeper, herobrine, enderman;

//efeitos sonoros
var música, botão, espadada, morte;

//  _/﹋\_
//  (҂`_´)
//  <,︻╦╤─ ҉ - - -
//  _/﹋\_

function preload(){
  
  //carregamento das imagens
  
    cenário1 = loadAnimation("cenário1.jpg");
    cenário2 = loadAnimation("cenário2.jpg");
    cenário3 = loadAnimation("cenário3.png");

    fruitNinjaImg = loadImage("fruitNinja.png");
    jogarImg = loadImage("jogar.jpg");
    vocêMorreuImg = loadImage("vocêMorreu.png");
    renascerImg = loadImage("renascer.jpg"); 
    menuImg = loadImage("menu.jpg");

    dicaImg = loadImage("dica.png");
    dica1Img = loadImage("dica1.png");
    hotBarImg = loadImage("hotBar.png");
    espadaImg = loadImage("espada.png");
    espadaH = loadImage("espada.png");
    maçã = loadImage("maçã.png");
    maçãH = loadImage("maçã.png");
    cenoura = loadImage("cenoura.png");
    cenouraH = loadImage("cenoura.png");
    melancia = loadImage("melancia.png");
    melanciaH = loadImage("melancia.png");
    beterraba = loadImage("beterraba.png");
    beterrabaH = loadImage("beterraba.png");
    morcego = loadImage("morcego.png");
    creeper = loadImage("creeper.png");
    herobrine = loadImage("herobrine.png");
    enderman = loadImage("enderman.png");
  
  //carregamento de sonm e efeitos sonoros
  
    música = loadSound("música.mp3");
    botão = loadSound("botão.mp3");
    espadada = loadSound("espadada.mp3");
    morte = loadSound("morte.mp3");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
  
  //criando os sprites do jogo
  
    cenário = createSprite(windowWidth/2, windowHeight/2+70);
    cenário.addAnimation("cenário1", cenário1);
    cenário.addAnimation("cenário2", cenário2);
    cenário.addAnimation("cenário3", cenário3);

    fruitNinja = createSprite(windowWidth/2+250, windowHeight/2-190);
    fruitNinja.addImage(fruitNinjaImg);
    fruitNinja.scale = 0.8;

    jogar = createSprite(windowWidth/2, windowHeight/2+50);
    jogar.addImage(jogarImg);
    jogar.scale = 0.4;
  
    espada = createSprite(225,150);
    espada.addImage(espadaImg);
    espada.scale = 0.25;
    espada.visible = false;
    espada.setCollider("rectangle",-100,-100,150,350,135);
  
    dica = createSprite(windowWidth/2-280, windowHeight/2+240);
    dica.addImage(dicaImg);
    dica.scale = 0.2;
    dica.visible = false;
  
    dica1  = createSprite(windowWidth/2, windowHeight/2-80);
    dica1.addImage(dica1Img);
    dica1.scale = 1.2;
    dica1.depth = espada.depth - 1;
    dica1.visible = false;
  
    hotBar = createSprite(windowWidth/2+70, windowHeight/2+280);
    hotBar.addImage(hotBarImg);
    hotBar.scale = 0.7;
    hotBar.visible = false;
  
    espadaH = createSprite(hotBar.x+57, hotBar.y-35);
    espadaH.addImage(espadaImg);
    espadaH.scale = 0.09;
    espadaH.visible = false;
  
    maçãH = createSprite(hotBar.x-224, hotBar.y-36);
    maçãH.addImage(maçã);
    maçãH.scale = 0.23;
    maçãH.visible = false;
  
    cenouraH = createSprite(hotBar.x-167, hotBar.y-35);
    cenouraH.addImage(cenoura);
    cenouraH.scale = 0.28;
    cenouraH.visible = false;
  
    melanciaH = createSprite(hotBar.x-110, hotBar.y-36);
    melanciaH.addImage(melancia);
    melanciaH.scale = 0.28;
    melanciaH.visible = false;
  
    beterrabaH = createSprite(hotBar.x-56, hotBar.y-35);
    beterrabaH.addImage(beterraba);
    beterrabaH.scale = 0.28;
    beterrabaH.visible = false;
  
    vocêMorreu = createSprite(windowWidth/2, windowHeight/2-68);
    vocêMorreu.addImage(vocêMorreuImg);
    vocêMorreu.visible = false;
  
    renascer = createSprite(windowWidth/2, windowHeight/2+44.5);
    renascer.addImage(renascerImg);
    renascer.scale = 0.35;
    renascer.visible = false;
  
    menu = createSprite(windowWidth/2, windowHeight/2+95.5);
    menu.addImage(menuImg);
    menu.scale = 0.35;
    menu.visible = false;
    
  //grupos das frutas e dos monstros
  grupoFruta = createGroup();
  grupoMonstros = createGroup();
  
  //tocar a música de fundo
  música.play();
}

function draw() {
  
  background(220);
  
  drawSprites();
  
  //estados de jogo
  
  if(estado === "inicio"){ //estado inicial no menu
    
    //edição no cenário
    cenário.changeAnimation("cenário1", cenário1);
    cenário.scale = 1.2;
    
    //o botão 'jogar' fica maior quando toca no mouse
    if(mouseIsOver(jogar)){
      jogar.scale = 0.45;
    }else{
      jogar.scale = 0.4;
    }
    
    //quando o botão 'jogar' for pressionado
    if(mousePressedOver(jogar)){
      
      //mudança de estado no jogo
      estado = "jogando";
      
      //desaparecimento dos sprites iniciais
      fruitNinja.visible = false;
      jogar.visible = false;
      
      //efeito sonoro de clique
      botão.play();
    }
  }
  
  if(estado === "jogando"){ //estado jogando a fase
    
    //chamando outras funções
    frutas();
    vilões();
    
    //edições no cenário
    cenário.changeAnimation("cenário2", cenário2);
    cenário.scale = 0.8;
   
    //aparecimento da dica, hotbar e frutas
    dica.visible = true;
    hotBar.visible = true;
    espadaH.visible = true;
    maçãH.visible = true;
    cenouraH.visible = true;
    melanciaH.visible = true;
    beterrabaH.visible = true;
    
    //visibilidade da espada e do mouse
    if(mouseY > windowHeight-210){
      
      espada.visible = false;
      cursor(); //o mouse aparece
      
    }else{

      espada.visible = true;
      noCursor(); //o mouse desaparece
    }
    
    //movimento da espada
    espada.y = World.mouseY;
    espada.x = World.mouseX;
    
    //impedindo a espada de sair da tela
    if(mouseX < windowWidth-windowWidth+55){
      espada.x = windowWidth-windowWidth+55;
    }
    if(mouseX > windowWidth-55){
      espada.x = windowWidth-55;
    }
    if(mouseY < windowHeight-windowHeight+55){
      espada.y = windowHeight-windowHeight+55;
    }
    
    //pontuação de frutas pegas
    textSize(25);
    fill("white"); 
    text(maçãP, maçãH.x+9, maçãH.y+28);
    text(cenouraP, cenouraH.x+9, cenouraH.y+28);
    text(melanciaP, melanciaH.x+9, melanciaH.y+28);
    text(beterrabaP, beterrabaH.x+9, beterrabaH.y+28);
    
    //dica    
    if(mouseIsOver(dica)){
      dica.scale = 0.25;
      dica1.visible = true;
    }else{
      dica.scale = 0.2;
      dica1.visible = false;
    }
    
    //quando a espada atinge as frutas
    if(grupoFruta.isTouching(espada)){
      
      //destuição da fruta
      grupoFruta.destroyEach();
      
      //efeito sonoro da espada
      espadada.play();
      
      //acréscimo na pontuação geral
      pontuação = pontuação + 1;
      
      //acréscimo na pontuação por frutas
      
      if(resultado === 1){ //se acertou a maçã
        
        maçãP = maçãP + 1;
        
      }else if(resultado === 2){ //se acertou a cenoura
        
        cenouraP = cenouraP + 1;
        
      }else if(resultado === 3){ //se acertou a melancia
        
        melanciaP = melanciaP + 1;
        
      }else{ //se acertou a beterraba
        
        beterrabaP = beterrabaP + 1;
      }
    }
    
    //quando a espada atinge o morcego
    if(grupoMonstros.isTouching(espada)){

      //o estado de jogo muda para o final
      estado = "perdeu";
      
      //efeito sonoro de dano
      morte.play();

      //desaparecimento dos sprites do jogo
      espada.visible = false;
      grupoFruta.destroyEach();
      grupoMonstros.destroyEach();
      grupoFruta.setVelocityXEach(0);
      grupoMonstros.setVelocityXEach(0);
    }
  }
  
  if(estado === "perdeu"){ //estado de fim de jogo
    
    //aparecimento do mouse
    cursor();
    
    //edições no cenário
    cenário.changeAnimation("cenário3", cenário3);
    cenário.scale = 0.75;
    
    //sprites de fim de jogo aparecem
    vocêMorreu.visible = true;
    renascer.visible = true;
    menu.visible = true;
    
    //desaparecimento da dica, hotbar e frutas
    dica.visible = false;
    hotBar.visible = false;
    espadaH.visible = false;
    maçãH.visible = false;
    cenouraH.visible = false;
    melanciaH.visible = false;
    beterrabaH.visible = false;
    
    //o botão 'renascer' fica maior quando toca no mouse
    if(mouseIsOver(renascer)){
      renascer.scale = 0.37;
    }else{
      renascer.scale = 0.35;
    }
    
    //o botão 'menu' fica maior quando toca no mouse
    if(mouseIsOver(menu)){
      menu.scale = 0.37;
    }else{
      menu.scale = 0.35;
    }
    
    //se um dos botões de fim de jogo for pressionado
    if(mousePressedOver(renascer) || mousePressedOver(menu)){
      
      //os sprites do fim de jogo somem
      vocêMorreu.visible = false;
      renascer.visible = false;
      menu.visible = false;
      
      //efeito sonoro de botão
      botão.play();
      
      //a pontuação das frutas é zerada
      pontuação = 0;
      maçãP = 0;
      cenouraP = 0;
      melanciaP = 0;
      beterrabaP = 0;
      
      //se o botão foi o 'renascer' 
      if(mousePressedOver(renascer)){
        
        //o estado volta para o 'jogando'
        estado = "jogando";
      }
      //se o botão foi o 'menu' 
      if(mousePressedOver(menu)){
        
        //o estado se torna 'menu'
        estado = "inicio";
        
        //e os sprites do menu reaparecem
        jogar.visible = true;
        fruitNinja.visible = true;
      }
    }
  }
}

//criação das frutas
function frutas(){
  
  //a cada 80 quadros de jogo
  if(World.frameCount % 100  === 0){
    
    //uma fruta é gerada
    fruta = createSprite(400, 200);
    fruta.y = Math.round(random(30, 310));
    fruta.setLifetime = 100;
    fruta.scale = 0.6;
    fruta.depth = dica1.depth - 1;
    grupoFruta.add(fruta);
    
    //na esquerda ou na direita
    var posicao = Math.round(random(1,2));
    
    if(posicao == 1){
      
      fruta.x = windowWidth+10;
      
      //velocidade gradativa
      fruta.velocityX = -(15 + pontuação/2);
      
    }else{
        
      fruta.x = windowWidth-windowWidth-10;
      
      //velocidade gradativa
      fruta.velocityX = 15 + pontuação/2
    }
    
    //de escolha aleatória
    var escolha = Math.round(random(1,4));
    
    if(escolha == 1){
      
      fruta.addImage(maçã);
      fruta.scale = 0.5;
      resultado = 1;
      
    }else if(escolha == 2){
      
      fruta.addImage(cenoura);
      resultado = 2;
      
    }else if(escolha == 3){
      
      fruta.addImage(melancia);
      resultado = 3;
      
    }else{
      
      fruta.addImage(beterraba);
      resultado = 4;
    }   
  }
}

//criação dos monstros
function vilões(){
  
  //a cada 200 quadros de jogo
  if(World.frameCount % 170 === 0){
    
    //um morcego é gerado
    monstros = createSprite(400, 200);
    monstros.y = Math.round(random(30, 300));
    monstros.setLifetime = 50;
    monstros.depth = dica1.depth - 1;
    grupoMonstros.add(monstros);
    
    //na esquerda ou na direita
    var posicao = Math.round(random(1,2));
    
    if(posicao == 1){
      
       monstros.x = windowWidth+20;
      
      //velocidade gradativa
      monstros.velocityX = -(10 + pontuação/2); 
      
    }else{
        
      monstros.x = windowWidth-windowWidth-20;
      
      //velocidade gradativa
      monstros.velocityX = 10 + pontuação/2;
    }
    
    //de escolha aleatória
    var escolha = Math.round(random(1, 4));
    
    if(escolha == 1){
      
      monstros.addImage(morcego);
      monstros.scale = 0.3;
      
    }else if(escolha == 2){
      
      monstros.addImage(creeper);
      monstros.scale = 0.12;
      
    }else if(escolha == 3){
      
      monstros.addImage(herobrine);
      monstros.scale = 0.18;
      
    }else{
      
      monstros.addImage(enderman);
      monstros.scale = 0.3;
    }
  }
}