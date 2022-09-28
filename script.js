let field = document.createElement('div');// sozdaiom div
document.body.appendChild(field);//dobov evo v html
field.classList.add('field');//dobov atomu clasu stili iz css

//razabiom sozdanii cvadratik na eceiki(100 blokov)

for (let i = 1; i < 101; i++) {
    let excel = document.createElement('div');//  sozdaiom novii div
    field.appendChild(excel);//dobov atoto div k cvadratiku
    excel.classList.add('excel');//dob stili iz css
}
//na dannom etape v console vidni 100 sozdanih blokov

//stob zmeika dvigalasi prisvoim caardinati vsem eceikam
//pervaia verh levo imeet coord 1 i 10 (1 posX, 10 posY)

let excel = document.getElementsByClassName('excel')//nahodim vse eceiki
//coord 1 eceiki
let x = 1;
let y = 10;


//cerez ticl daem cajdoi cletocike coord
for (let i = 0; i < excel.length; i++) {

    //cogda dohodit do posled (10 eceike v pervom redu ) y-- =>spusc na riad nije, i tac po ticlu vse redi
    if (x > 10) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;

}

//sozdaiom zmeiu catoraia bd poevl pri obnovlenii str v raznih mestah

//functia budet vidavati 2 random cisla v masive ot 1 do 10 1znacenie=posX ,2 znacenie=posY
function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);//3 patamusto zmeika imeet telo 2 eceiki i golova 1 i cogda generir random mojet biti odin ili 2 masiv null, a 2 s coord i poevleaeta osibka
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX="' + coordinates[0] + '"][posY="' + coordinates[1] + '"]'),
document.querySelector('[posX="' + (coordinates[0] - 1) + '"][posY="' + coordinates[1] + '"]'),
document.querySelector('[posX="' + (coordinates[0] - 2) + '"][posY="' + coordinates[1] + '"]')]//nahodim na stranite eceicu gde posX= randomnoe znacenie ot math random i posY =random tac je.....dlia 3eceek pisem -1,-2 s nu s suprapuna

//vsem elem masiva dob clas snakebody a 1 elem class head
for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');// pervii elem dob class head

//na dannii moment afisirueta snaciala 2 elem tela zatem golova

//sozdaiom mishku
let mouse;
function createMouse() {
    function generateMouse() {
        let posX = Math.round(Math.random() * (10 - 3) + 3);//tot je protes cac i v generateSnake()
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }
    let mouseCoordinates = generateMouse();
    //rezulitat functii ato coordinati
    mouse = document.querySelector('[posX="' + mouseCoordinates[0] + '"][posY="' + mouseCoordinates[1] + '"]');

    // sto bi pri randome ne popalasi miska na zmeie pisem cod:(poca mis lejit na coord zmei mi esio raz vizivaem func generateMouse, i esio raz isem na plosiadke eceicu s coord)
    while (mouse.classList.contains('snakeBody')) {
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX="' + mouseCoordinates[0] + '"][posY="' + mouseCoordinates[1] + '"]');
    }


    mouse.classList.add('mouse');//dob slili
}
createMouse();




let direction = 'right';//peremennaia dlia function move stob zmeia dvigalasi v raznie napravlenia


//na dannii monent ofesitueta miska i zmeia

//naucim zmeiu dvigata v pravo

function move() {

    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];

    snakeBody[0].classList.remove('head');//udaliaem golovu
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');//udaliaem class snakeBody dlia posledneva elem => dlia hvosta zmeiki
    snakeBody.pop();//udaliaem poslednii elem masiva

    //pohod v prava
    if (direction = 'ArrowRight') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX="' + (+snakeCoordinates[0] + 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
        } //s metodom unshift na pervoe mesto masiva 2 elem primer: golova imeet coord x+1,y bila golova na coord 2,2 stanet na 3,2


        //esli snakeCoordinates[0]=> znacenie po osi X <10  to mi idiom na adnu iceicu v prava
        //else no esli=10 to nam nado vernuta nazat s protivapalojnovo craia posX=1

        else {
            snakeBody.unshift(document.querySelector('[posX="1"][posY="' + snakeCoordinates[1] + '"]'));
        }
    }

    //pohod v levo 
    else if (direction = 'ArrowLeft') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX="' + (+snakeCoordinates[0] - 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
        }

        else {
            snakeBody.unshift(document.querySelector('[posX="10"][posY="' + snakeCoordinates[1] + '"]'));
        }
    }

    //
    else if (direction = 'ArrowUp') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX="' + snakeCoordinates[0] + '"][posY="' + (+snakeCoordinates[1]+1) + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[posX="+snakeCoordinates[0]"][posY=" 1"]'));
        }
    }

    //
    else if (direction = 'ArrowDown') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX="' + snakeCoordinates[0] + '"][posY="' + (+snakeCoordinates[1] -1) + '"]'));
        }
        else {
            snakeBody.unshift(document.querySelector('[posX="+snakeCoordinates[0]"][posY="10"]'));
        }
    }







    snakeBody[0].classList.add('head');//dobav class head
    // a vsem elem masiva mi verniom class snakeBody
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
}
let interval = setInterval(move, 300); //stob zarabotala functia povtoriaem function move()=> cajdie 300ms


//seiceas zmeika dvigaeta do conta reada i golova propadaet i ona ostanavlivaeta

//sozdali peremennuiu direction 86 read


//obrabotcik sobitii(po najatiu na strelki meniaem napravlenie)
window.addEventListener('keydown', function (e) {
    if (e.key == "ArrowLeft" && direction != 'ArrowRight') {//escli cliuci=ArrowLeft ili !prava => vipolneaet v levo......ostalinie tak je
        direction = 'ArrowLeft';
    }
    else if (e.key == "ArrowUp" && direction != 'ArrowDown') {
        direction = 'ArrowUp';
    }
    else if (e.key == "ArrowRight" && direction != 'ArrowLeft') {
        direction = 'ArrowRight';
    }
    else if (e.key == "ArrowDown" && direction != 'ArrowUp') {
        direction = 'ArrowDown';
    }
});

