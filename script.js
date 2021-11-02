(function () {
  var data = {
    quizContent: [
      {
        question: "In reference to the U.S. presidential line of succession; if the vice president were to die, then who is supposed to be president?",
        answer1: "Speaker of the House",
        answer2: "Secretary of State",
        answer3: "Attorney General",
        answer4: "President",
        correctAnswer: 4,
      },
      {
        question: "There are 15 oranges in a bucket. If you take away 5, how many do you have?",
        answer1: "10",
        answer2: "5",
        answer3: "3",
        answer4: "None",
        correctAnswer: 2,
      },
      {
        question: "On a farm, there are 30 wolves in a field. They broke out of the fenced area and 20 of them ate 30 chickens. How many wolves didn't?",
        answer1: "10",
        answer2: "20",
        answer3: "30",
        answer4: "0",
        correctAnswer: 1,
      },
      {
        question: "You're running in a race. You're almost at the finish line when you pass the competitor in second place! What place are you now in?",
        answer1: "First",
        answer2: "Second",
        answer3: "Third",
        answer4: "Fourth",
        correctAnswer: 2,
      },
      {
        question: "What weighs more: a pound of bricks or a pound of feathers?",
        answer1: "The bricks",
        answer2: "The feathers",
        answer3: "They weigh the same",
        answer4: "Depends on the materials",
        correctAnswer: 3,
      },
    ],
    total: 0,
    wrong: 0,
  };

  var display = {
    getApp: $('#app'),
    mainPage: function () {
      var newPage = `
        
        <div class="quest-number"><p id="questNumber"></p></div><h1 id="questionDisplay" class="h3"></h1>

        <form>
          <fieldset> 
            <legend id = "questionDisplay" ></legend>
            <ul>
              <li>
                <label><input type="radio" name="answers" id="input1" value="1"><span class="outer"><span class="inner"></span></span><span id="answerDisplay1"></span></label>
              </li>
              <li>
                <label><input type="radio" name="answers" id="input2" value="2"><span class="outer"><span class="inner"></span></span><span id="answerDisplay2"></span></label>
              </li>
              <li>
                <label><input type="radio" name="answers" id="input3" value="3"><span class="outer"><span class="inner"></span></span><span id="answerDisplay3"></span></label>
              </li>
              <li>
                <label><input type="radio" name="answers" id="input4" value="4"><span class="outer"><span class="inner"></span></span><span id="answerDisplay4"></span></label>
              </li>
            </ul>
          </fieldset>

          <div class="correct-wrap"><span id="currentTotal"></span></div>
          <div class="incorrect-wrap"><span id="currentWrong"></span></div>

          <button id="submit" type"submit">Submit</button>
          <button id="nextQuest" type"button">Next</button>
        </form>
      `;
      this.getApp.html(newPage);
    },

    updateMainPage: function () {
      var getQuestNumber = $('#questNumber'),
        getQuestion = $('#questionDisplay'),
        getAnswer1 = $('#answerDisplay1'),
        getAnswer2 = $('#answerDisplay2'),
        getAnswer3 = $('#answerDisplay3'),
        getAnswer4 = $('#answerDisplay4'),
        getCurrentTotal = $('#currentTotal'),
        getCurrentWrong = $('#currentWrong'),
        sumOfQuestions = data.quizContent.length;

      getQuestNumber.html(control.count + 1 + ' out of ' + sumOfQuestions);
      getQuestion.html(data.quizContent[control.count].question);
      getAnswer1.html(data.quizContent[control.count].answer1);
      getAnswer2.html(data.quizContent[control.count].answer2);
      getAnswer3.html(data.quizContent[control.count].answer3);
      getAnswer4.html(data.quizContent[control.count].answer4);
      getCurrentTotal.html('Correct:' + ' ' + data.total);
      getCurrentWrong.html('Incorrect:' + ' ' + data.wrong);
      $('#nextQuest').hide();
    },

    addAnswer: function (showMessage) {
      var sumOfQuestions = data.quizContent.length;

      if (showMessage === 'correct') {
        this.newElement('p', 'showAnswer', '--CORRECT--');
      }

      else if (control.count === 0) {
        this.newElement('p', 'showAnswer', 'The correct answer is President because he is still alive.');
      }

      else if (control.count === 1) {
        this.newElement('p', 'showAnswer', 'The correct answer is 5 because you only took away 5 oranges.');
      }

      else if (control.count === 2) {
        this.newElement('p', 'showAnswer', 'The correct answer is 10; you simply subtract 20 from 30.');
      }

      else if (control.count === 3) {
        this.newElement('p', 'showAnswer', 'The correct answer is Second because you still have not passed the person in first.');
      }

      else if (control.count === 4) {
        this.newElement('p', 'showAnswer', 'The correct answer is They weigh the same, 1 pound = 1 pound');
      }

      if (control.count == sumOfQuestions - 1) {
        $('#nextQuest').hide();
        this.newElement('button', 'result', 'Results');
      }
    },

    removeAnswer: function (event) {
      event.preventDefault();
      $('#nextQuest').hide();
      $('#submit').show();
      $('#showAnswer').remove();
      
      var radioButtons = $("input[name='answers']");
      var allRadioButtons = radioButtons.length;
      var i;

      for (i = 0; i < allRadioButtons; i++) {
        radioButtons[i].checked = false;
      }
    },

    resultPage: function () {
      this.getApp.html('<h1 class="h3">You answered ' + data.total + ' question(s) correctly</h1> <h1 class="h3">You got ' + data.wrong + ' question(s) wrong</h1>');
      this.newElement('button', 'restart', 'Restart Quiz');
    },

    newElement: function (elem, elemId, elemText) {
      if (elem === 'button') {
        this.getApp.append(`<button id="${elemId}">${elemText}</button>`)
      }
      if (elem === 'p') {
        this.getApp.append(`<p id="${elemId}">${elemText}</p>`)
      }
    }
  };

  var control = {
    quizBegin: function () {
      display.getApp.off('click', '#start, #restart'); 
      display.getApp.on('click', '#start, #restart', function () {
        display.mainPage();
        control.update();
      });
    },
    
    update: function () {
      display.updateMainPage();
      display.getApp.off('click', '#submit'); 
      display.getApp.on('click', '#submit', this.checkAnswer);
    },

    checkAnswer: function (event) {
      event.preventDefault();
      var radioButtons = $("input[name='answers']"),
        allRadioButtons = radioButtons.length,
        isChecked = false,
        checkedRadio,
        i;

      for (i = 0; i < allRadioButtons; i++) {
        if (radioButtons[i].checked) {
          isChecked = true;
          checkedRadio = +radioButtons[i].value;
        }
      }

      if (isChecked === false) {
        alert('Please select your answer!');
      } 
      
      else {
        $('#submit').hide();
        $('#nextQuest').show();

        if (checkedRadio === data.quizContent[control.count].correctAnswer) {
          display.addAnswer('correct');
          data.total++;
        } 
        
        else {
          display.addAnswer();
          data.wrong++;
        }

        var nextQuestion = $('#nextQuest'),
          result = $('#result');

        if (control.count < data.quizContent.length - 1) {  
          display.getApp.off('click', '#nextQuest'); 
          display.getApp.on('click', '#nextQuest', function (event) {
            control.count++;
            display.removeAnswer(event);
            control.update();
          });
        } else {
          display.getApp.off('click', '#result');
          display.getApp.on('click', '#result', function () {
            display.resultPage();
            control.quizBegin();
            control.count = 0;
            data.total = 0;
            data.wrong = 0;
          });
        }
      }
    },
    count: 0
  };

  control.quizBegin();

})();