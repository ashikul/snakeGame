$(document).ready(function () {

	var canvasElement;
	var canvasWidth;;
	var canvasHeight;
	var canvasContext;
	var currentSnakeDirection;
	var snakeArrayUnit;
	var snakeHeadXCoordinate;
	var snakeHeadYCoordinate;
	var foodUnit;
	var gameScore;
	var gameLoop;
	var SNAKE_DEFAULT_LENGTH = 5;
	var CELL_WIDTH = 20;

	startGame();

	function startGame() {

		setCanvasVariables();
		createSnakeCoordinates();
		createfoodUnitCoordinates();
		gameScore = 0;
		gameLoop = setInterval(paintFrame, 100);

	}

	function paintFrame() {

		paintGameBoard();
		getSnakeHeadCoordinates();
		moveSnakeHeadBasedOnDirection();

		if (isSnakeHeadAgainstTheWall()) {
			resetGame();
			return;
		}

		if (isSnakeHeadOnTheFood()) {
			gameScore++;
			createfoodUnitCoordinates();
		} else {
			snakeArrayUnit.pop();
		}

		updateSnakeArray();
		paintSnakeOnBoard();
		paintFoodOnBoard();
		updateGamescore();
	}

	function setCanvasVariables() {
		canvasElement = $("#canvas");
		canvasWidth = canvasElement.width();
		canvasHeight = canvasElement.height();
		canvasContext = canvasElement[0].getContext("2d");
	}

	function createSnakeCoordinates() {
		currentSnakeDirection = "right";
		snakeArrayUnit = [];
		for (var i = SNAKE_DEFAULT_LENGTH - 1; i >= 0; i--) {
			snakeArrayUnit.push({
				x: i,
				y: 0
			});
		}
	}

	function createfoodUnitCoordinates() {
		foodUnit = {
			x: Math.round(Math.random() * (canvasWidth - CELL_WIDTH) / CELL_WIDTH),
			y: Math.round(Math.random() * (canvasHeight - CELL_WIDTH) / CELL_WIDTH),
		};
	}

	function paintGameBoard() {
		canvasContext.fillStyle = "lightblue";
		canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
		canvasContext.strokeStyle = "black";
		canvasContext.strokeRect(0, 0, canvasWidth, canvasHeight);
		canvasContext.font = "30px Verdana";
	}

	function getSnakeHeadCoordinates() {
		snakeHeadXCoordinate = snakeArrayUnit[0].x;
		snakeHeadYCoordinate = snakeArrayUnit[0].y;
	}

	function moveSnakeHeadBasedOnDirection() {
		switch (currentSnakeDirection) {
			case "right":
				snakeHeadXCoordinate++;
				break;
			case "left":
				snakeHeadXCoordinate--;
				break;
			case "up":
				snakeHeadYCoordinate--;
				break;
			case "down":
				snakeHeadYCoordinate++;
				break;
		}
	}

	function isSnakeHeadAgainstTheWall() {
		return (snakeHeadXCoordinate == -1 || snakeHeadXCoordinate == canvasWidth / CELL_WIDTH || snakeHeadYCoordinate == -1 || snakeHeadYCoordinate == canvasHeight / CELL_WIDTH || checkForCollision(snakeHeadXCoordinate, snakeHeadYCoordinate, snakeArrayUnit));
	}

	function isSnakeHeadOnTheFood() {
		return (snakeHeadXCoordinate === foodUnit.x && snakeHeadYCoordinate === foodUnit.y);
	}

	function updateGamescore() {
		var gameScore_text = "Game Score: " + gameScore;
		canvasContext.fillStyle = "black";
		canvasContext.fillText(gameScore_text, 20, canvasHeight - 10);
	}

	function paintSnakeOnBoard() {
		for (var i = 0; i < snakeArrayUnit.length; i++) {
			var coordinate = snakeArrayUnit[i];
			paintArrayOnBoardHelper(coordinate.x, coordinate.y, "green");
		}
	}

	function paintFoodOnBoard() {
		paintArrayOnBoardHelper(foodUnit.x, foodUnit.y, "red");
	}

	function paintArrayOnBoardHelper(x, y, color) {
		canvasContext.fillStyle = color;
		canvasContext.fillRect(x * CELL_WIDTH, y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
		canvasContext.strokeStyle = "white";
		canvasContext.strokeRect(x * CELL_WIDTH, y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
	}

	function resetGame() {
		if (gameLoop) {
			clearInterval(gameLoop);
		}
		startGame();
	}

	function updateSnakeArray() {
		var tail = {
			x: snakeHeadXCoordinate,
			y: snakeHeadYCoordinate
		};
		snakeArrayUnit.unshift(tail);
	}

	function checkForCollision(x, y, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].x == x && array[i].y == y)
				return true;
		}
		return false;
	}

	$(document).keydown(function (e) {
		var key = e.which;
		if (key == "37" && currentSnakeDirection != "right") currentSnakeDirection = "left";
		else if (key == "38" && currentSnakeDirection != "down") currentSnakeDirection = "up";
		else if (key == "39" && currentSnakeDirection != "left") currentSnakeDirection = "right";
		else if (key == "40" && currentSnakeDirection != "up") currentSnakeDirection = "down";
	})

})
