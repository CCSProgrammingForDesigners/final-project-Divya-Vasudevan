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
    const photo = takePhoto();
}

const takePhoto = () => {
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
        //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        text.innerHTML = "PICTURE TAKEN"; //take pic after countdown
        const photo = "photo location"; //photo file location
        //store photo 
        showPhoto(photo);
    }, 5000);

    /*const timeoutID = window.setTimeout(() => {
        if (getTimeout === 2000) {
            text.classList.remove("zoomIn");
        }
        text.innerHTML = countdown;
        //text.classList.add("zoomIn");
        countdown--;
    }, 2000);

    setTimeout(() => {
        clearInterval(timeoutID);
        text.innerHTML = "PICTURE TAKEN";
        //take pic after countdown
        const photo = ""; //photo file location
        //store photo
        return photo;
    }, 7999);*/
    /*detect colors worn by person. if dark then pick one of the black ones, if bright 
    pick one of the red cards. Or just pick the joker no matter the color*/
}

const showPhoto = (photo) => {
    //show their photo for 3 secs
    console.log(photo);
    setTimeout(() => {
        displayCollage(); //back to collage page
    }, 3000);
}

detectPeople();