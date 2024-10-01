// add new element to the first position of body
const toastContainer = document.createElement("div");
const form = document.querySelector(".vs-attendance-form");
if (toastContainer) {
    toastContainer.setAttribute("id", "fui-toast");
    document.body.insertBefore(toastContainer, document.body.firstChild);
}

const decisionSelectors = document.querySelectorAll('input[name="decision"]');

decisionSelectors.forEach((decisionSelector) => {
    decisionSelector.addEventListener("change", function (e) {
        const numberOfGuestsSelector = document.querySelector(
            ".vs-number-of-guests"
        );
        if (["yes", "maybe"].includes(e.target.value)) {
            numberOfGuestsSelector.disabled = false;
            numberOfGuestsSelector.value = 1;
        } else {
            numberOfGuestsSelector.disabled = true;
            numberOfGuestsSelector.value = '';
        }
    });
});

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector(".vs-attendance-name"),
            phone = document.querySelector(".vs-attendance-phone"),
            message = document.querySelector(".vs-attendance-message"),
            email = document.querySelector(".vs-attendance-email"),
            decision = document.querySelector(
                'input[name="decision"]:checked'
            )?.value,
            guest_of = document.querySelector(
                'input[name="guest_of"]:checked'
            )?.value,
            number_of_guests_el = document.querySelector(
                ".vs-number-of-guests"
            );

        let n =
            number_of_guests_el?.options[number_of_guests_el.selectedIndex]?.value;

        let t = {
            name: name?.value,
            phone: phone?.value || void 0,
            message: message?.value || void 0,
            email: email?.value || void 0,
            card_slug:
                window.location.href.split("/")[
                    window.location.href.split("/").length - 2
                ],
            decision: decision,
            number_of_guests: n,
            guest_of: guest_of,
        };
        if (
            t.number_of_guests &&
            isNaN(t.number_of_guests) &&
            (t.number_of_guests < 0 || t.number_of_guests > 6)
        ) {
            FuiToast.info(
                "Số khách tham dự không đúng, số khách phải lớn hơn 0 và nhỏ hơn 6."
            );
            return;
        }
        if (!t.name) {
            FuiToast.info("Bạn chưa nhập tên.");
            return;
        }
        if (!t.phone) {
            FuiToast.info("Bạn chưa nhập số điện thoại.");
            return;
        }
        if (!t.message) {
            FuiToast.info("Bạn chưa nhập tin nhắn.");
            return;
        }
        if (
            t.phone &&
            !/((\+84)|0)(3[2-9]|5[2689]|7[06789]|8[1-689]|9[0-9])[0-9]{7}/g.test(
                t.phone
            )
        ) {
            FuiToast.info("Số điện thoại không đúng định dạng.");
            return;
        }
        if (
            t.email &&
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
                t.email
            )
        ) {
            FuiToast.info("Email không đúng định dạng.");
            return;
        }

        fetch("/api/attendances/attend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(t),
        })
            .then((e) => e.json())
            .then(() => {
                FuiToast.success("Xác nhận tham dự thành công. Cảm ơn bạn.");
            })
            .catch((e) => {
                console.error(e);
                FuiToast.error("Có lỗi xảy ra. Vui lòng thử lại.");
            })
            .finally(() => {
                name && (name.value = ""),
                    phone && (phone.value = ""),
                    message && (message.value = ""),
                    email && (email.value = "");
            });
    });
}
