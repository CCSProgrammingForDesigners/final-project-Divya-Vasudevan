const collageElements = document.getElementsByClassName("collage");
const photoboothElements = document.getElementsByClassName("photobooth");

detectPeople = () => {
    const people = document.getElementById("detectPerson");
    const removePeople = document.getElementById("removePerson");
    people.addEventListener('click', e => { //if no one in front of screen within x to y distance
        displayPhotobooth();
    });
    removePeople.addEventListener('click', e => { //else
        displayCollage();
    });
}

const displayCollage = () => {
    for (const collageElement of collageElements) {
        collageElement.classList.add("show");
        collageElement.classList.remove("hide");
    }
    for (const photoboothElement of photoboothElements) {
        photoboothElement.classList.add("hide");
        photoboothElement.classList.remove("show");
    }
    //automatically shuffle through images every 20? secs
}

const displayPhotobooth = () => {
    for (const photoboothElement of photoboothElements) {
        photoboothElement.classList.add("show");
        photoboothElement.classList.remove("hide");
    }
    for (const collageElement of collageElements) {
        collageElement.classList.add("hide");
        collageElement.classList.remove("show");
    }
    //turn on camera
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(function (stream) {
            var video = document.getElementById("myVideo");
            video.srcObject = stream;
            video.play();
            startCountdown();
        })
        .catch(function (err) {
            alert("there was an error " + err)
        });
}

const startCountdown = () => {
    const text = document.getElementById("text_prompt");
    text.innerHTML = "STRIKE A POSE !!"; //tell this out loud too to attract attention
    text.classList.add("zoomIn");
    let countdown = 3;
    setTimeout(() => {
        text.classList.remove("zoomIn");
    }, 2000);
    setTimeout(() => {
        text.innerHTML = "3";
        text.classList.add("zoomIn");
    }, 2020);
    setTimeout(() => {
        text.classList.remove("zoomIn");
    }, 3000);
    setTimeout(() => {
        text.innerHTML = "2";
        text.classList.add("zoomIn");
    }, 3020);
    setTimeout(() => {
        text.classList.remove("zoomIn");
    }, 4000);
    setTimeout(() => {
        text.innerHTML = "1";
        text.classList.add("zoomIn");
    }, 4020);
    setTimeout(() => {
        text.classList.remove("zoomIn");
        takePic(); //take the picture
        text.innerHTML = "PICTURE TAKEN";
        backToCollage();
    }, 5000);

    /*detect colors worn by person. if dark then pick one of the black ones, if bright 
    pick one of the red cards. Or just pick the joker no matter the color*/
}

const backToCollage = () => {
    setTimeout(() => {
        displayCollage(); //back to collage page
        //reset ouput to empty for next person
        const photo = document.getElementById('photoOutput');
        photo.setAttribute('src', "");
    }, 5000);
}

/********************************photo func from github*******************************/
takePic = () => {

    let width = 320;
    let height = 240;
    const video = document.getElementById('myVideo');
    const canvas = document.getElementById('canvas');
    const photo = document.getElementById('photoOutput');

    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
            console.log("An error occured! " + err);
        });

    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    let data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
    //save photo to folder
}
/***************************************************************/

detectPeople();