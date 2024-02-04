exports.linedraw = function (x1, y1, x2, y2, q) {
  if (x2 < x1) {
    var tmp;
    tmp = x2;
    x2 = x1;
    x1 = tmp;
    tmp = y2;
    y2 = y1;
    y1 = tmp;
  }

  let customHeight = 5;

  var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var m = (y2 - y1) / (x2 - x1);

  var degree = (Math.atan(m) * 180) / Math.PI;

  // Calculate the offsets in x and y directions based on the angle
  var xOffset = customHeight * Math.sin((degree * Math.PI) / 180);
  var yOffset = customHeight * Math.cos((degree * Math.PI) / 180);

  const parentElement = document.querySelector(".question-body-container");

  var lineDiv = document.createElement("div");
  lineDiv.classList.add("match-line");
  lineDiv.classList.add(`q${q}`);
  lineDiv.id = q;
  lineDiv.style.transformOrigin = "top left";
  lineDiv.style.transform = "rotate(" + degree + "deg)";
  lineDiv.style.width = lineLength + "px";
  lineDiv.style.height = "1px";
  lineDiv.style.backgroundColor = "black";
  lineDiv.style.position = "absolute";

  // Get the position of the parentElement
  var parentRect = parentElement.getBoundingClientRect();

  // Adjust the position of the line element using the offsets and parentElement position
  lineDiv.style.top = y1 - yOffset - parentRect.top + "px";
  lineDiv.style.left = x1 + xOffset - parentRect.left + "px";
  parentElement.appendChild(lineDiv);
};

class Exercise {
  constructor(t1, t2, t3, answers) {
    this.t1 = t1;
    this.t2 = t2;
    this.t3 = t3;
    this.answers = answers;
  }
}

function generateRandomNumberStrings(numStrings) {
  let result = [];
  let visited = [];

  for (let i = 0; i < numStrings; i++) {
    let randomNumberString = "";

    // Generate a random number between 10 and 99
    let randomNumber = Math.floor(Math.random() * 12) + 5;
    while (visited[randomNumber]) {
      randomNumber = Math.floor(Math.random() * 12) + 5;
    }
    visited[randomNumber] = true;

    // Convert the random number to string and append
    randomNumberString += randomNumber.toString();

    result.push(randomNumberString);
  }

  return result;
}

exports.calculateScore = (v) => {
  return (
    (v && v.t1.q1 ? 1 : 0) +
    (v && v.t1.q2 ? 1 : 0) +
    (v && v.t2.q1 ? 1 : 0) +
    (v && v.t2.q2 ? 1 : 0) +
    (v && v.t2.q3 ? 1 : 0) +
    (v && v.t2.q4 ? 1 : 0) +
    (v && v.t3.q1 ? 1 : 0) +
    (v && v.t3.q2 ? 1 : 0) +
    (v && v.t3.q3 ? 1 : 0) +
    (v && v.t3.q4 ? 1 : 0)
  );
};

exports.calculateSpecificScores = (v, e, match) => {
  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;

  // T1
  if (v.t1.q1 === null) unattempted++;
  else if (v.t1.q1[1] == e.t1.q1) correct++;
  else incorrect++;

  if (v.t1.q2 === null) unattempted++;
  else if (v.t1.q2[1] == e.t1.q2) correct++;
  else incorrect++;

  // T2
  if (v.t2.q1 === null) unattempted++;
  else if (match[v.t2.q1] == e.t2.q1) correct++;
  else incorrect++;

  if (v.t2.q2 === null) unattempted++;
  else if (match[v.t2.q2] == e.t2.q2) correct++;
  else incorrect++;

  if (v.t2.q3 === null) unattempted++;
  else if (match[v.t2.q3] == e.t2.q3) correct++;
  else incorrect++;

  if (v.t2.q4 === null) unattempted++;
  else if (match[v.t2.q4] == e.t2.q4) correct++;
  else incorrect++;

  // T3
  if (v.t3.q1 === null || v.t3.q1 == "") unattempted++;
  else if (v.t3.q1 == e.t3.q1) correct++;
  else incorrect++;

  if (v.t3.q2 === null || v.t3.q2 == "") unattempted++;
  else if (v.t3.q2 == e.t3.q2) correct++;
  else incorrect++;

  if (v.t3.q3 === null || v.t3.q3 == "") unattempted++;
  else if (v.t3.q3 == e.t3.q3) correct++;
  else incorrect++;

  if (v.t3.q4 === null || v.t3.q4 == "") unattempted++;
  else if (v.t3.q4 == e.t3.q4) correct++;
  else incorrect++;

  console.log(v, e, match);

  return {
    correct,
    incorrect,
    unattempted,
  };
};

function generateRandomNumberExpression(numExpression) {
  const operators = ["+", "-", "*"];
  const randomNumbers = generateRandomNumberStrings(numExpression * 2); // We need two numbers for each expression
  let expressions = [];

  for (let i = 0; i < numExpression; i++) {
    let randomNumber1 = randomNumbers[i * 2];
    let randomNumber2 = randomNumbers[i * 2 + 1];
    let operator = operators[Math.floor(Math.random() * operators.length)];

    let expression = randomNumber1 + " " + operator + " " + randomNumber2;
    expressions.push(expression);
  }

  return expressions;
}

function findMinimumNumberString(strings) {
  if (strings.length === 0) return null;

  let minNumberString = strings[0];

  for (let i = 1; i < strings.length; i++) {
    let currentNumber = parseInt(strings[i]);
    let minNumber = parseInt(minNumberString);

    if (
      !isNaN(currentNumber) &&
      !isNaN(minNumber) &&
      currentNumber < minNumber
    ) {
      minNumberString = strings[i];
    }
  }

  return minNumberString;
}

exports.getRandomOrder = function (nums) {
  // Create a copy of the original array to avoid modifying the original
  const shuffledNums = nums.slice();

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledNums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledNums[i], shuffledNums[j]] = [shuffledNums[j], shuffledNums[i]];
  }

  return shuffledNums;
};

exports.generateRandomExercise = function () {
  // Generate random expressions for t1, t2, and t3
  const t2Expressions = generateRandomNumberExpression(4);
  const t3Expressions = generateRandomNumberExpression(4);

  const t1 = {
    q1: generateRandomNumberStrings(4),
    q2: generateRandomNumberStrings(4),
  };

  const t2 = {
    q1: t2Expressions[0],
    q2: t2Expressions[1],
    q3: t2Expressions[2],
    q4: t2Expressions[3],
  };

  const t3 = {
    q1: t3Expressions[0],
    q2: t3Expressions[1],
    q3: t3Expressions[2],
    q4: t3Expressions[3],
  };

  // Calculate answers for t1, t2, and t3 expressions
  const t2Answers = calculateAnswers(t2Expressions);
  const t3Answers = calculateAnswers(t3Expressions);

  const answers = {
    t1: {
      q1: findMinimumNumberString(t1.q1),
      q2: findMinimumNumberString(t1.q2),
    },
    t2: {
      q1: t2Answers[t2.q1],
      q2: t2Answers[t2.q2],
      q3: t2Answers[t2.q3],
      q4: t2Answers[t2.q4],
    },
    t3: {
      q1: t3Answers[t3.q1],
      q2: t3Answers[t3.q2],
      q3: t3Answers[t3.q3],
      q4: t3Answers[t3.q4],
    },
  };

  const exercise = new Exercise(t1, t2, t3, answers);

  return exercise;
};

function calculateAnswers(expressions) {
  const answers = {};

  for (let i = 0; i < expressions.length; i++) {
    const expression = expressions[i];
    const [num1, operator, num2] = expression.split(" ");

    let answer;
    switch (operator) {
      case "+":
        answer = parseInt(num1) + parseInt(num2);
        break;
      case "-":
        answer = parseInt(num1) - parseInt(num2);
        break;
      case "*":
        answer = parseInt(num1) * parseInt(num2);
        break;
      default:
        answer = "Invalid Operator";
    }

    answers[expression] = answer;
  }

  return answers;
}

exports.getCurrentExercise = function () {
  const exercise = JSON.parse(localStorage.getItem("exercise")) || null;
  return exercise;
};

exports.changeDurationFormat = (duration) => {
  let seconds = Math.floor(duration / 1000);

  // Calculate hours, minutes, and remaining seconds
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Format the duration as HH:MM:SS
  let formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedDuration;
};

exports.changeTimeFormat = function (timestamp) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};
