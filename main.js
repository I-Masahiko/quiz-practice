  const questionNum = document.getElementById(`questionNum`);
  const questionGenre = document.getElementById(`questionGenre`);
  const questionDifficulty = document.getElementById(`questionDifficulty`);
  const questionContent = document.getElementById(`questionContent`);
  const chooseBtn = document.getElementById(`chooseBtn`);
  const startBtn = document.getElementById(`startBtn`);


  const answerState = {
    quizzes : [],
    currentIndex : 0,
    numberOfCurrets : 0,
  }

  //開始ボタンをクリックした時に、URLから問題を取得して最初の問題を表示する

  startBtn.addEventListener(`click`, () => {
    fetchQuizData();
  });

　//問題の取得からcorrectとincorrectの配列の配合をする

  const fetchQuizData = function() {
    questionNum.textContent = `取得中`;
    questionContent.textContent = `少々お待ちください`;
    startBtn.hidden = true;

    fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        answerState.quizzes = data.results;
        answerState.currentIndex = 0;
        answerState.numberOfCurrets = 0;

        console.log(answerState.quizzes);

        nextQuiz();
      })
  };

  //forかwhileで10問分の問題の繰り返しを書く

  // i = 0;

  const nextQuiz = function() {
    questionNum.textContent = `問題${answerState.currentIndex + 1}`;
    questionGenre.textContent = `[ジャンル] ${answerState.quizzes[answerState.currentIndex].category}`;
    questionDifficulty.textContent = `[難易度] ${answerState.quizzes[answerState.currentIndex].difficulty}`;
    questionContent.textContent = answerState.quizzes[answerState.currentIndex].question;

    answerState.quizzes[answerState.currentIndex].incorrect_answers.push(answerState.quizzes[answerState.currentIndex].correct_answer);
    createBtn();
  }

  //ボタンの生成から、クリック後の動作を書く

  const createBtn = function() {

    const current = answerState.quizzes[answerState.currentIndex].correct_answer;
    console.log(current);

    let  quizNum = answerState.quizzes[answerState.currentIndex].incorrect_answers.length;

    // shuffleAnswers();
    const answers = [...answerState.quizzes[answerState.currentIndex].incorrect_answers];
    console.log(answers);
    const answersCopies = answers.slice();

    for (let answersNum = quizNum - 1 ; answersNum >= 0 ; answersNum-- ){
      const rand = Math.floor(Math.random() * quizNum);
      [answers[quizNum],answers[rand]] = [answers[rand],answers[quizNum]]
    // }
    //
    // for (let answersNum = quizNum - 1 ; answersNum >= 0 ; answersNum-- ){

      const answerBtn = document.createElement(`button`);
      const br = document.createElement(`br`);

      answerBtn.textContent = answerState.quizzes[answerState.currentIndex].incorrect_answers[answersNum];
      chooseBtn.appendChild(answerBtn);
      chooseBtn.appendChild(br);

      answerBtn.addEventListener(`click`, () =>{
        answerState.currentIndex++;

        if(answerBtn.textContent === current){
          answerState.numberOfCurrets++;
        };

        if(answerState.currentIndex === answerState.quizzes.length){
          questionNum.textContent = `あなたの正答数は${answerState.numberOfCurrets}です`;
          questionGenre.textContent = ``;
          questionDifficulty.textContent = ``;
          questionContent.textContent = '再度チャレンジしたい場合は以下をクリック！！';

          removeBtn();

          const homeBtn = document.createElement(`button`);
          homeBtn.textContent = `ホームに戻る`;
          chooseBtn.appendChild(homeBtn);

          homeBtn.addEventListener(`click`,()=>{
            homeBtn.hidden = true;

            fetchQuizData();

          });
        }else {

          removeBtn();

          nextQuiz();
        };


      });
    };
  };


    const removeBtn = function() {
      while (chooseBtn.firstChild) {
       chooseBtn.removeChild(chooseBtn.firstChild);
     };
   };


   // const shuffleAnswers = function() {
   //   const answers = [...answerState.quizzes[answerState.currentIndex].incorrect_answers];
   //   console.log(answers);
   //   const answersCopies = answers.slice();
   //
   //   for (let answersNum = quizNum - 1 ; answersNum >= 0 ; answersNum-- ){
   //     const rand = Math.floor(Math.random() * quizNum);
   //     [answers[quizNum],answers[rand]] = [answers[rand],answers[quizNum]]
   //   }
   // }
