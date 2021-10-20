class Hand {
  private final float _weight;
  private final float _length;
  private float _angle;
  
  Hand(float weight, float length, float angle) {
    _weight = weight;
    _length = length;
    _angle = angle;
  }
  
  void update(float angle) {
    _angle = angle;
  }
  
  void display(color _color) {
    stroke(_color);
    pushMatrix();
    rotate(radians(_angle));
    strokeWeight(_weight);
    line(0, 0, 0, -_length);
    popMatrix();
  }
}
