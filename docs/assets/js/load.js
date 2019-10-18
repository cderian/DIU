//reinicia los datos guardados en el navegador
//localStorage.removeItem("score");
var content = {}, categories = {};
$(function() { 
  if (!storageAvailable('localStorage')) {
    $('#container').html('Debes habilitar el almacenamiento local en tu navegador.');
  } else {
    $.getJSON("assets/js/idiomy.json", function(data) {
      //content = JSON.parse(data);
      content = data;
      idiomas = content.Idiomas;
      categoriesAleman = idiomas.items[0].Categories;
      categoriesItaliano = idiomas.items[1].Categories;
      categoriesPortugues = idiomas.items[2].Categories;
      
      if (localStorage.getItem('score') == null) {
        generateScoreRegistry(categoriesAleman, categoriesItaliano, categoriesPortugues);
      }
      
      //console.log("Local Storage:"+JSON.stringify(localStorage));
      
      appLoad();
    });
  }

  $('#container').on('click', '.testinit', function(){
    testinitAudio.play();
    $(this).renderQuiz(0,0);
    $('.body').removeClass('body').addClass('body-second-style');
  });

  /**
   * Recargamos las introducciones a las preguntas según el nivel 
   * en cual se encuentra la partida actual
   */
  $('#container').on('click', '.volver-intros', function(){
    $('.body').removeClass('body').addClass('body-second-style');
    $('.correcto'). removeClass('correcto').addClass('answer-button');
    $('.incorrecto'). removeClass('incorrecto').addClass('answer-button');
    $('.stars').empty();
    current = - 1;
    showNext(current);
    $(this).volverIntros();//Llamamos a la función para obtener las introducciones actuales
  });

  /*
  $('#container').on('click','.skip-intro',function(e){
    e.preventDefault();
    renderPanel(categories);
  });
*/
  /**
   * Función para desplegar el menú de los idiomas disponibles
   */
  $('#container').on('click','.skip-intro',function(e){
    e.preventDefault();
    renderIdiomas(idiomas);
  });

  $('#container').on('click','.volver-idiomas',function(e){
    console.log("Click Volver Idiomas");
    
    e.preventDefault();
    renderIdiomas(idiomas);
  });
  
  //Alemán
  $('#container').on('click','.idioma1',function(e){
    e.preventDefault();
    renderPanel(categoriesAleman, 1);
  });

  //Italiano
  $('#container').on('click','.idioma2',function(e){
    e.preventDefault();
    renderPanel(categoriesItaliano, 2);
  });

  //Portugués
  $('#container').on('click','.idioma3',function(e){
    e.preventDefault();
    renderPanel(categoriesPortugues, 3);
  });


  $('#container').on('click','.level',function(e){
    levelAudio.play();
    $(this).renderLevels();
  });


});

var levelAudio = new Audio();
levelAudio.src = "assets/audio/start.mp3";
var testinitAudio = new Audio();
testinitAudio.src="assets/audio/drip.mp3";
var audiointro = new Audio();
audiointro.src = "assets/audio/home.mp3";
function play_intro(){
  audiointro.play();
}