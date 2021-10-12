color backgroundColor;
color foregroundColor;

Clock clock;

void setup() {
  size(640, 640);
  smooth();
  frameRate(30);
  
  clock = new Clock(width / 2, height / 2 - 32, 240);
}

void draw() {
  /*
  Calendar cal = Calendar.getInstance();
  String week[] = {"日", "月", "火", "水", "木", "金", "土"};
  String nowWeek = week[cal.get(Calendar.DAY_OF_WEEK) -1];

  if(nowWeek == "土" || nowWeek == "日") {
    if(hour() < 12) {
      backgroundColor = #c2ff85;
      foregroundColor = #333333;
    } else {
      backgroundColor = #694585;
      foregroundColor = #ffffff;
    }
  } else {
    if(hour()<12){
      backgroundColor = #ffac54;
      foregroundColor = #333333;
    }else{
      backgroundColor = #425f85;
      foregroundColor = #ffffff;
    }
  }
  */
  background(backgroundColor);
  fill(foregroundColor);

  clock.update();
  
  if(hour() > 6 && hour() < 18 /*|| (nowWeek == "土" || nowWeek == "日")*/){ //複雑な時計
    clock.display(backgroundColor, foregroundColor);
  } else {
    clock.display(backgroundColor, foregroundColor);
  }
}
