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
  [13] - 'THIRTEENTH STEP' Next Level => 'Level PlusPlus'
  [14] - 'FOURTEENTH STEP' Restart All Level
  [15] - 'FIFTEEN STEP' Switch Dynamic/Auto Play
*/

// :: FIRST STEP :: Remove Slider and Put Name
document.querySelector('.button-game button').onclick = function () {
    var promptName = prompt('Enter your username'),
        infoName = document.querySelector('#name SPAN');
    
    if (promptName === null || promptName === '') {
        infoName.textContent = 'unknown';
    } else infoName.textContent = promptName;
    
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
        this.style.boxShadow = '1px 1px 2px #ddbcff';
        startMyMusic.style.boxShadow = '3px 3px 1px #ddbcff';
    };
    startMyMusic.onclick = function () {
        startThisMusic.play();
        this.style.boxShadow = '1px 1px 2px #ddbcff';
        stopMyMusic.style.boxShadow = '3px 3px 1px #ddbcff';
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
        if (allMatchedBlocksCount.length === blocks.length) {clearInterval(count);}
        if (boxDynamic.getAttribute('style') === "display: block;") {clearInterval(count);}
        if (boxResetAuto.getAttribute('style') === "display: block;") {clearInterval(count);}
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
    document.querySelector('#box-over H1').textContent = "Game Over";
    document.querySelector('#box-over H3').textContent = "Sorry, you lose..";
    document.querySelector('#box-over H3').style.color = '#d103fc';
    document.getElementById('start-music').pause();
    document.getElementById('start-music').currentTime = 0;
    document.getElementById('lose').play();
    document.querySelector('#box-over H4').style.display = 'none';
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('btn-next-1').style.display = 'none';
    document.getElementById('or').style.display = 'none';
    document.getElementById('btn-over-dynamic').style.display = 'none';
    if (btnSwitchDynamic.checked === true) {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('game-end').style.display = 'none';
        document.getElementById('game-dynamic-over').style.display = 'block';
    }
}

// :: ELEVENTH STEP :: You Win Game
function matchedBlocks(matchedBlock) {
    blocks = Array.from(blocksContains.children);
    var allMatchedBlocks = blocks.filter(matchedBlock => matchedBlock.classList.contains('matched'));
    if (allMatchedBlocks.length === blocks.length) {
        document.getElementById('game-over').style.display = 'block';
        document.querySelector('#box-over H1').textContent = "Well Done";
        document.querySelector('#box-over H3').textContent = "Good game, you win..";
        document.querySelector('#box-over H3').style.color = '#d103fc';
        document.getElementById('start-music').pause();
        document.getElementById('start-music').currentTime = 0;
        if (blocks.length <= 24) {document.getElementById('win').play();}
        document.querySelector('#box-over H4').style.display = 'block';
        document.getElementById('btn-next').style.display = 'inline-block';
        document.getElementById('or').style.display = 'inline-block';
        document.getElementById('btn-over-dynamic').style.display = 'none';
        
        // How long Game Take it
        var minuteTake = parseInt(document.querySelector('.btn-reset').textContent.slice(0, 2)),
            secondTake = parseInt(document.querySelector('.btn-reset').textContent.slice(4)),
            minutesTake = minuteTake * 60,
            timeTike = minutesTake + secondTake,
            timeYouTake = 119 - timeTike,
            timeMinute = Math.floor(timeYouTake / 60),
            timeSecond = timeYouTake % 60;
        // This is for box '#game-over'
        if (timeMinute === 0) {
            document.querySelector('#box-over H4').textContent =
                "You Taked " + timeSecond + " seconds";
        } else document.querySelector('#box-over H4').textContent =
            "You Taked " + timeMinute + " minute and " + timeSecond + " seconds";
        
        // This is for box '#game-end'
        if (timeMinute === 0) {
            document.querySelector('#box-game-end H3').textContent =
                "You Taked " + timeSecond + " seconds";
        } else document.querySelector('#box-game-end H3').textContent =
            "You Taked " + timeMinute + " minute and " + timeSecond + " seconds";
        
        if (btnSwitchDynamic.checked === true) {
            document.getElementById('game-over').style.display = 'none';
            document.getElementById('game-end').style.display = 'none';
            document.getElementById('game-dynamic-over').style.display = 'block';
            if (timeMinute === 0) {
                document.querySelector('#game-dynamic-over H3').textContent =
                "You Taked " + timeSecond + " seconds";
            } else document.querySelector('#game-dynamic-over H3').textContent =
            "You Taked " + timeMinute + " minute and " + timeSecond + " seconds";
        }
    }
}

// => This is for 'ELEVETH STEP'
blocks.forEach((blockMatched, index) => {
    blockMatched.addEventListener('click', function () {
        matchedBlocks(blockMatched);
    });
});


// 'TWELFTH STEP' Restart Game
var restartGame = document.getElementById('btn-restart'),
    placeStorage = document.getElementById('wrong-storage'),
    placeName = document.querySelector('#name SPAN'),
    topPlaceStorage = document.getElementById('wrong-storage-refresh'),
    btnReset = parseInt(document.querySelector('.btn-reset').textContent.slice(4)),
    placeWrong = document.querySelector('#tries SPAN');

function resetGame() {
    // => Remove Box & Repeat Music, Repeat Audio Button
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-end').style.display = 'none';
    document.getElementById('start-music').play();
    document.getElementById('stop').style.boxShadow = '3px 3px 1px #ddbcff';
    document.getElementById('start').style.boxShadow = '3px 3px 1px #ddbcff';
    
    // Remove Matched, Flipped Classes & Add Order Number
    shuffle(orderRange);
    blocks.forEach((blockMatchRemove, index) => {
        blockMatchRemove.classList.remove('matched');
        blockMatchRemove.classList.remove('flipped');
        
        blockMatchRemove.style.order = orderRange[index];
    });
    
    // Storage Time You Wrong
    localStorage.setItem(placeName.textContent, placeWrong.textContent);
    document.getElementById('wrong-storage-refresh').innerHTML =
        "<div>Your previous playing: <b style='color:#d103fc'>" + placeWrong.textContent + "</b> tries wrong</div>";
    placeWrong.textContent = "0";
            
    return counter(); // => Restart Game Counter
}
// This For Set Info From Local Storage In Document Page
if (localStorage.length) {
    for (let [key, value] of Object.entries(localStorage)) {
        placeStorage.innerHTML +=
            "<div><b style='color:#000'>last time:</b><br><b style='color:#6cc5f2'>" + key + "</b> tries wrong <b style='color:#6cc5f2'>" + value + "</b> times</div><hr>";
    }
}

restartGame.onclick = function () {resetGame();};

// :: THIRTEENTH STEP :: Next Level
function nextAllLevel() {
    var createDiv = document.createElement('DIV'),
        createIdAttribute = document.createAttribute('id'),
        createClassAttribute = document.createAttribute('class'),
        createFrontDiv = document.createElement('DIV'),
        createBackDiv = document.createElement('DIV'),
        createIdBackAttribute = document.createAttribute('id'),
        createIdFrontAttribute = document.createAttribute('id'),
        createClassBackAttribute = document.createAttribute('class'),
        createClassFrontAttribute = document.createAttribute('class'),
        createDataCard = document.createAttribute('data-card'),
        createImgBack = document.createElement('IMG'),
        appendContainsBlocks = document.getElementById('contains-game-blocks');
    
    createIdAttribute.value = "contains-game-block";
    createClassAttribute.value = "contains-game-block";
    createDiv.setAttributeNode(createIdAttribute);
    createDiv.setAttributeNode(createClassAttribute);
    createIdBackAttribute.value = "back";
    createIdFrontAttribute.value = "front";
    createClassBackAttribute.value = "face";
    createClassFrontAttribute.value = "face";
    createBackDiv.setAttributeNode(createIdBackAttribute);
    createBackDiv.setAttributeNode(createClassBackAttribute);
    createFrontDiv.setAttributeNode(createIdFrontAttribute);
    createFrontDiv.setAttributeNode(createClassFrontAttribute);
    createDiv.appendChild(createFrontDiv);
    createDiv.appendChild(createBackDiv);
    createBackDiv.appendChild(createImgBack);
    createDiv.setAttributeNode(createDataCard);
    appendContainsBlocks.appendChild(createDiv);
}

// => 'Level Two'
function nextLevel() {
    // 'for' inside 'for' to double repeat the function
    for (i = 1; i <= 4; i++) {for (n = 1; n <= 2; n++) {nextAllLevel();}}
    resetGame();
    
    // This is for set a imgs and "data_card" to new Cards
    blocks = Array.from(blocksContains.children);
    for (i = 1; i <= 8; i++) {
        var createFruitsArray = ["watermellon", "watermellon", "avocado", "avocado", "papaya", "papaya", "kiwi", "kiwi"],
            blocksCardImgs = Array.from(blocks.slice(16, 24)),
            blocksBackImgs = blocksCardImgs[i - 1].lastElementChild.firstElementChild;
        blocksCardImgs[i - 1].setAttribute('data-card', createFruitsArray[i - 1]);
        blocksBackImgs.src = "img/" + createFruitsArray[i - 1] + ".jpg";
    }
    
    // This is for style new cards and buttons music
    var frontCards = document.querySelectorAll('#front'),
        blockCards = document.querySelectorAll('#contains-game-block');
    for (j = 0; j <= frontCards.length - 1; j++) {
        frontCards[j].style.fontSize = '180px';
        frontCards[j].style.lineHeight = '180px';
        blockCards[j].style.height = '200px';
        blockCards[j].style.flex = '0 0 200px';
    } document.querySelector('#contains-game-blocks').style.margin = '10px 35px 0';
    
    // This is for shuffle and flip new cards
    orderRange = Array.from(new Array(blocks.length).keys());
    shuffle(orderRange);
    var blocksPlus = blocks.slice(16, 24);
    blocksPlus.forEach((block, index) => {
        block.style.order = orderRange[index];
        block.addEventListener('click', function () {
            flipBlock(block);
        });
    });
    
    // This is for repeat comparing all new cards
    blocks.forEach((blockMatched, index) => {
        blockMatched.addEventListener('click', function () {
            var allMatchedBlocks = blocks.filter(matchedBlock => matchedBlock.classList.contains('matched'));
            if (allMatchedBlocks.length === 24) {
                matchedBlocks(blockMatched);
                document.getElementById('btn-next').style.display = 'none';
                document.getElementById('btn-next-1').style.display = 'inline-block';
            }
        });
    });
}
document.getElementById('btn-next').onclick = function () {
    nextLevel();
    // This is for Level Rise 
    var levelTitle = document.querySelector('#level-title H1 SPAN');
    levelTitle.innerHTML = parseInt(levelTitle.innerHTML) + 1;
};

// => 'Level Three'
function nextLevelLast() {
    // => 'for' inside 'for' to double repeat the function
    for (i = 1; i <= 3; i++) {for (n = 1; n <= 2; n++) {nextAllLevel();}}
    resetGame();
    
    // This is for set a imgs and "data_card" to new Cards
    blocks = Array.from(blocksContains.children);
    for (i = 1; i <= 6; i++) {
        var createFruitsArray = ["apricot", "apricot", "fig", "fig", "strawberry", "strawberry"],
            blocksCardImgs = Array.from(blocks.slice(24)),
            blocksBackImgs = blocksCardImgs[i - 1].lastElementChild.firstElementChild;
        blocksCardImgs[i - 1].setAttribute('data-card', createFruitsArray[i - 1]);
        blocksBackImgs.src = "img/" + createFruitsArray[i - 1] + ".jpg";
    }
    
    // This is for style new cards and buttons music
    var frontCards = document.querySelectorAll('#front'),
        blockCards = document.querySelectorAll('#contains-game-block');
    for (j = 0; j <= frontCards.length - 1; j++) {
        frontCards[j].style.fontSize = '140px';
        frontCards[j].style.lineHeight = '150px';
        blockCards[j].style.height = '168px';
        blockCards[j].style.flex = '1 0 165px';
    }
    document.querySelector('#contains-game-blocks').style.margin = '10px 0 0';
    
    // This is for Level Rise 
    var levelTitle = document.querySelector('#level-title H1 SPAN');
    levelTitle.innerHTML = parseInt(levelTitle.innerHTML) + 1;
    
    // This is for shuffle and flip new cards
    orderRange = Array.from(new Array(blocks.length).keys());
    shuffle(orderRange);
    var blocksPlus = blocks.slice(24);
    blocksPlus.forEach((block, index) => {
        block.style.order = orderRange[index];
        block.addEventListener('click', function () {
            flipBlock(block);
        });
    });
    
    // This is for repeat comparing all new cards and start a new music
    blocks.forEach((blockMatched, index) => {
        blockMatched.addEventListener('click', function () {
            var allMatchedBlocks = blocks.filter(matchedBlock => matchedBlock.classList.contains('matched'));
            if (allMatchedBlocks.length === 30) {
                document.getElementById('game-end').style.display = 'block';
                document.getElementById('game-over').style.display = 'none';
                document.getElementById('start-music').pause();
                document.getElementById('start-music').currentTime = 0;
                if (blocks.length > 24) {document.getElementById('game-complete').play()}
                if (btnSwitchDynamic.checked === true) {
                    document.getElementById('game-end').style.display = 'none';
                    document.getElementById('game-dynamic-over').style.display = 'block';
                }
            }
        });
    });
    document.getElementById('btn-restart-end').onclick = resetGame;
}
document.getElementById('btn-next-1').onclick = function () {nextLevelLast();}

// :: FOURTEENTH STEP :: Restart All Level
var restartAllGame = document.getElementById('btn-restart-all-end');
restartAllGame.onclick = function () {
    resetGame(); // This is for reset classes and info
    document.querySelector('#level-title H1 SPAN').innerHTML = "1";
    
    // This is for remove cards
    for (a = 16; a <= blocks.length - 1; a++) {blocks[a].remove();}
    
    // This is for reset normal size to the cards
    var frontCards = document.querySelectorAll('#front'),
        blockCards = document.querySelectorAll('#contains-game-block');
    for (j = 0; j <= frontCards.length - 1; j++) {
        frontCards[j].style.fontSize = '195px';
        frontCards[j].style.lineHeight = '180px';
        blockCards[j].style.height = '219px';
        blockCards[j].style.flex = '200px';
    }
    
    // This is for display box=end & box=over
    blocks = Array.from(blocksContains.children);
    blocks.forEach((blockMatched, index) => {
        blockMatched.addEventListener('click', function () {
            var allMatchedBlocks = blocks.filter(matchedBlock => matchedBlock.classList.contains('matched'));
            if (allMatchedBlocks.length === blocks.length) {
                document.getElementById('game-end').style.display = 'none';
                document.getElementById('game-over').style.display = 'block';
                document.getElementById('btn-next').style.display = 'inline-block';
                document.getElementById('btn-next-1').style.display = 'none';
                if (btnSwitchDynamic.checked === true) {
                    document.getElementById('game-over').style.display = 'none';
                }
            }
        });
    });
};

// :: FIFTEEN STEP :: Switch Dynamic/Auto Play
var btnSwitchDynamic = document.querySelector('#dynamic-game INPUT'),
    boxDynamic = document.querySelector('.dynamicplaying'),
    startPlayDynamic = document.getElementById('play-dynamic'),
    selectNumber = document.getElementById('fruit-number'),
    btnDynamicRestart = document.getElementById('btn-dynamic-restart'),
    btnDynamicReset = document.getElementById('btn-dynamic-reset'),
    boxResetAuto = document.getElementById('reset-auto-palying'),
    btnResetAuto = document.getElementById('btn-reset-auto');

// => 'Switch Dynamic Play'
function dynamicGame() {
    // => Box Choosing How Many Cards You Want
    setTimeout(() => {boxDynamic.style.display = "block";},400);
    document.getElementById('start-music').pause();
    document.getElementById('start-music').currentTime = 0;
    
    // => After Choosing How many Cards
    startPlayDynamic.onclick = function () {
        resetGame();
        boxDynamic.style.display = "none";
        document.querySelector('#level-title H1').textContent = "Dynamic Playing";
        //  Block Length == 16
        if (blocks.length === 16) {
            if (selectNumber.children[selectNumber.options.selectedIndex].value === "24") {
                nextLevel();
            } // => 16 // 24
            if (selectNumber.children[selectNumber.options.selectedIndex].value === "30") {
                for (i = 1; i <= 7; i++) {for (n = 1; n <= 2; n++) {nextAllLevel();}}
                resetGame();
                blocks = Array.from(blocksContains.children);
                for (i = 1; i <= 14; i++) {
                    var createFruitsArray = ["watermellon", "watermellon", "avocado", "avocado", "papaya", "papaya", "kiwi", "kiwi", "apricot", "apricot", "fig", "fig", "strawberry", "strawberry"],
                        blocksCardImgs = Array.from(blocks.slice(16, 30)),
                        blocksBackImgs = blocksCardImgs[i - 1].lastElementChild.firstElementChild;
                    blocksCardImgs[i - 1].setAttribute('data-card', createFruitsArray[i - 1]);
                    blocksBackImgs.src = "img/" + createFruitsArray[i - 1] + ".jpg";
                }
                var frontCards = document.querySelectorAll('#front'),
                    blockCards = document.querySelectorAll('#contains-game-block');
                for (j = 0; j <= frontCards.length - 1; j++) {
                    frontCards[j].style.fontSize = '140px';
                    frontCards[j].style.lineHeight = '150px';
                    blockCards[j].style.height = '168px';
                    blockCards[j].style.flex = '1 0 165px';
                }
                document.querySelector('#contains-game-blocks').style.margin = '10px 0 0';
                orderRange = Array.from(new Array(blocks.length).keys());
                shuffle(orderRange);
                var blocksPlus = blocks.slice(16, 30);
                blocksPlus.forEach((block, index) => {
                    block.style.order = orderRange[index];
                    block.addEventListener('click', function () {
                        flipBlock(block);
                    });
                });
                blocks.forEach((blockMatched, index) => {
                    blockMatched.addEventListener('click', function () {
                        var allMatchedBlocks = blocks.filter(matchedBlock => matchedBlock.classList.contains('matched'));
                        if (allMatchedBlocks.length === 30) {
                            document.getElementById('game-end').style.display = 'block';
                            document.getElementById('game-over').style.display = 'none';
                            document.getElementById('start-music').pause();
                            document.getElementById('start-music').currentTime = 0;
                            if (blocks.length > 24) {document.getElementById('game-complete').play()}
                            if (btnSwitchDynamic.checked === true) {
                                document.getElementById('game-end').style.display = 'none';
                                document.getElementById('game-dynamic-over').style.display = 'block';
                            }
                        }
                    });
                });
            } // => 16 // 30
        }
        // Block Length == 24
        if (blocks.length === 24) {
            if (selectNumber.children[selectNumber.options.selectedIndex].value === "16") {
                if (blocks.length === 24) {
                    for (a = 16; a <= blocks.length - 1; a++) {blocks[a].remove();}
                    blocks = Array.from(blocksContains.children);
                    var frontCards = document.querySelectorAll('#front'),
                        blockCards = document.querySelectorAll('#contains-game-block');
                    for (j = 0; j <= frontCards.length - 1; j++) {
                        frontCards[j].style.fontSize = '180px';
                        frontCards[j].style.lineHeight = '195px';
                        blockCards[j].style.height = '219px';
                        blockCards[j].style.flex = '1 0 200px';
                    } document.querySelector('#contains-game-blocks').style.margin = '10px 0 0';
                    resetGame();
                }
            } // => 24 // 16
            if (selectNumber.children[selectNumber.options.selectedIndex].value === "30") {
                for (i = 1; i <= 3; i++) {for (n = 1; n <= 2; n++) {nextAllLevel();}}
                resetGame();
                blocks = Array.from(blocksContains.children);
                for (i = 1; i <= 6; i++) {
                    var createFruitsArray = ["apricot", "apricot", "fig", "fig", "strawberry", "strawberry"],
                        blocksCardImgs = Array.from(blocks.slice(24)),
                        blocksBackImgs = blocksCardImgs[i - 1].lastElementChild.firstElementChild;
                    blocksCardImgs[i - 1].setAttribute('data-card', createFruitsArray[i - 1]);
                    blocksBackImgs.src = "img/" + createFruitsArray[i - 1] + ".jpg";
                }
                var frontCards = document.querySelectorAll('#front'),
                    blockCards = document.querySelectorAll('#contains-game-block');
                for (j = 0; j <= frontCards.length - 1; j++) {
                    frontCards[j].style.fontSize = '140px';
                    frontCards[j].style.lineHeight = '150px';
                    blockCards[j].style.height = '168px';
                    blockCards[j].style.flex = '1 0 165px';
                }
                document.querySelector('#contains-game-blocks').style.margin = '10px 0 0';
                orderRange = Array.from(new Array(blocks.length).keys());
                shuffle(orderRange);
                var blocksPlus = blocks.slice(24);
                blocksPlus.forEach((block, index) => {
                    block.style.order = orderRange[index];
                    block.addEventListener('click', function () {
                        flipBlock(block);
                    });
                });
                blocks.forEach((blockMatched, index) => {
                    blockMatched.addEventListener('click', function () {
                        var allMatchedBlocks = blocks.filter(matchedBlock => matchedBlock.classList.contains('matched'));
                        if (allMatchedBlocks.length === 30) {
                            document.getElementById('game-end').style.display = 'block';
                            document.getElementById('game-over').style.display = 'none';
                            document.getElementById('start-music').pause();
                            document.getElementById('start-music').currentTime = 0;
                            if (blocks.length > 24) {document.getElementById('game-complete').play()}
                            if (btnSwitchDynamic.checked === true) {
                                document.getElementById('game-end').style.display = 'none';
                                document.getElementById('game-dynamic-over').style.display = 'block';
                            }
                        }
                    });
                });
            } // => 24 // 30
        }
        // Block Length == 30
        if (blocks.length === 30) {
            if (selectNumber.children[selectNumber.options.selectedIndex].value === "16") {
                if (blocks.length === 30) {
                    for (a = 16; a <= blocks.length - 1; a++) {blocks[a].remove();}
                    blocks = Array.from(blocksContains.children);
                    var frontCards = document.querySelectorAll('#front'),
                        blockCards = document.querySelectorAll('#contains-game-block');
                    for (j = 0; j <= frontCards.length - 1; j++) {
                        frontCards[j].style.fontSize = '180px';
                        frontCards[j].style.lineHeight = '195px';
                        blockCards[j].style.height = '219px';
                        blockCards[j].style.flex = '1 0 200px';
                    } document.querySelector('#contains-game-blocks').style.margin = '10px 0 0';
                    resetGame();
                }
            } // => 30 // 16
            if (selectNumber.children[selectNumber.options.selectedIndex].value === "24") {
                if (blocks.length === 30) {
                    for (a = 24; a <= blocks.length - 1; a++) {blocks[a].remove();}
                    blocks = Array.from(blocksContains.children);
                    var frontCards = document.querySelectorAll('#front'),
                        blockCards = document.querySelectorAll('#contains-game-block');
                    for (j = 0; j <= frontCards.length - 1; j++) {
                        frontCards[j].style.fontSize = '180px';
                        frontCards[j].style.lineHeight = '180px';
                        blockCards[j].style.height = '200px';
                        blockCards[j].style.flex = '0 0 200px';
                    } document.querySelector('#contains-game-blocks').style.margin = '10px 35px 0';
                    resetGame();
                }
            }
        }
        
        // => Rsetart Same Many Cards
        btnDynamicRestart.onclick = function () {
            resetGame();
            document.getElementById('game-dynamic-over').style.display = 'none';
        };
        // => Choosing New Number of The Cards
        btnDynamicReset.onclick = function () {
            document.getElementById('game-dynamic-over').style.display = 'none';
            boxDynamic.style.display = "block";
        };
    };
};

// => 'Switch Auto Play'
function resetAutoGame() {
    setTimeout(() => {boxResetAuto.style.display = 'block';}, 400);
    document.getElementById('start-music').pause();
    document.getElementById('start-music').currentTime = 0;
    btnResetAuto.onclick = function () {
        resetGame();
        boxResetAuto.style.display = 'none';
        document.querySelector('#level-title H1').innerHTML = "Level <span>1</span>";
        blocks = Array.from(blocksContains.children);
        if (blocks.length === 24 || blocks.length === 30) {
            for (a = 16; a <= blocks.length - 1; a++) {blocks[a].remove();}
            blocks = Array.from(blocksContains.children);
            document.getElementById('btn-next').style.display = "inline-block";
            document.getElementById('btn-next-1').style.display = "none";
            var frontCards = document.querySelectorAll('#front'),
                blockCards = document.querySelectorAll('#contains-game-block');
            for (j = 0; j <= frontCards.length - 1; j++) {
                frontCards[j].style.fontSize = '180px';
                frontCards[j].style.lineHeight = '195px';
                blockCards[j].style.height = '219px';
                blockCards[j].style.flex = '1 0 200px';
            } document.querySelector('#contains-game-blocks').style.margin = '10px 0 0';
        }
    };
}

// => This is for do function of switch Dynamic/Auto play
btnSwitchDynamic.onclick = function () {
    if (btnSwitchDynamic.checked === true) {
        dynamicGame();
    } else resetAutoGame();
}
