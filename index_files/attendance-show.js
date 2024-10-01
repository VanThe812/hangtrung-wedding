$(document).ready(function () {
    const slug =
        window.location.href.split("/")[
            window.location.href.split("/").length - 2
        ];

    fetch(`/api/cards/${slug}/attendance-messages`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((messages) => {
            showToastMessage(messages);
        });
});

function showToastMessage(messages) {
    if (!messages.length) return;
    if (messages.length > 0) {
        document.body.style.paddingBottom = "200px";
    }
    showMessage(messages.pop());
   
    var interval = setInterval(function () {
        if (!messages.length) {
            clearInterval(interval);
            document.body.style.paddingBottom = "50px";
            return;
        }
        if (document.querySelector("#vs-toast")) document.body.removeChild(document.querySelector("#vs-toast"));
        showMessage(messages.pop())
    }, 7500);
}

function showMessage(message) {
    const toast = document.createElement("div");
    toast.setAttribute('id', 'vs-toast');
    toast.setAttribute('class', 'vs-toast-show');
    document.body.appendChild(toast);
    toast.outerHTML = `<div id="vs-toast" class="vs-toast-show"><span>Lời nhắn từ <strong><em>${message.name}: </em></strong> ${message.message} </span></div>`;
    setTimeout(function(){  
        document.querySelector("#vs-toast").className = '';
    }, 7000);
}
