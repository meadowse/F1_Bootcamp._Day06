let field = document.getElementById('field');
let anti_filed = document.getElementById('enemy');
let blocked = [];
let block_position = [];
let enemy_ship;
let enemy_ship1 = [21, 31, 41, 51, 26, 27, 28, 44, 54, 64, 46, 47, 66, 67, 69, 79, 2, 90, 9, 99];
let enemy_ship2 = [19, 29, 39, 49, 31, 41, 21, 83, 84, 85, 6, 7, 98, 99, 80, 90, 0, 24, 56, 36];
let enemy_ship3 = [2, 3, 4, 5, 30, 40, 50, 9, 19, 29, 32, 33, 37, 47, 52, 53, 99, 90, 69, 74];
let count = 0;
let four_cage = 1, three_cage = 2, two_cage = 3, one_cage = 4;
let flag = false;
let fight = false;
let r = Math.floor(Math.random() * 3);
switch(r) {
    case 0:
        enemy_ship = enemy_ship1;
        break;
    case 1:
        enemy_ship = enemy_ship2;
        break;
    case 2:
        enemy_ship = enemy_ship3;
        break;
} 
// let flag = false;
let x = 0, y = 0;
for (let i = 0; i < 100; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('x', x);
    cell.setAttribute('y', y);
    cell.setAttribute('id', i)
    // cell.setAttribute('access', true);
    cell.innerHTML= x + "," + y;
    field.appendChild(cell);
    
    y = (y > 8) ? y = 0 : y + 1;
    x = (y == 0) ? x + 1 : x;
}
for (let i = 0; i < 100; i++) {
    let cell = document.createElement('div');
    cell.classList.add('anti_cell');
    cell.setAttribute('anti_id', i);
    cell.setAttribute('onclick', 'Click(' + i + ')');
    // cell.setAttribute('class', 'block');
    cell.innerHTML= i;
    anti_filed.appendChild(cell);
}
function place(quantity) {
    try {
        console.log(document.getElementsByClassName('block--select'));
        let last = document.getElementsByClassName('block--select');
        last[0].classList.remove('block--select');
    } catch(e) {
        console.log("Вставки нет");
    }
    switch(true) {
        case (quantity == 4 && four_cage > 0):
            four_cage--;
            console.log(four_cage);
            break;
        case (quantity == 3 && three_cage > 0):
            three_cage--;
            console.log(three_cage);
            break;
        case (quantity == 2 && two_cage > 0):
            two_cage--;
            console.log(two_cage);
            break;
        case (quantity == 1 && one_cage > 0):
            one_cage--;
            console.log(one_cage);
            break;
        case (four_cage == 0 && three_cage == 0 && two_cage == 0 && one_cage == 0):
            alert("Ваше поле построено");
            return;
        default:
            console.log("Empty");
            return;
    }
    
    count = quantity;
    document.getElementById(0).classList.add('block--select');
}

function Go() {
    fight = true;
}

function Click(id) {
    anti_cell = document.querySelectorAll('.anti_cell');
    // anti_cell[id].classList.add("evil");
    // enemy_ship3.push(id);
    // console.log(enemy_ship3);
    // for (let i = enemy_ship.length; i != 0; i--) {
    if (fight == true) {
        if (enemy_ship.includes(id)) {
            anti_cell[id].classList.add("block--select");
            alert("Попал!");
        } else {
            alert("Мимо!");
            anti_cell[id].classList.add("evil");
        }
    }
    // }
}

window.addEventListener('keydown', function(event) {
  var blocks = document.querySelectorAll('.cell'),
      block_selected = document.querySelectorAll('.block.block--select');
            
  if (event.keyCode == "13") {
    // console.log( block_selected.innerHTML )
    let position = document.getElementsByClassName('block--select');
    // for (let count = arr.length; count != 0; count--) { 
    //     position[0].classList.add('dot');
    // }
    if (flag == true) {
        if (position[0].classList.contains("engaged") && count > 0) {
            let past = document.querySelectorAll('.engaged');
            past.forEach((elem) =>{
                if ((position[0].getAttribute('x') == elem.getAttribute('x') && position[0].getAttribute('y') == elem.getAttribute('y')) == false) {
                    blocked.push(elem.getAttribute('x') + elem.getAttribute('y'));
                    console.log(blocked);
                }
                elem.classList.remove('engaged');
            })
            position[0].classList.add('dot');
        }
    } else if (flag == false) {
        position[0].classList.add('dot');
    }
    flag = true;
    if (count > 0 && blocked.includes(Number(position[0].getAttribute('id'))) == false) {
        block_position[0] = [Number(position[0].getAttribute('x')) - 1, Number(position[0].getAttribute('y'))];
        block_position[1] = [Number(position[0].getAttribute('x')), Number(position[0].getAttribute('y')) + 1];
        block_position[2] = [Number(position[0].getAttribute('x')) + 1, Number(position[0].getAttribute('y'))];
        block_position[3] = [Number(position[0].getAttribute('x')), Number(position[0].getAttribute('y')) - 1];
        for (let i = 0; i < 4; i++) {
            // let x = block_position[i][0];
            // let y = block_position[i][1];
            // let id = block_position[i][0] + block_position[i][1];
            // if ((block_position[i][0] >= 0 && block_position[i][0] <= 9) && (block_position[i][1] >= 0 && block_position[i][1] <= 9)) {
            //     document.querySelector('[id="' + block_position[i][0] + block_position[i][1] + '"]').classList.add('engaged');
            // } else {
            //     // console.log(id);
            //     console.log("Error");
            // }
            try {
                document.querySelector('[id="' + block_position[i][0] + block_position[i][1] + '"]').classList.add('engaged');
            } catch(e) {
                console.log("Вставки нет");
            }
        }
        console.log(block_position);
        count--;
        
    } else {
        console.log("Error");
    }
  } else if (event.keyCode == "37") {
    console.log("Left");
    // block_selected.style.backgroundColor = "white";
    for(var i = 0; i < blocks.length; i++){
      if( blocks[i].classList.contains('block--select')){
        blocks[i - 1].classList.add('block--select');
        blocks[i].classList.remove('block--select');
        
        break;
      };
    };
  } else if (event.keyCode == "39") {
    console.log("Right");
    for(var i = 0; i < blocks.length; i++){
      if( blocks[i].classList.contains('block--select')){
        blocks[i + 1].classList.add('block--select');
        blocks[i].classList.remove('block--select');
        
        break;
      };
    };
  } else if (event.keyCode == '38') {
    console.log("Up");
    for (let i = 0; i < blocks.length; i++) {
        if( blocks[i].classList.contains('block--select')){
            blocks[i - 10].classList.add('block--select');
            blocks[i].classList.remove('block--select');
            break;
        }
    }
  } else if (event.keyCode == '40') {
    console.log("Down");
    for (let i = 0; i < blocks.length; i++) {
        if( blocks[i].classList.contains('block--select')){
            blocks[i + 10].classList.add('block--select');
            blocks[i].classList.remove('block--select');
            break;
        }
    }
  }
});