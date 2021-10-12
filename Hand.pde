class Hand {
  float _weight;
  float _length;
  float _angle;
  
  Hand(float weight, float length, float angle) {
    rectMode(CENTER);    //基準点を正方形の中心にする
    _weight = weight;
    _length = length;
    _angle = angle;
  }
  
  void update(float angle) {
    _angle = angle;
  }
  
  void display() {
    pushMatrix();
    rotate(radians(_angle));
    strokeWeight(_weight);
    line(0, 0, 0, -height / _length);
    popMatrix();
  }
}
