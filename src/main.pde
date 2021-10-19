color backgroundColor = #ffffff;
color foregroundColor = #000000;

Clock clock;

void setup() {
  size(640, 640);
  smooth();
  frameRate(30);
  
  clock = new Clock(width / 2, height / 2 - 32, 240);
}

void draw() {
  changeColor(nowWeek(), hour());
  background(backgroundColor);
  fill(foregroundColor);

  clock.update();
  
  if(isOffDuty(nowWeek(), hour())) {
    clock.display(backgroundColor, foregroundColor);
  } else {
    clock.display(backgroundColor, foregroundColor);
  }
}

void isOffDuty(String week, int hour) {
  return hour > 6 && hour < 18 || (week == "土" || week == "日")
}

void changeColor(String week, int hour) {
  if(week == "土" || week == "日") {
    if(hour < 12) {
      backgroundColor = #c2ff85;
      foregroundColor = #333333;
    } else {
      backgroundColor = #694585;
      foregroundColor = #ffffff;
    }
  } else {
    if(hour < 12){
      backgroundColor = #ffac54;
      foregroundColor = #333333;
    }else{
      backgroundColor = #425f85;
      foregroundColor = #ffffff;
    }
  }
}