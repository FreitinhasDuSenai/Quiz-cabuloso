(function() {
  var questions = [{
    question: "Qual maior time do brasil",
    choices: ["A- Inter", "B- Gaymio","C- Palmeiras", "D- Vasco", ]
  }, {
    question: "Quem é o Sanches?",
    choices: ["A- Noia do senai", "B- Marginal do senai", "C- Turista do senai"]
  },
  {
    question: "Freitas é lindo?",
    choices: ["A- Sim", "B- Não", "C- Parcialmente", "D- Com toda a certeza"]
  },
  {
    question: "Quando foi a guerra fria?",
    choices: ["A- 1939", "B- 1949", "C- 1947", "D- 1910"]
  },
  {
    question: "Qual o gosto de Banana?",
    choices: ["A- De banana", "B- De laranja", "C- De morango", "D- De mortadela"]
  },
  {
    question: "Quantas vezes eu choro no banheiro pq o senai me deixa louco?",
    choices: ["A- 8", "B- 19", "C- 35", "D- nenhuma porque sou lindo"]
  },
  {
    question: "Freitas é o nego mais maravilhoso do mundo?",
    choices: ["A- Sim", "B- Não", "C- Com certeza", "D- Ele tem cor de folha A4"]
  },
  {
    question: "Quando foi a revolução francesa?",
    choices: ["A- 1865", "B- 1789", "C- 1940", "D- 1711"]
  },
  {
    question: "qual tenis mais caro do mundo?",
    choices: ["A-  Nike Moon Shoe", "B- Jordan 4", "C- Air Max AP", "D- Nike Janosky"]
  },
  {
    question: "Qual a marca mais famosa do mundo?",
    choices: ["A- Apple", "B- Google", "C- Nescau", "D- Amazon"]
  }
];
  
  var questionCounter = 0; 
  var selections = []; 
  var quiz = $('#quiz'); 
  
  displayNext();
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
  
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    

    if (isNaN(selections[questionCounter])) {
      alert('Bote uma alternativa miséra');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h3>Questão ' + (index + 1) + ':</h3>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  

  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    var matchKit;
    var selection = selections[0] +""+selections[1];
      switch(selection) {
    case "01":
      matchKit = 'Respostas 1- C, 2- D,';
        break;
    case "02":
      matchKit = 'Resposta D';
        break;    
    case "03":
      matchKit = 'Resposta A';
        break;
    case "4":
      matchKit = 'Resposta C';
        break;
    case "5":
      matchKit = 'Resposta D';
        break;
    case "6":
      matchKit = 'Resposta D';
        break;
    case "7":
      matchKit = 'Resposta D';
        break; 
    case "8":
      matchKit = 'Resposta C';
        break; 
    case "9":
      matchKit = 'Resposta B';
        break; 
    case "10":
      matchKit = 'Resposta A';
        break; 
    default:
      matchKit = 'Sem resposta';
  }
    
    score.append('As respostas certas são: ' + matchKit + ' !');
    return score;
  }
})();

