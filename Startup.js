let StartupSound = new Audio("Assets/terminalstartup.ogg");
StartupSound.play();

let Startup = false;
let Muted = false;

var actx = new (AudioContext || webkitAudioContext)(),
    src = "Assets/Lullaby Of The Leaves Loop.ogg",
    audioData,
    srcNode;

fetch(src, { mode: "cors" }).then(function (resp) { return resp.arrayBuffer() }).then(decode);

function decode(buffer) {
    actx.decodeAudioData(buffer, playLoop);
}

function playLoop(abuffer) {
    if (!audioData) audioData = abuffer;
    srcNode = actx.createBufferSource();
    srcNode.buffer = abuffer;
    srcNode.connect(actx.destination);
    srcNode.loop = true;
    srcNode.playbackRate.value = 1.0;

    if (Startup == false) {
        Startup = true;
        srcNode.playbackRate.setValueAtTime(0.0, actx.currentTime);
        srcNode.playbackRate.linearRampToValueAtTime(1.0, actx.currentTime + 1);
    }

    srcNode.start();
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector(".MusicButton").onclick = function () {
        if (actx.state === 'running') {
            actx.suspend()
            document.querySelector(".MusicButton img").src = "Assets/Muted.png"
            Muted = true
        } else if (actx.state === 'suspended') {
            actx.resume()
            document.querySelector(".MusicButton img").src = "Assets/Unmuted.png"
            Muted = false
        }

        const ClickSound = new Audio("Assets/smileOSclick3.wav")
        ClickSound.volume = 0.2
        ClickSound.play()
    }
})

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        actx.suspend()
    } else {
        if (Muted === false) {
            actx.resume()
        }
    }
})