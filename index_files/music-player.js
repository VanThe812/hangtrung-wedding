$(document).ready(function () {
    const audioBtn = $("#music-control");
    const audio = $("#music-source");
    audioBtn.click(function () {
        if (audio[0].paused) {
            audio[0].play();
            audioBtn.html('<img src="/images/playing.png">');
            audioBtn.addClass('playing');
        } else {
            audio[0].pause();
            audioBtn.html('<img src="/images/play.png">');
            audioBtn.removeClass('playing');
        }
    });
});
