color backgroundColor = #ffffff;
color foregroundColor = #000000;

Clock clock;

void setup() {
  size(window.innerWidth, window.innerHeight);
  smooth();
  frameRate(30);
  
  clock = new Clock(width / 2, height / 2 - 32, 240);
}

void draw() {
  size(window.innerWidth, window.innerHeight);
  clock.move(width / 2, height / 2 - 32)

  updateEventInfo();
  changeColor(nowWeek(), hour());
  background(backgroundColor);
  fill(foregroundColor);

  clock.update();
  
  if(isOffDuty(nowWeek(), hour())) {
    clock.displaySimple(backgroundColor, foregroundColor);
  } else {
    clock.display(backgroundColor, foregroundColor);
  }
}

void isOffDuty(String week, int hour) {
  return (hour < 6 || hour > 18) || (week == "土" || week == "日")
}

void changeColor(String week, int hour) {
  if(isOffDuty(week, hour)) {
    backgroundColor = #694585;
    foregroundColor = #ffffff;
  } else {
    backgroundColor = #c2ff85;
    foregroundColor = #333333;
  }
}
