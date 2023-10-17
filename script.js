// ナンプレの初期盤面をランダムに生成する関数
function generateRandomPuzzle() {
    const puzzle = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(0); // 初期状態ではすべてのセルを0で初期化
        }
        puzzle.push(row);
    }

    // 数字をランダムに配置
    for (let i = 0; i < 30; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        const num = Math.floor(Math.random() * 9) + 1;
        if (isValidMove(puzzle, row, col, num)) {
            puzzle[row][col] = num;
        }
    }

    return puzzle;
}

// 与えられた数字が指定した行、列、ボックス内で有効かどうかをチェックする関数
function isValidMove(puzzle, row, col, num) {
    // チェックロジックをここに実装
    // 同じ行、列、ボックス内に同じ数字があるかどうかをチェック
    for (let i = 0; i < 9; i++) {
        if (puzzle[row][i] === num || puzzle[i][col] === num) {
            return false;
        }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (puzzle[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

// 初期盤面を取得
let initialPuzzle = generateRandomPuzzle();
// 現在の盤面を初期盤面で初期化
let currentPuzzle = clonePuzzle(initialPuzzle);

// ナンプレのセルに対応するinput要素を生成し、初期盤面をセット
const puzzleContainer = document.getElementById("puzzle-container");
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
        input.value = currentPuzzle[i][j] === 0 ? "" : currentPuzzle[i][j];
        puzzleContainer.appendChild(input);
    }
}

// チェックボタンのクリックイベントリスナーを追加
const checkButton = document.getElementById("check-button");
checkButton.addEventListener("click", function() {
    // チェックロジックをここに実装
    if (isPuzzleSolved(currentPuzzle)) {
        if (isPuzzleComplete(currentPuzzle)) {
            showMessage("ナンプレが正しく解かれました！");
        } else {
            showMessage("ナンプレは未完了です。");
        }
    } else {
        showMessage("ナンプレが正しく解かれていません。");
    }
});

// リセットボタンのクリックイベントリスナーを追加
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function() {
    resetPuzzle();
    showMessage(""); // コメントをクリア
});

// リスタートボタンのクリックイベントリスナーを追加
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", function() {
    restartPuzzle();
    showMessage(""); // コメントをクリア
});

// 盤面を更新する関数
function updatePuzzle() {
    const inputs = puzzleContainer.querySelectorAll("input");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputs[i * 9 + j].value = currentPuzzle[i][j] === 0 ? "" : currentPuzzle[i][j];
        }
    }
}

// ナンプレの盤面をリセットする関数
function resetPuzzle() {
    // 現在の盤面を初期盤面でリセット
    currentPuzzle = clonePuzzle(initialPuzzle);
    updatePuzzle();
}

// ナンプレの盤面をリスタートする関数
function restartPuzzle() {
    // 新しいランダムな盤面を生成
    initialPuzzle = generateRandomPuzzle();
    // 現在の盤面を新しい盤面でリスタート
    currentPuzzle = clonePuzzle(initialPuzzle);
    updatePuzzle();
}

// ナンプレの盤面をコピーする関数
function clonePuzzle(puzzle) {
    const clone = [];
    for (let i = 0; i < 9; i++) {
        clone.push([...puzzle[i]]);
    }
    return clone;
}

// ナンプレが正しく解かれているかをチェックする関数
function isPuzzleSolved(puzzle) {
    // チェックロジックをここに実装
    // 各行、各列、各ボックスに1から9までの数字が重複なく存在するかをチェック
    return checkRows(puzzle) && checkColumns(puzzle) && checkBoxes(puzzle);
}

// 各行に1から9までの数字が重複なく存在するかをチェックする関数
function checkRows(puzzle) {
    for (let i = 0; i < 9; i++) {
        const row = puzzle[i];
        if (!isUnique(row)) {
            return false;
        }
    }
    return true;
}

// 各列に1から9までの数字が重複なく存在するかをチェックする関数
function checkColumns(puzzle) {
    for (let j = 0; j < 9; j++) {
        const column = [];
        for (let i = 0; i < 9; i++) {
            column.push(puzzle[i][j]);
        }
        if (!isUnique(column)) {
            return false;
        }
    }
    return true;
}

// 各ボックスに1から9までの数字が重複なく存在するかをチェックする関数
function checkBoxes(puzzle) {
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
        for (let boxCol = 0; boxCol < 9; boxCol += 3) {
            const box = [];
            for (let i = boxRow; i < boxRow + 3; i++) {
                for (let j = boxCol; j < boxCol + 3; j++) {
                    box.push(puzzle[i][j]);
                }
            }
            if (!isUnique(box)) {
                return false;
            }
        }
    }
    return true;
}

// 配列内の要素が重複していないかをチェックする関数
function isUnique(arr) {
    const seen = new Set();
    for (const num of arr) {
        if (num !== 0 && seen.has(num)) {
            return false;
        }
        seen.add(num);
    }
    return true;
}

// ナンプレが完了しているかをチェックする関数
function isPuzzleComplete(puzzle) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (puzzle[i][j] === 0) {
                return false; // 未設定のセルがあれば未完了
            }
        }
    }
    return true; // 未設定のセルがなければ完了
}

// メッセージを表示する関数
function showMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
}
