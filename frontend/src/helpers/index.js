exports.linedraw = function (x1, y1, x2, y2, q) {
    if (x2 < x1) {
        var tmp;
        tmp = x2; x2 = x1; x1 = tmp;
        tmp = y2; y2 = y1; y1 = tmp;
    }

    let customHeight = 5;

    var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var m = (y2 - y1) / (x2 - x1);

    var degree = Math.atan(m) * 180 / Math.PI;

    // Calculate the offsets in x and y directions based on the angle
    var xOffset = customHeight * Math.sin(degree * Math.PI / 180);
    var yOffset = customHeight * Math.cos(degree * Math.PI / 180);

    const parentElement = document.querySelector('.question-body-container')

    var lineDiv = document.createElement('div');
    lineDiv.classList.add('match-line');
    lineDiv.classList.add(`q${q}`);
    lineDiv.id = q;
    lineDiv.style.transformOrigin = 'top left';
    lineDiv.style.transform = 'rotate(' + degree + 'deg)';
    lineDiv.style.width = lineLength + 'px';
    lineDiv.style.height = '1px';
    lineDiv.style.backgroundColor = 'black';
    lineDiv.style.position = 'absolute';

    // Get the position of the parentElement
    var parentRect = parentElement.getBoundingClientRect();

    // Adjust the position of the line element using the offsets and parentElement position
    lineDiv.style.top = (y1 - yOffset - parentRect.top) + 'px';
    lineDiv.style.left = (x1 + xOffset - parentRect.left) + 'px';
    parentElement.appendChild(lineDiv);
};

exports.logCenterPosition = function () {
    var element = document.getElementById('element');
    var rect = element.getBoundingClientRect();

    // Calculate center position with respect to the body
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;

    console.log('Center position with respect to body:');
    console.log('X:', centerX, 'Y:', centerY);
}

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

    for (let i = 0; i < numStrings; i++) {
        let randomNumberString = '';

        // Generate a random number between 10 and 99
        let randomNumber = Math.floor(Math.random() * 12) + 5;

        // Convert the random number to string and append
        randomNumberString += randomNumber.toString();

        result.push(randomNumberString);
    }

    return result;
}

function generateRandomNumberExpression(numExpression) {
    const operators = ['+', '-', '*'];
    const randomNumbers = generateRandomNumberStrings(numExpression * 2); // We need two numbers for each expression
    let expressions = [];

    for (let i = 0; i < numExpression; i++) {
        let randomNumber1 = randomNumbers[i * 2];
        let randomNumber2 = randomNumbers[i * 2 + 1];
        let operator = operators[Math.floor(Math.random() * operators.length)];

        let expression = randomNumber1 + ' ' + operator + ' ' + randomNumber2;
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

        if (!isNaN(currentNumber) && !isNaN(minNumber) && currentNumber < minNumber) {
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
}

exports.generateRandomExercise = function () {
    // Generate random expressions for t1, t2, and t3
    const t2Expressions = generateRandomNumberExpression(4);
    const t3Expressions = generateRandomNumberExpression(4);

    const t1 = {
        q1: generateRandomNumberStrings(4),
        q2: generateRandomNumberStrings(4)
    }

    const t2 = {
        q1: t2Expressions[0],
        q2: t2Expressions[1],
        q3: t2Expressions[2],
        q4: t2Expressions[3]
    }

    const t3 = {
        q1: t3Expressions[0],
        q2: t3Expressions[1],
        q3: t3Expressions[2],
        q4: t3Expressions[3]
    }

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
        }
    }

    const exercise = new Exercise(t1, t2, t3, answers);

    return exercise;
}

function calculateAnswers(expressions) {
    const answers = {};

    for (let i = 0; i < expressions.length; i++) {
        const expression = expressions[i];
        const [num1, operator, num2] = expression.split(' ');

        let answer;
        switch (operator) {
            case '+':
                answer = parseInt(num1) + parseInt(num2);
                break;
            case '-':
                answer = parseInt(num1) - parseInt(num2);
                break;
            case '*':
                answer = parseInt(num1) * parseInt(num2);
                break;
            default:
                answer = 'Invalid Operator';
        }

        answers[expression] = answer;
    }

    return answers;
}

exports.getCurrentExercise = function () {
    const exercise = JSON.parse(localStorage.getItem('exercise')) || null
    return exercise
}
