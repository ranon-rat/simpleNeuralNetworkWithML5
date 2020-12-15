var model;
var targetLabel = "C";
var state = "collection";

function setup() {
  createCanvas(500, 500);
  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: true
  };
  model = ml5.neuralNetwork(options);
  background(255);
}
function keyPressed() {
  if (key == "t") {
    let options = {
      epochs: 200
    };
    model.normalizeData();
    model.train(options, whileTraining, finishTraining);
  } else {
    targetLabel = key.toUpperCase();
  }
}
function mousePressed() {
  let options = {
    x: mouseX,
    y: mouseY
  };
  if (state == "collection") {
    let data = {
      label: targetLabel
    };
    model.addData(options, data);
    noFill();
    stroke(0);
    ellipse(mouseX, mouseY, 24, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
  } else if (state === "prediction") {
    model.classify(options, gotResults);
  }
}
//------------>training
const whileTraining = (epoch, loss) => {
  document.getElementById("epoch").innerText = epoch;
  document.getElementById("loss").innerText = loss.loss;
};
const finishTraining = () => {
  console.log("finished");
  state = "prediction";
};
//----------->prediction
function gotResults(error, results) {
  
  if (error) {
    console.log(error);
    return;
  }

  fill(0, 0, 255);
  stroke(0)
  ellipse(mouseX, mouseY, 24, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(results[0].label, mouseX, mouseY);
  console.log(results);
}
