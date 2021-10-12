import java.util.Calendar;//カレンダーをつくるため

color backgroundColor = #c2ff85;
color foregroundColor = #333333;

void setup() {
  size(400,400);
  smooth();
  frameRate(30);//1秒に30回更新している
  PFont font;
  font = loadFont("fonts/AppleSDGothicNeo-Bold-22.vlw");
  textFont(font, 48);
  textAlign(CENTER, CENTER);
}

void draw() {
  Calendar cal = Calendar.getInstance();
  String week[] = {"日","月","火","水","木","金","土"};//String:文字列型　int:整数   float:少数
  String nowWeek = week[cal.get(Calendar.DAY_OF_WEEK) -1];//現在の曜日を取得

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

  noFill();
  background(backgroundColor);
  stroke(foregroundColor);
  translate(width/2, height/2);
  ellipse(0,0,width, height);
  fill(foregroundColor);
  
  float h = hour();//時間の取得
  float m = minute();
  float s = second();
  
  if(hour() > 6 && hour() < 18 || (nowWeek == "土" || nowWeek == "日")){ //複雑な時計
   for(int i = 0; i < 12; i++) {
     float angle = radians((i - 2) * 360 / 12);
     float horizontal = cos(angle);// ２行で１〜１２の数字の位置
     float vertical = sin(angle);
     textSize(30);
     text(i + 1, horizontal * 150, vertical * 150);//内容、x座標、y座標
    }

     fill(foregroundColor);
     textSize(18);
     text(year()+"/"+month()+"/"+day()+"("+nowWeek+")",0,50);//直します
     noFill();

    for(int i = 0; i < 60; i++) {//メモリの描画
      float angle = radians(i * 360 / 60);
      float horizontal = cos(angle);
      float vertical = sin(angle);
      if(i % 5 == 0) {
        line(horizontal * 190, vertical * 190, horizontal * 170, vertical * 170);
      }
      else {
        line(horizontal * 190, vertical * 190, horizontal * 180, vertical * 180);
      }
    }
    
    // 分針の描画
    pushMatrix();
    rotate(radians(m*(360/60)));
    strokeWeight(4);
    line(0,0,0,-height/2.75);
    popMatrix();
    
    // 時針の描画
    pushMatrix();
    rotate(radians(h*(360/12)));
    strokeWeight(4);
    line(0,0,0, -height/4);
    popMatrix();
    
    // 秒針の描画
    pushMatrix();
    rotate(radians(s*(360/60)));
    strokeWeight(2);
    line(0,0,0,-height/2.25);
    popMatrix();
    strokeWeight(1);
  } else {//シンプルな時計
    for(int i = 0; i < 4; i++) {
      float angle = radians(i * 360 / 4);
      float horizontal = cos(angle);// ２行で１〜１２の数字の位置
      float vertical = sin(angle);
      textSize(30);
      text((i +1)*3, horizontal * 180, vertical * 180);//内容、x座標、y座標
    }

     fill(foregroundColor);
     textSize(18);
     text(year()+"/"+month()+"/"+day()+"("+nowWeek+")",0,50);//直します
     noFill();
  
    
    // 分針の描画
    pushMatrix();
    rotate(radians(m*(360/60)));
    strokeWeight(4);
    line(0,0,0,-height/2.75);
    popMatrix();
    
    // 時針の描画
    pushMatrix();
    rotate(radians(h*(360/12)));
    strokeWeight(4);
    line(0,0,0, -height/4);
    popMatrix();
    
  }
}
