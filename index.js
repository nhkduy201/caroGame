var h1 = document.getElementById('gametitle');
var playArea = document.getElementById('play-area');
var isXClick = true;
var signArray = new Array(9).fill(0).map(x => Array(9).fill(0));
for(var i = 0; i < 7; i++){
    var col = document.createElement('div');
    for (var j = 0; j < 7; j++) {
        var elm = document.createElement('div');
        elm.className = 'sqrElm';
        elm.setAttribute('whatclick', 'noClick');
        elm.setAttribute('order', (i + 1).toString() + (j + 1).toString());
        col.appendChild(elm);
    }
    playArea.appendChild(col);
}
function endGameFill(){
    for (var i = 0; i < 49; i++){
        elmArray[i].setAttribute('whatclick', 'clicked');
    }
}
function checkElm(u, v){
    var count;
    if(signArray[u][v] !== 0){
        for(var i = -1; i < 2; i++){
            for(var j = -1; j < 2; j++){
                count = 0;
                for(var k = 1; k < 5; k++){
                    if (i !== 0 || j !== 0) {
                        if(u + k*i < 0 || v + k*j < 0 ||signArray[u][v] !== signArray[u + k*i][v + k*j]){
                            break;
                        }else{
                            count++;
                        }
                    }
                }
                if (count === 4) {
                    return true;
                }
            }
        }
    }else{
        return false;
    }
    return false;
}
function checkArray(array){
    for(var i = 1; i < 7; i++){
        for(var j = 1; j < 7; j++){
            if(checkElm(i, j)){
                return true;
            }
        }
    }
    return false;
}
var elmArray = document.getElementsByClassName('sqrElm');
for (var i = 0; i < 49; i++) {
    elmArray[i].addEventListener('click', function(){
        if(this.getAttribute('whatclick') === 'noClick' && this.getAttribute('whatclick') !== 'clicked'){
            if(isXClick){
                this.style.backgroundImage = 'url(./caro.png)';
                this.style.backgroundPosition = '-170px -170px';
                this.style.backgroundSize = '525%';
                this.setAttribute('whatclick', 'x');
                signArray[Math.floor(Number(this.getAttribute('order'))/10)][Math.floor(Number(this.getAttribute('order'))%10)] = 'x';
                isXClick = false;
                if (checkArray(signArray)) {
                    h1.innerHTML = 'Congrats X player!';
                    endGameFill();
                }
            }else{
                this.style.backgroundImage = 'url(./caro.png)';
                this.style.backgroundPosition = '-170px -260px';
                this.style.backgroundSize = '525%';
                this.setAttribute('whatclick', 'o');
                signArray[Math.floor(Number(this.getAttribute('order'))/10)][Math.floor(Number(this.getAttribute('order'))%10)] = 'o';
                isXClick = true;
                if (checkArray(signArray)) {
                    h1.innerHTML = 'Congrats O player!';
                    endGameFill();
                }
            }
        }
    })
}