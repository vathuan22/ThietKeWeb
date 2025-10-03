const btn = document.getElementById('btnChange');

const colors = ['red','orange','yellow','green','blue','purple'];

function changeColor(){

    const randomColor = colors[Math.floor(colors.length * Math.random())];
    document.body.style.background = randomColor;
}


btn.addEventListener('click', changeColor);

