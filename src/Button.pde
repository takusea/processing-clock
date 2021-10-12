class Button {
  float _x;
  float _y;
  float _width;
  float _height;
  String _text;
  
  Button(String text, float x, float y, float width, float height) {
    _x = x;
    _y = y;
    _width = width;
    _height = height;
    _text = text;
  }
  
  void display() {
    noStroke();
    fill(#ffffff);
    rect(_x, _y, _width, _height);
    
    fill(#000000);
    textSize(16);
    textAlign(LEFT, CENTER);  
    text(_text, _x + 8, _y + _height / 2);
  }
}
