import "izitoast/dist/css/iziToast.min.css"
import iZtoast from "izitoast"

const toast = {
    error: (message = "Error", title = "") =>
        iZtoast.error({
            title,
            message,
            progressBar: false,
            position: "topRight",
            backgroundColor: "#FFD2D2",
            titleColor: "#D8000C",
            messageColor: "#D8000C",
            iconColor: "#D8000C",
            messageSize: "17",
            titleSize: "17",
            progressBarColor: "#D8000C",
            transitionIn: "fadeInLeft",
            icon: "far fa-times-circle",
            timeout: 5000
        }),
    success: (message, title = "") =>
        iZtoast.success({
            title,
            message,
            progressBar: false,
            position: "topRight",
            backgroundColor: "#DFF2BF",
            titleColor: "#4F8A10",
            messageColor: "#4F8A10",
            iconColor: "#4F8A10",
            messageSize: "17",
            titleSize: "17",
            progressBarColor: "#4F8A10",
            transitionIn: "fadeInLeft",
            icon: "far fa-check-circle",
            timeout: 5000
        }),
    notify: (message, title = "") =>
        iZtoast.success({
            title,
            message,
            position: "topRight",
            backgroundColor: "#BDE5F8",
            titleColor: "#00529B",
            messageColor: "#00529B",
            iconColor: "#00529B",
            messageSize: "17",
            titleSize: "17",
            progressBarColor: "#00529B",
            transitionIn: "fadeInLeft",
            icon: "far fa-bell",
            progressBar: false,
            timeout: 5000
        })
}

//
// .isa_info {
//     color: #00529B;
//     background-color: #BDE5F8;
// }
// .isa_success {
//     color: #4F8A10;
//     background-color: #DFF2BF;
// }
// .isa_warning {
//     color: #9F6000;
//     background-color: #FEEFB3;
// }
// .isa_error {
//     color: #D8000C;
//     background-color: #FFD2D2;
// }
// .isa_info i, .isa_success i, .isa_warning i, .isa_error i {
//     margin:10px 22px;
//     font-size:2em;
//     vertical-align:middle;
// }

export default toast
