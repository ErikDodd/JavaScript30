const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
        .catch(err => {
            console.error('Oh no! You need to allow access to the webcam', err);
        });
}

function paintToCanavas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // Take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // adjust the pixels 
        pixels = redEffect(pixels);
        // Put the pixels back 
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    // Played the Sounds
    snap.currentTime = 0;
    snap.play();

    // Take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    // console.log(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);

}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // red
        pixels.data[i + 0] = pixels.data[i + 0] + 100;
        // green
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        // blue
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    return pixels;
}
getVideo();

video.addEventListener('canplay', paintToCanavas);