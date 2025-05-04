const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('h3');
    const restartBtn = document.querySelectorAll('button')[0];
    const quitBtn = document.querySelectorAll('button')[1];

    let currentPlayer = 'X';
    let gameActive = true;
    let board = ["", "", "", "", "", "", "", "", ""];

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(e) {
        const index = [...cells].indexOf(e.target);
        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== "")) {
            statusText.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;
        }
    }

    function checkWin() {
        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = "");
        statusText.textContent = "Player 1's turn";
    }

    function quitGame() {
        if (confirm("Are you sure you want to quit?")) {
            window.close(); 
        }
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartBtn.addEventListener('click', restartGame);
    quitBtn.addEventListener('click', quitGame);