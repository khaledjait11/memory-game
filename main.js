/*
  [01] - FIRST STEP: Remove Slider and Put Name
  [02] - SECOND STEP: Set Time Out and Create Arrays
  [03] - THIRD STEP: Set Order(n) to All Elements Array
  [04] - FOURHT STEP: Suffle Order Range
  [05] - FIFTH STEP: Flipping Card
  [06] - SEXTH STEP: Stop click on Card 
  [07] - SEVENTH STEP: If Two Card are Similar or Not
  [08] - EIGHTH STEP: Set Background Music
  [09] - NINTH STEP: Set Time Over
  [10] - TENTH STEP: Time is Over
  [11] - 'ELEVENTH STEP' You Win Game
  [12] - 'TWELFTH STEP' Restart Game
*/

// :: FIRST STEP :: Remove Slider and Put Name
document.querySelector('.button-game button').onclick = function () {
    var promptName = prompt('what is your name ?'),
        infoName = document.querySelector('#name SPAN');
    
    if (promptName === null || promptName === '') {
        infoName.textContent = 'unknown';
    } else infoName.textContent = promptName
    
    document.querySelector('.button-game').style.opacity = '0';
    setTimeout(() => {
            document.querySelector('.button-game').remove();
        }, 500);
    
    startMusic(); // This is from 'EIGHTH STEP'
    counter(); // This is from 'NINTH STEP'
};

// :: SECOND STEP :: Set Time Out and Create Arrays
var duration = 1000,
    blocksContains = document.getElementById('contains-game-blocks'),
    blocks = Array.from(blocksContains.children),
    orderRange = Array.from(new Array(blocks.length).keys());

shuffle(orderRange); // => This is from 'FOURTH STEP'

// :: THIRD STEP :: Set Order(n) to All Array[block`s(n)]
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    
    // This is for 'FIFTH STEP'
    block.addEventListener('click', function () {
        flipBlock(block);
    });
});

// :: FOURTH STEP :: Suffle Order Range
function shuffle(array) {
    var current = blocks.length,
        random,
        temp;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        
        temp = array[current];
        // Current Array [1, 2, 3, 4, 5, 6, 7...]
        array[current] = array[random];
        // New Array [3, 1, 7, 2, 6, 4, 5...]
        array[random] = temp;
    }
}

// :: FIFTH STEP :: Flipping Card
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('flipped');
    
    // This is for 'SIXTH & SEVENTH STEP'
    var allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('flipped'));
    if (allFlippedBlocks.length === 2) {
        stopClickBlock(); // => This is from 'SIXTH STEP'
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]); // => This is from 'SEVENTH STEP'
    }
}

// :: SIXTH STEP :: Stop click on Card 
function stopClickBlock() {
    blocksContains.style.pointerEvents = 'none';
    setTimeout(() => {
        blocksContains.style.pointerEvents = 'inherit';
    }, duration);
}

// :: SEVENTH STEP :: If Two Card are Similar or Not
function checkMatchedBlocks(firstBlock, secondBlock) {
    var triesElement = document.querySelector('#tries SPAN');
    if (firstBlock.dataset.card === secondBlock.dataset.card) {
        firstBlock.classList.remove('flipped');
        secondBlock.classList.remove('flipped');
        
        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');
        
        document.getElementById('success').play();
    } else {
        triesElement.textContent = parseInt(triesElement.textContent) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('flipped');
            secondBlock.classList.remove('flipped');
            document.getElementById('fail').play();
        }, duration);
    }
}

// :: EIGHTH STEP :: Start Background Music
function startMusic() {
    var startThisMusic = document.getElementById('start-music'),
        stopMyMusic = document.getElementById('stop'),
        startMyMusic = document.getElementById('start');
    
    startThisMusic.play();
    stopMyMusic.onclick = function () {
        startThisMusic.pause();
        this.style.boxShadow = '1px 1px 2px #000';
        startMyMusic.style.boxShadow = '3px 3px 6px #111';
    };
    startMyMusic.onclick = function () {
        startThisMusic.play();
        this.style.boxShadow = '1px 1px 2px #000';
        stopMyMusic.style.boxShadow = '3px 3px 6px #111';
    };
}

// :: NINTH STEP :: Set Time over
function counter() {
    var counter = document.querySelector('.btn-reset'),
        seconds = 119,
        count = setInterval(function () {
            myCounter();
        }, 1000);
    
    function myCounter() {
        var minutes = Math.floor(seconds / 60),
            rmSeconds = seconds % 60;
        
        var allMatchedBlocksCount = blocks.filter(matchedBlockCount => matchedBlockCount.classList.contains('matched'));
        if (allMatchedBlocksCount.length === blocks.length) {
            clearInterval(count);
        }
        if (minutes < 10) {minutes = "0" + minutes;}
        if (rmSeconds < 10) {rmSeconds = "0" + rmSeconds}
        
        counter.textContent = minutes + " : " + rmSeconds;
        
        if (seconds > 0) {
            seconds -= 1
        } else {
            clearInterval(count);
            timeIsOver(); // => This is from 'TENTH STEP'
        }
    }
}

// :: TENTH STEP :: Time is Over
function timeIsOver() {
    document.getElementById('game-over').style.display = 'block';
    document.querySelector('#box-over H3').textContent = "Sorry, you lose..";
    document.querySelector('#box-over H3').style.color = 'crimson';
    document.getElementById('start-music').pause();
    document.getElementById('start-music').currentTime = 0;
    document.getElementById('lose').play();
    document.querySelector('#box-over H4').style.display = 'none';
}

// :: ELEVENTH STEP :: You Win Game
function matchedBlocks(matchedBlock) {
    var allMatchedBlocks = blocks.filter(matchedBlock => matchedBlock.classList.contains('matched'));
    if (allMatchedBlocks.length === blocks.length) {
        document.getElementById('game-over').style.display = 'block';
        document.querySelector('#box-over H3').textContent = "Good game, you win..";
        document.querySelector('#box-over H3').style.color = 'yellowgreen';
        document.getElementById('start-music').pause();
        document.getElementById('start-music').currentTime = 0;
        document.getElementById('win').play();
        document.querySelector('#box-over H4').style.display = 'block';
        
        // How long Game Take it
        var minuteTake = parseInt(document.querySelector('.btn-reset').textContent.slice(0, 2)),
            secondTake = parseInt(document.querySelector('.btn-reset').textContent.slice(4)),
            minutesTake = minuteTake * 60,
            timeTike = minutesTake + secondTake,
            timeYouTake = 119 - timeTike,
            timeMinute = Math.floor(timeYouTake / 60),
            timeSecond = timeYouTake % 60;
        if (timeMinute === 0) {
            document.querySelector('#box-over H4').textContent =
                "You Take " + timeSecond + " seconds";
        } else document.querySelector('#box-over H4').textContent =
            "You Take " + timeMinute + " minutes, and " + timeSecond + " seconds";
    }
}

// => This is for 'ELEVETH STEP'
blocks.forEach((blockMatched, index) => {
    blockMatched.addEventListener('click', function () {
        matchedBlocks(blockMatched);
    });
});


// 'TWELFTH STEP' Restart Game
var restartGame = document.querySelector('#box-over BUTTON'),
    placeStorage = document.getElementById('wrong-storage'),
    placeName = document.querySelector('#name SPAN'),
    topPlaceStorage = document.getElementById('wrong-storage-refresh'),
    btnReset = parseInt(document.querySelector('.btn-reset').textContent.slice(4)),
    placeWrong = document.querySelector('#tries SPAN');
restartGame.onclick = function () {
    // => Remove Box & Repeat Music, Repeat Audio Button
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('start-music').play();
    document.getElementById('stop').style.boxShadow = 'rgb(17, 17, 17) 3px 3px 6px';
    document.getElementById('start').style.boxShadow = 'rgb(17, 17, 17) 3px 3px 6px';
    
    // => Repeat Suffle Order
    var orderRangeAgain = Array.from(new Array(blocks.length).keys());
    shuffle(orderRangeAgain);
    function shuffleAgain(arrayAgain) {
    var currentAgain = blocks.length,
        randomAgain,
        tempAgain;
    while (currentAgain > 0) {
        randomAgain = Math.floor(Math.random() * currentAgain);
        currentAgain--;
        tempAgain = arrayAgain[currentAgain];
        arrayAgain[currentAgain] = arrayAgain[randomAgain];
        arrayAgain[randomAgain] = tempAgain;
    }
}
    // Remove Matched, Flipped Classes & Add Order Number
    blocks.forEach((blockMatchRemove, index) => {
        blockMatchRemove.classList.remove('matched');
        blockMatchRemove.classList.remove('flipped');
        
        blockMatchRemove.style.order = orderRangeAgain[index];
    });
    
    // Storage Time You Wrong
    localStorage.setItem(placeName.textContent, placeWrong.textContent);
    document.getElementById('wrong-storage-refresh').innerHTML =
        "<div>Your previous playing: <span style='color:crimson'>" + placeWrong.textContent + "</span> tries wrong</div>";
    placeWrong.textContent = "0";
            
    return counter(); // => Restart Game Counter
};

if (localStorage.length) {
    for (let [key, value] of Object.entries(localStorage)) {
        placeStorage.innerHTML +=
            "<div><span style='color:dodgerblue'>" + key + "</span> tries wrong <span style='color:dodgerblue'>" + value + "</span> times | <em style='color:grey'>last time</em></div><hr>";
    }
}