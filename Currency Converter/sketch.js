let input, originalcurrencybox, targetcurrencybox, button;

let convertfrom = 'USD';
let convertto = 'AED'; 

let amount; 
let result;

function setup()
{
    createCanvas(windowWidth,windowHeight);
    background(255,186,170);
    input = createInput();
    input.position(windowWidth/2 - 100, windowHeight/2 ); 

    originalcurrencybox= createInput();
    originalcurrencybox.position(windowWidth/3 -100, windowHeight/3);

    targetcurrencybox= createInput();
    targetcurrencybox.position(windowWidth*2/3 -50 , windowHeight/3);

    //button

    button = createButton('Convert !'); 
    button.position(input.x + 50, input.y + 50); 

    button.mousePressed( function () {
        convertfrom= originalcurrencybox.value();
        convertto= targetcurrencybox.value(); 
        amount = input.value();

        url = 'http://data.fixer.io/api/latest?access_key=da502125f2b88ea45a0a33ee7f851c01'+'&from='+ convertfrom + '&to=' + convertto + '&amount=' + amount;
        result = httpGet(url, 'json', false, function(conversion){
            result = amount * conversion.rates[convertto]/conversion.rates[convertfrom];
        } );
   
    } ); 

}


function draw(){

    background(255,186,170);

    textSize(30);
    text(result, windowWidth/3, windowHeight/3 + 100);


}