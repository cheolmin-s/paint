const canvas = document.querySelector('.canvas');
const context = canvas.getContext("2d");
const colors = document.querySelectorAll('.color button');
const range = document.querySelector('.range');
const mode = document.querySelector('.mode');
const save = document.querySelector('.save');

const INITIAL_COLOR = "red";
const CANVAS_SIZE = 600;

//*** canvas 자체에 크기도 지정해줘야된다. ****** pixel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white"; // canvas 기본 배경 색
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
context.strokeStyle = INITIAL_COLOR; // context 기본 스타일과 color 설정, stroke 말고 fill 스타일 등 있다.
context.fillStyle = INITIAL_COLOR; //초기화
context.lineWidth = "2.5"; // 기본값. linewidth 는 라인 굵기. px단위


let painting = false;
let filling = false;

function startPaingting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;    //이 이벤트 안에서 offsetX 와 Y값 
    const y = event.offsetY;

    if(!painting){  // 클릭하고 마우스를 움직이면 실행하지 않는다.
        // path는 계속 만들고있지만 선을 그리진 않는다.
        context.beginPath(); //path 생성
        context.moveTo(x, y); //path 를 생성하면 마우스의 x y 좌표로 path를 옮긴다.
    } else {
        // 마우스를 움직이는 내내 발생한다.
        context.lineTo(x, y); //path 의 이전 위치에서 지금 위치까지 선을 만든다.
        context.stroke(); // 선을 그림.
    }
}

function handleColorClick(){
    const color = this.style.backgroundColor; //클릭한 버튼의 색상

    context.strokeStyle = color; // 스트로크색상을 버튼의 색으로 바꿔준다.
    context.fillStyle = color; //color를 클릭하면  strikestyle 과 fillstyle를 color 값으로 설정
};

function handleRangeChange(){
    const size = this.value;
    context.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        context.fillStyle = context.strokeStyle;
    }
}

function handleCanvasClick(){
    if(filling){  //paint도 되게 하기위해
        context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //캔버스 크기만큼 바탕색 채우기
    }
}

function handleCM(event){
    event.preventDefault(); // 우클릭 방지.
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");  // 저장할 이미지 dataURL을 만들어준다. 확장명 jpeg
    const link = document.createElement("a");

    link.href = image; //href 에는 image dataURL을 넣어준다.
    link.download = "paint image";     // 다운로드 이름
    link.click();
}

if(canvas){ // canvas가 존재하는지 확인, 없을 수도 있으니까
    canvas.addEventListener('mousemove', onMouseMove); //mouseenter가 아닌 mousemove 한 이유는 마우스 움직임을 감지하기 위해서
    canvas.addEventListener('mousedown', startPaingting); //mousedown 은 클릭했을 때 반응하는 이벤트.
    canvas.addEventListener('mouseup', stopPainting); //mouseup 은 마우스 클릭을 풀었을 때 반응하느 이벤트.
    canvas.addEventListener('mouseleave', stopPainting); //canvas를 벗어날 때 stop
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM); //마우스우클릭 박스 X
}

//Array.from() 메서드는 object를 array로 만든다.
// Array4.from(colors);

colors.forEach(color => color.addEventListener('click', handleColorClick));

if(range){
    range.addEventListener('input', handleRangeChange);
}

if(mode){
    mode.addEventListener('click', handleModeClick);
}

if(save){
    save.addEventListener('click', handleSaveClick);
}