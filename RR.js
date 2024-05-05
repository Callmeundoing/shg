// QUESTIONS

const questions = [
    {
      "question": "Do you care for the enviroment?",
      "answer1": "A. No, I despise it.",
      "answer1Total": "1",
      "answer2": "B. A little bit.",
      "answer2Total": "2",
      "answer3": "C. I care alot.",
      "answer3Total": "3"
    },
    {
      "question": "What is your primary interest in the dam?",
      "answer1": "A. I am interested in how the dam can provide electricity for my needs.",
      "answer1Total": "1",
      "answer2": "B. I am interested in how the dam affects my community’s way of life.",
      "answer2Total": "2",
      "answer3": "C. I am concerned about the dam’s impact on the local ecosystem.",
      "answer3Total": "3"
    },
    {
      "question":
        "What is your main concern about the dam’s operation?",
      "answer1": "A. I am concerned about the dam’s ability to meet my resource needs.",
      "answer1Total": "1",
      "answer2": "B. I am concerned about the dam’s impact on local wildlife and habitats.",
      "answer2Total": "3",
      "answer3": "C. I am concerned about the dam’s safety and its impact on my community.",
      "answer3Total": "2"
    },
    {
      "question": "What would you like to see in the dam’s future plans?",
      "answer1": "A. I would like to see plans for environmental conservation and restoration.",
      "answer1Total": "3",
      "answer2": "B. I would like to see plans for community involvement and respect for cultural heritage.",
      "answer2Total": "2",
      "answer3":
        "C. I would like to see plans for increased resource generation or management.",
      "answer3Total": "1"
    },
    {
      "question": "How would you prioritize the use of the dam’s resources?",
      "answer1": "A. I would prioritize resource generation for electricity or irrigation.",
      "answer1Total": "1",
      "answer2": "B. I would prioritize the needs and rights of the local community.",
      "answer2Total": "2",
      "answer3": "C. I would prioritize the preservation of natural habitats.",
      "answer3Total": "3"
    },
    {
      "question":
        "What is your perspective on the dam’s impact on the local area?",
      "answer1":
        "A. I see it as a potential threat to the environment.",
      "answer1Total": "3",
      "answer2": "B. I see it as a factor that can significantly change our way of life.",
      "answer2Total": "2",
      "answer3": "C. I see it as a necessary infrastructure for progress and development.",
      "answer3Total": "1"
    },
    {
      "question": "How would you approach decision-making about the dam?",
      "answer1": "A. I would focus on maximizing efficiency and productivity.",
      "answer1Total": "1",
      "answer2": "B. I would focus on ensuring community involvement and cultural respect.",
      "answer2Total": "2",
      "answer3": "C. I would focus on minimizing environmental impact.",
      "answer3Total": "3"
    }
  ]
  
  
  let currentQuestion = 0;
  let score = [];
  let selectedAnswersData = [];
  const totalQuestions =questions.length;
  
  const container = document.querySelector('.quiz-container');
  const questionEl = document.querySelector('.question');
  const option1 = document.querySelector('.option1');
  const option2 = document.querySelector('.option2');
  const option3 = document.querySelector('.option3');
  const nextButton = document.querySelector('.next');
  const previousButton = document.querySelector('.previous');
  const restartButton = document.querySelector('.restart');
  const result = document.querySelector('.result');
  
  //Function to generate question 
  function generateQuestions (index) {
      //Select each question by passing it a particular index
      const question = questions[index];
      const option1Total = questions[index].answer1Total;
      const option2Total = questions[index].answer2Total;
      const option3Total = questions[index].answer3Total;
      //Populate html elements 
      questionEl.innerHTML = `${index + 1}. ${question.question}`
      option1.setAttribute('data-total', `${option1Total}`);
      option2.setAttribute('data-total', `${option2Total}`);
      option3.setAttribute('data-total', `${option3Total}`);
      option1.innerHTML = `${question.answer1}`
      option2.innerHTML = `${question.answer2}`
      option3.innerHTML = `${question.answer3}`
  }
  
  
  function loadNextQuestion () {
      const selectedOption = document.querySelector('input[type="radio"]:checked');
      //Check if there is a radio input checked
      if(!selectedOption) {
          alert('Please select your answer!');
          return;
      }
      //Get value of selected radio
      const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));
  
      ////Add the answer score to the score array
      score.push(answerScore);
  
      selectedAnswersData.push()
      
  
      const totalScore = score.reduce((total, currentNum) => total + currentNum);
  
      //Finally we incement the current question number ( to be used as the index for each array)
      currentQuestion++;
  
          //once finished clear checked
          selectedOption.checked = false;
      //If quiz is on the final question
      if(currentQuestion == totalQuestions - 1) {
          nextButton.textContent = 'Finish';
      }
      //If the quiz is finished then we hide the questions container and show the results 
      if(currentQuestion == totalQuestions) {
          container.style.display = 'none';
          result.innerHTML =
           `<h1 class="final-score">Your score: ${totalScore}</h1>
           <div class="summary">
              <h1>Summary</h1>
              <p>Possible - Stakeholder Traits, see below for a summary based on your results:</p>
              <p>15 - 21- Enviromentalist</p>
              <p>8 - 14 - Tribe or Community Member</p>
              <p>1 - 7 - Energy Company or Farmer </p>
              <p>0 - Not applicable, try quiz agian</p>
          </div>
          <button class="restart">Restart Quiz</button>
           `;
          return;
      }
      generateQuestions(currentQuestion);
  }
  
  //Function to load previous question
  function loadPreviousQuestion() {
      //Decrement quentions index
      currentQuestion--;
      //remove last array value;
      score.pop();
      //Generate the question
      generateQuestions(currentQuestion);
  }
  
  //Fuction to reset and restart the quiz;
  function restartQuiz(e) {
      if(e.target.matches('button')) {
      //reset array index and score
      currentQuestion = 0;
      score = [];
      //Reload quiz to the start
      location.reload();
      }
  
  }
  
  
  generateQuestions(currentQuestion);
  nextButton.addEventListener('click', loadNextQuestion);
  previousButton.addEventListener('click',loadPreviousQuestion);
  result.addEventListener('click',restartQuiz);