var correcto = new Audio();
correcto.src="assets/audio/NFF-choice-good.wav";
correcto.volume = 0.4;
var incorrecto = new Audio();
incorrecto.src="assets/audio/NFF-choice-bad.wav";
incorrecto.volume = 0.4;
var homeBoton = new Audio();
homeBoton.src="assets/audio/home.mp3";
var botones = new Audio();
botones.src = "assets/audio/drip.mp3";
var current = 0;

$('#container').on('click', '.answer-button', function(){
  if (!$(".can").hasClass("hide")) return;
  var isCorrect = $(this).checkAnswer();
  var correct_answer = $(this).getCorrectAnswer();
  var msg = "La respuesta correcta es <b>" + correct_answer + "</b>.<br>¡Ánimo, vamos con la siguiente!";
  if (isCorrect) {
    correcto.play();
    msg = "¡ACERTASTE, MUY BIEN HECHO!";
    $(this).addClass('correcto').removeClass('answer-button');
  }else{
    incorrecto.play();
    $(this).addClass('incorrecto').removeClass('answer-button');
  }
  $('#message').html(msg);
  //$('.fadeInUp').addClass('hide').removeClass('fadeInUp');
  $('.can').removeClass('hide').addClass('fadeInUp');
});

$('#container').on('click','.next-button', function(){
  showNext(current);
});

function showNext(n) {
  $('.fadeInUp').addClass('hide').removeClass('fadeInUp');
  current++;
  var items = $('.question');
  var size = items.length;

  if (size - 1 < current) {
    var quizData = $('#quiz-data');
    var category = quizData.attr('data-category');
    var quiz = quizData.attr('data-quiz');
    var points = 0;
    var score = JSON.parse(localStorage.getItem("score"));
    var answers = score["idioma"+idiomaActual]["category"+category]["quiz"+ quiz];
    
    for(var answer in answers){
      points += answers[answer].points;
    }

    var result = parseFloat(points/size);
    var result_percentage = Math.round(result*100)/100;

    $('.resume').removeClass('hide').addClass('fadeInUp');
    $('.body-second-style').removeClass('body-second-style').addClass('body');
    if(result_percentage === 0){
      $('.result-message').html("No obtuviste ninguna estrella. Inténtalo de nuevo! ");
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))

    }else if (result_percentage <= .2 && result_percentage > 0){
      $('.result-message').html("Puedes mejorar. ¡Inténtalo de nuevo! ");
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars img').addClass('animated heartBeat estrellas');  
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
    }else if (result_percentage <= .4 && result_percentage > .2){
      $('.result-message').html("¡Muy bien! ");
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars img').addClass('animated heartBeat estrellas');
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
    }else if (result_percentage <= .6 && result_percentage > .4){
      $('.result-message').html("¡Muy bien! ");
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars img').addClass('animated heartBeat estrellas');
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
    }else if (result_percentage < 1 && result_percentage > .6){
      $('.result-message').html("¡Muy bien! ");
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars img').addClass('animated heartBeat estrellas');
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/no-star.png', width: '100px', height: '100px'}))
    }else if (result_percentage === 1){
      $('.result-message').html("¡Felicidades! Demuestra tus habilidades en los demás niveles y categorías.<br>");
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars').append($('<img>',{id:'star',src:'assets/img/resultado_quiz/star.png', width: '150px', height: '150px'}))
      $('.stars img').addClass('animated heartBeat estrellas');
    }
  } else {
    $(items[current]).addClass('fadeInUp').removeClass('hide');
  }
}

$('#container').on('click','#otro', function(){
  $('.body').removeClass('body').addClass('body-second-style');
  $('.correcto'). removeClass('correcto').addClass('answer-button');
  $('.incorrecto'). removeClass('incorrecto').addClass('answer-button');
  $('.stars').empty();
  current = - 1;
  showNext(current);
});

$('#container').on('click','#menu', function(){
  $('.body-second-style').removeClass('body-second-style').addClass('body');
  current = 0;
  $('#container').load('assets/templates/panel.html',function(){
    renderPanel(categories);
  });
});

$('#container').on('click','.volver-niveles',function(e){
  $('.body-second-style').removeClass('body-second-style').addClass('body');
  current = 0;
  $(this).volverNiveles();
});

$('#container').on('click','.skip',function(){
  showQuiz();
});

$('#container').on('click','.next-intro',function(){
  var target = $(this).attr("data-target");
  var items = $(".intro.item");
  if (target < items.length) {
    $(".intro.item.fadeInUp").removeClass("fadeInUp").addClass("hide");
    $(items[target]).addClass("fadeInUp").removeClass("hide");
  } else {
    showQuiz();
  }
});

function showQuiz() {
  $("#intro").addClass("hide");
  $(".quiz.items").removeClass("hide");
}

$('#container').on('click', '.siguienteNivel', function(){
  $(this).renderNextQuiz();
  $('.body').removeClass('body').addClass('body-second-style');
});

$('#container').on('click','#menu', function(){
  homeBoton.play();
});

$('#container').on('click','.botones', function(){
  botones.play();
});
