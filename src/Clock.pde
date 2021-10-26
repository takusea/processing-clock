class Clock {
  private float _x;
  private float _y;
  private float _radius;
  
  private final Hand hourHand;
  private final Hand minuteHand;
  private final Hand secondHand;

  Clock(float x, float y, float radius) {
    _x = x;
    _y = y;
    _radius = radius;
  
    hourHand = new Hand(4, _radius / 2, (hour() / 12.0) * 360);
    minuteHand = new Hand(4, _radius / 1.25, (minute() / 60.0) * 360);
    secondHand = new Hand(2, _radius / 1.125, (second() / 60.0) * 360);
  }
    
  void move(float x, float y) {
    _x = x;
    _y = y;
  }

  void update() {
    hourHand.update((hour() / 12.0) * 360);
    minuteHand.update((minute() / 60.0) * 360);
    secondHand.update((second() / 60.0) * 360);
  }

  void display(color backgroundColor, color foregroundColor) {
    translate(_x, _y);

    displayFrame(_radius, "#fff", foregroundColor);
    
    float dialRadius = _radius - 10;
    displayDial(dialRadius, foregroundColor);
    
    float numberRadius = _radius - 50;
    displayNumber(numberRadius, foregroundColor);

    hourHand.display(foregroundColor);
    minuteHand.display(foregroundColor);
    secondHand.display(foregroundColor);
    
    translate(-_x, -_y);
  }
  
  private void displaySimple(color backgroundColor, color foregroundColor) {
    translate(_x, _y);

    displayFrame(_radius, "#fff", foregroundColor);
    
    float numberRadius = _radius - 50;
    displaySimpleNumber(numberRadius, foregroundColor);

    hourHand.display(foregroundColor);
    minuteHand.display(foregroundColor);
    secondHand.display(foregroundColor);
    
    translate(-_x, -_y);
  }
  
  private void displayFrame(float radius, color backgroundColor, color foregroundColor) {
    fill(backgroundColor);
    stroke(foregroundColor);
    strokeWeight(4);
    ellipse(0, 0, radius * 2, radius * 2);
    strokeWeight(1);
  }
  
  private void displayDial(float radius, color _color) {
    stroke(_color);
    for(int i = 0; i < 60; i++) {
      float angle = radians(i * 360 / 60);
      float horizontal = cos(angle);
      float vertical = sin(angle);
      
      if(i % 5 == 0) {
        line(horizontal * radius, vertical * radius, horizontal * (radius - 20), vertical * (radius - 20));
      } else {
        line(horizontal * radius, vertical * radius, horizontal * (radius - 10), vertical * (radius - 10));
      }
    }    
  }
  
  private void displayNumber(float radius, color _color) {
    textSize(48);
    textAlign(CENTER, CENTER);  
    fill(_color);
    for(int i = 0; i < 12; i++) {
       float angle = radians((i - 2) * 360 / 12);
       float horizontal = cos(angle);
       float vertical = sin(angle);
       
       textSize(30);
       text(i + 1, horizontal * radius, vertical * radius);
    }
  }
  
  private void displaySimpleNumber(float radius, color _color) {
    textSize(48);
    textAlign(CENTER, CENTER);  
    fill(_color);
    for(int i = 2; i < 12; i += 3) {
       float angle = radians((i - 2) * 360 / 12);
       float horizontal = cos(angle);
       float vertical = sin(angle);
       
       textSize(30);
       text(i + 1, horizontal * radius, vertical * radius);
    }
  }
}
