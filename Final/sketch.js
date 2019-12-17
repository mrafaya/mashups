/* 
Author: Rafay 
For Mashups Fall 2019
*/
var url = "http://api.worldweatheronline.com/premium/v1/astronomy.ashx?q=new%20york&date=today&format=json&key=4f1d000a96a84e70acf122107193011";  // api URL for new york 
var url2 = "http://api.worldweatheronline.com/premium/v1/weather.ashx?q=new%20york&num_of_days=1&date=today&format=json&key=4f1d000a96a84e70acf122107193011"


var results, results2, currentphase,fraction;  // variable declarations
var loaded = false; 
var req;
var stars = [];  // an array that will contain all stars 
var city="New York"; // initial city value before any info is entered. 
var moonrise,moonset;  // moonrise, moonset variables
var userinput, button;
var data; 
var req;
var skyX = 550;  // moon dimensions
var skyY = 550;
var moonDia; 
var temperature,humidity,rainchance,visibility;
var errorchk=0;  //error handling 

function preload(){  // preload function that will load APIs and
    lowerdata=loadFont('assets/montserrat/Montserrat-Bold.otf');
    uppertitle=loadFont('assets/montserrat/Montserrat-Black.otf');
     //use httpGet to query API
     results = httpGet(url, 'jsonp', false, function(info){ //loading new york
          currentphase= info.data.time_zone[0].moon_phase; // pulling current phase
          console.log(currentphase);
          //currentphase="Waning Crescent";
          fraction=info.data.time_zone[0].moon_illumination;  // pulling fraction
          moonrise=info.data.time_zone[0].moonrise;  //pulling moonrise time
          moonset=info.data.time_zone[0].moonset;   //pulling moonset time 
     });
     results2= httpGet(url2, 'jsonp', false, function(info){
          temperature=info.data.current_condition[0].temp_C;  //loading new york weather information initially. changes dynamically later. see following code. 
          console.log(temperature); 
          humidity=info.data.current_condition[0].humidity;
          console.log(humidity);
          rainchance=info.data.weather[0].hourly[0].chanceofrain;
          console.log(rainchance);
          visibility=info.data.current_condition[0].visibility;
          console.log(visibility);

     });


     }

function setup()
{
 createCanvas(windowWidth, windowHeight);
 frameRate(1);  // set for the twinkle effect
 //moodDia=windowWidth/3.33;
 for (var i = 0; i < 50; i++) {
    stars.push(new Star());
}
userinput = createInput();
userinput.position(windowWidth/2-70, windowHeight/2+windowHeight/10);

button = createButton('Press to get info');  //creates button
button.position(windowWidth/2-40, userinput.y + 25); //setting button location

button.mousePressed( function() {
    city=userinput.value();

    url = "http://api.worldweatheronline.com/premium/v1/astronomy.ashx?q=" + city + "&date=today&format=json&key=4f1d000a96a84e70acf122107193011";
    console.log(url);
    url2 = "http://api.worldweatheronline.com/premium/v1/weather.ashx?q=" + city + "&num_of_days=1&date=today&format=json&key=4f1d000a96a84e70acf122107193011";
    console.log(url);
        lowerdata=loadFont('assets/montserrat/Montserrat-Bold.otf');
        uppertitle=loadFont('assets/montserrat/Montserrat-Black.otf');
         //use httpGet to query API
            results = httpGet(url, 'jsonp', false, function(info){ //loading data into info variable
              try{ //using try for error handling 
              currentphase= info.data.time_zone[0].moon_phase; // pulling current phase
              console.log(currentphase);
              //currentphase="Waning Crescent";
              fraction=info.data.time_zone[0].moon_illumination;  // pulling fraction
              moonrise=info.data.time_zone[0].moonrise;  //pulling moonrise time
              moonset=info.data.time_zone[0].moonset;   //pulling moonset time 
              errorchk=0;
              }
              catch(error) //incase error in executing due to an incorrect city name, this will be executed. 
                {
                  errorchk=1;
                }
            });

            results2= httpGet(url2, 'jsonp', false, function(info){  //loading date into info variable
                temperature=info.data.current_condition[0].temp_C;  //loading temperature from API 
                console.log(temperature);    
                humidity=info.data.current_condition[0].humidity;  //loading humidity 
                console.log(humidity);
                rainchance=info.data.weather[0].hourly[0].chanceofrain;  //loading chance of rain 
                console.log(rainchance);
                visibility=info.data.current_condition[0].visibility;   //loading visibility
                console.log(visibility);
      
           });
            

});

textFont(lowerdata);
textSize(16);
textAlign(CENTER, CENTER);
}

function draw(){
    background(254);
    moonDia=windowWidth/4;
    var color1 = color(0, 0, 153);
    var color2 = color(204, 51, 0);
    setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");  // to create the gradient background
    for (var i = 0; i < 50; i++) {  // to make stars twinkle
        stars[i].draw();
    }
	ellipseMode(CENTER); 
    console.log(url);

	if (errorchk==1){ //error handling incase the city entered is inaccurate. 
        fill(10);
        text('City does not exist ', windowWidth/2,windowHeight/2);  
       }
        else {
	fill(255, 247, 220); // moon color
	ellipse(skyX / 2, skyY / 2, moonDia, moonDia);
	
    fill(10);


   textSize(20);
   textAlign(LEFT,LEFT);
   textFont(lowerdata);  // font selection
    if(currentphase=="New Moon"){//NEW MOON
		arc(skyX/2, skyY/2,moonDia, moonDia,HALF_PI,HALF_PI+PI);
        arc(skyX/2, skyY/2,moonDia, moonDia, HALF_PI+PI,HALF_PI);  // create black arc on moon to replicate the phase shape
        fill(177,13,201);
        text('New Moon: ',windowWidth-450,130)
        fill(61,153,112);
        text('At new moon, the Sun and the Moon are quite close to each other in the sky. (In fact, the Moon in its new phase will sometimes block all or part of out view of the Sun. This event is called a solar eclipse. The side toward us is in shadow and is dark. Moreover, since the Moon and Sun are so near each other on the sky, they are above the horizon at the same time.', windowWidth-450,160, 400,500);
        fill(10);
	}
	if(currentphase=="Waning Crescent"){
		arc(skyX/2, skyY/2,moonDia*2/4, moonDia,HALF_PI,HALF_PI+PI);
        arc(skyX/2, skyY/2,moonDia, moonDia, HALF_PI+PI,HALF_PI); // create black arc on moon to replicate the phase shape
        fill(177,13,201);
        text('Waning Crescent: ',windowWidth-450,130)
        fill(61,153,112);
        text('As time passes after new moon, the Moon (orbiting counterclockwise around the Earth) moves away from the Sun toward the east from our vantage point, traveling about 12 degrees per day toward the left, as seen from Earths northern hemisphere. Two or three days after new moon, a waxing crescent can be seen just to the east (left) of the Sun. It is most easily seen just after sunset.', windowWidth-450,160, 400,500);
        fill(10);
	}
	if(currentphase=="First Quarter"){//First Quarter
        arc(skyX/2, skyY/2,moonDia, moonDia, HALF_PI+PI,HALF_PI); // create black arc on moon to replicate the phase shape
        fill(177,13,201);
        text('First Quarter: ',windowWidth-450,130)
        fill(61,153,112);
        text('About a week after new moon, the Moon has moved about 90 degrees away from the Sun, a quarter of the way around the sky toward the east (left). At this time, its right-hand half is illuminated by sunlight. This phase is called first quarter because it occurs when the Moon has completed the first quarter of its orbit from the previous new moon phase.', windowWidth-450,160, 400,500);
        fill(10);
	}
	
	
	if(currentphase=="Waning Gibbous"){
		arc(skyX/2, skyY/2,moonDia, moonDia,HALF_PI+PI,HALF_PI);
		fill(255, 247, 220);
        arc(skyX/2, skyY/2,moonDia*2/4, moonDia, HALF_PI+PI,HALF_PI);  // create black arc on moon to replicate the phase shape
        fill(177,13,201);
        text('Waning Gibbous: ',windowWidth-450,130);
        fill(61,153,112);
        text('During the following week, the Moon continues to further distance itself from the Sun toward the East by about 12 degrees per day. As it does so, it waxes "fatter" as more and more of the side facing us is illuminated by sunshine. This phase is called waxing gibbous.', windowWidth-450,160, 400,500);
        fill(10);
	}
    
	// if currentphase=8=fullmoon, do nothing because the moon will be fully illuminated
	
	if(currentphase=="Waxing Gibbous"){
		arc(skyX/2, skyY/2,moonDia, moonDia,HALF_PI,HALF_PI+PI);  // create black arc on moon to replicate the phase shape
		fill(255, 247, 220);
        arc(skyX/2, skyY/2,moonDia*2/4, moonDia, HALF_PI,HALF_PI+PI);	 // create black arc on moon to replicate the phase shape
        fill(177,13,201);
        text('Waxing Gibbous: ',windowWidth-450,130);
        fill(61,153,112);
        text('As time passes after new moon, the Moon (orbiting counterclockwise around the Earth) moves away from the Sun toward the east from our vantage point, traveling about 12 degrees per day toward the left, as seen from Earths northern hemisphere. Two or three days after new moon, a waxing crescent can be seen just to the east (left) of the Sun.', windowWidth-450,160, 400,500);
        fill(10);
	}
	
if(currentphase=="Last Quarter"){//Last Quarter
        arc(skyX/2, skyY/2,moonDia, moonDia,HALF_PI,HALF_PI+PI); // create black arc on moon to replicate the phase shape
        fill(177,13,201);
        text('Last Quarter: ',windowWidth-450,130)
        fill(61,153,112);
        text('As last quarter phase — when the Moon enters the last quarter of its orbit back to new moon — the eastern (left) half of its disk is illuminated. Now, the Moon has moved to 90 degrees west of the Sun, and precedes it by about 6 hours in their daily race across the sky: first quarter moon rises at about midnight, is highest in the sky at sunrise, and sets at about noon.', windowWidth-450,160, 400,500);
        fill(10);
    }
    
	if(currentphase=="Waxing Crescent"){
		arc(skyX/2, skyY/2,moonDia*2/4, moonDia,HALF_PI+PI,HALF_PI); // create black arc on moon to replicate the phase shape
        arc(skyX/2, skyY/2,moonDia, moonDia, HALF_PI,HALF_PI+PI); // create black arc on moon to replicate the phase shape
        fill(177,13,201);
        text('Waxing Crescent: ',windowWidth-450,130)
        fill(61,153,112);
        text('As time passes after new moon, the Moon (orbiting counterclockwise around the Earth) moves away from the Sun toward the east from our vantage point, traveling about 12 degrees per day toward the left, as seen from Earths northern hemisphere. Two or three days after new moon, a waxing crescent can be seen just to the east (left) of the Sun. It is most easily seen just after sunset.', windowWidth-450,160, 400,500);
        fill(10);
    }

    if(currentphase=="Full Moon"){ // no black printed because it's a full moon. 
          fill(177,13,201);
          text('New Moon: ',windowWidth-450,130)
          fill(61,153,112);
          text('The full moon is the lunar phase when the Moon appears fully illuminated from Earths perspective. This occurs when Earth is located between the Sun and the Moon more exactly, when the ecliptic longitudes of the Sun and Moon differ by 180°', windowWidth-450,160, 400,500);
          fill(10);
      }

    
   textSize(20);
   textAlign(LEFT,LEFT);
   textFont(lowerdata);  // select font and print
  
   text('The current phase in ' + city + ' is '  + currentphase,windowWidth/14,skyY/2+moonDia/2+60);   // using dynamic variables for resizing purposes
   text('The moon illumination in ' + city + ' is ' + fraction +'%', windowWidth/14,skyY/2+moonDia/2+110);
   text('The moonrise time is ' + moonrise, windowWidth/14,skyY/2+moonDia/2+160);
   text('The moonset time is ' + moonset, windowWidth/14,skyY/2+moonDia/2+210);

   text('The current temperature in '+ city +' is '+ temperature + "\xB0" + "C", windowWidth-600, skyY/2+moonDia/2+60);  //using dynamic values for resizing purposes on a different window size
   text('The humidity in '+ city + ' is ' + humidity +'%',windowWidth-600,skyY/2+moonDia/2+110);
   text('There is a '+rainchance+'%'+ ' chance of rain',windowWidth-600,skyY/2+moonDia/2+160);
   text('The visibility is '+ visibility + ' Miles', windowWidth-600,skyY/2+moonDia/2+210);
}
   
   textAlign(CENTER,CENTER);  
   fill(249,166,0);
   textFont(uppertitle);
   textSize(28);
   text('Moon Phase & Weather Information', windowWidth/2,70);
}

function setGradient(x, y, w, h, c1, c2, axis) {   // gradient setting to create cool background 
    noFill();
    if (axis == "Y") {  // Top to bottom gradient
      for (let i = y; i <= y+h; i++) {
        var inter = map(i, y, y+h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x+w, i);
      }
    }  
    else if (axis == "X") {  // Left to right gradient
      for (let j = x; j <= x+w; j++) {
        var inter2 = map(j, x, x+w, 0, 1);
        var d = lerpColor(c1, c2, inter2);
        stroke(d);
        line(j, y, j, y+h);
      }
    }
  }

class Star {
        constructor(){  // star constructor
            this.x = random(windowWidth);
            this.y = random(windowHeight - 200);
            this.w = 2;
            this.h = 2;
        }

    draw() {
        noStroke(); // removing stroke from star
        fill(255, 255, 0);  // star color
        ellipse(this.x, this.y, this.w, this.h);  //draw star
        this.x += (random(10) - 5);
        this.y += (random(10) - 5);
        if (this.w == 2) {  // star size vacillates between 2 and 3 creating the twinkle effect 
            this.w = 3;
            this.h = 3;
        } else {
            this.w = 2;
            this.h = 2;
        }
    }
}

 function windowResized() {    // aids in resizing
  resizeCanvas(windowWidth, windowHeight);
}