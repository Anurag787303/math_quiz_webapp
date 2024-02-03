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

    // Adjust the position of the line element using the offsets
    lineDiv.style.top = (y1 - yOffset) + 'px';
    lineDiv.style.left = (x1 + xOffset) + 'px';

    document.body.appendChild(lineDiv);
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