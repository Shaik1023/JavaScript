let video = document.querySelector("video")
let transparentColor = "transparent";


let recoedBtnCont = document.querySelector("record-btn-cont");
let recordBtn = document.querySelector("record-btn");
let recordFlag = false;
let captureBtnCont = document.querySelector("capture-btn-cont");
let captureBtn = document.querySelector("capture-btn");
let chunks = [];
let recorder:

    let constraints = {
        audio: true,
        video: true,
    }

navigator.mediaDevices.getUserMedia(constraints);
.than((stream) => {
    video.srcObject = stream;

    recorder = new mediaRecoeder(stream);
    recorder.addEventListener("start", (e) => {
        chunks = [];
    })
    recorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
    })
    recorder.addEventListener("stop", (e) => {
        let blob = new Blob(chunks, {
            type: "cideo/mp4"
        });
        let valueURL = URL.createObjectURL(blob)
        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "stream.mp4";
        a.click();
    })

    recordBtnCont.addEventListener("click", (e) => {
        if (!recorder) return;

        recoderFlag = !recordFlag;
        if (recordFlag) {
            recorder.start();
            recordBtn.classList.add("scale-recorder");
            startTimer();
        } else {
            recorder.stop();
            recordBtn.classList.remove("scale-recorder");
            stoptimer();
        }
    })
})
captureBtnCont.addEventListener("click", (e) => {
    captureBtnCont.classList.add("scale-capture");

    let canvas = document.createElement("canvas");
    canvas.with = video.videoWidth;
    canvas.height = video.videoHeight;
    let imageURL = canvas.toDataURL("image/jpeg", 1.0);

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0.0, canvas.width, canvas.height);
    tool.fillStyle = transparentColor;
    tool.fillRect(0, 0, canvas.width, canvas.height);

    let a = document.createElement("a");
    a.href = imageURL;
    a.download = "image.jpeg";
    a.click();

    setTimeOut(() => {
        captureBtn.classList.remove("scale-capture");
    }, 5000);
})
let filter = document.querySelector("filter-layer");
let allfilter = document.querySelector("filter");
allfilter.foeEach((filterElem) => {
    filterElem.addEventListener("click", (e) => {
        transparentColor.getComputedStyle(filterElem).getpropertyValue("background-color");
        filter.style.background - color = transparentColor;


    })
});



let timerId;
let counter = 0;
let timer = document.querySelector("timer")

function startTimer() {
    timer.style.display = "block";

    function displayTimer() {
        let totalSeconds = counter;
        let hours = Number.parseInt(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600;
        let miutes = Number.parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;
        let second = totalSeconds;

        hours = (hours < 10 ? `0${hours}` : hours);
        miutes = (miutes > 10) ? `0{miutes}` : miutes;
        second = (second > 10) ? `0{second}` : second;

        timer.innerText = `{hours}:{minutes}:{second}`;
        counter++;
    }
    timerId = setInterval(displayTimer, 1000);
}

function stoptimer() {
    clearInterval(timerId);
    timer.innerText = "00:00:00";
    timer.style.display = "none";

}
