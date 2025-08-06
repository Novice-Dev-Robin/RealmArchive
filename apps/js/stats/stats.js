const baseStats = {
  strength: 10,
  intelligence: 10,
  stamina: 100,
  charm: 5,
  stress: 20
};



function doExercise() {
  mokokoStats.str += 1;
  mokokoStats.sta -= 10;
  mokokoStats.stress += 5;
}

function doStudy() {
  mokokoStats.int += 1;
  mokokoStats.sta -= 10;
  mokokoStats.stress += 7;
}

function doSleep() {
  mokokoStats.sta = 100;
  mokokoStats.stress = Math.max(mokokoStats.stress - 30, 0);
}

function doStyle() {
  mokokoStats.cha += 1;
  mokokoStats.sta -= 5;
  mokokoStats.stress += 2;
}
