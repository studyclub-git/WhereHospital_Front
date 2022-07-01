const axios = require("axios");
const Swal = require("sweetalert2");


/**
 * @param url
 * @param param
 * @param method
 * @returns {Promise}
 */
// eslint-disable-next-line no-unused-vars
const $get = function (url, param, method) {
    if (method === undefined) method = "GET";

    return new Promise((resolve, reject) => {
        axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        });

        axios({
            url: url,
            method: method,
            data: param,
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            },
        }).then((response) => {
                const {data, status, statusText, headers, config, request} = response;
                resolve(data, status, statusText, headers, config, request);
        }).catch((error) => {
                reject(error);
        });
    });
};

const $multipart = (url, formData, callback) => {

    axios.post(url, formData, {
        eaders: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        console.log(res);
    }).then(() => {
        if (typeof callback === "function") {
            callback();
        }
    }).catch(error => {
        console.error(error);
    });
};

/**
 *
 * @param url
 * @param param
 * @return {Promise}
 */
// eslint-disable-next-line no-unused-vars
    const $post = (url, param) => {
        return $get(url, param, "POST");
    };

// eslint-disable-next-line no-unused-vars
    const $loading = function(title, callback) {
        new Swal({
            // toast: true,
            position: "top-end",
            showConfirmButton: false,
            // background: "black"
            allowOutsideClick: "false",
            // eslint-disable-next-line no-unused-vars
            didOpen: (loadingBox) => {
                Swal.showLoading();
            }
        })
    }

// eslint-disable-next-line no-unused-vars
    const $question = function (title, callback) {
        $makeSwal("question", title, callback);
    };

// eslint-disable-next-line no-unused-vars
    const $hideLoading = function (callback) {
        Swal.hideLoading();
    };

// eslint-disable-next-line no-unused-vars
    const $confirm = function (msg, confirmCallback, rejectCallback) {
        new Swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "확인",
            showLoaderOnConfirm: true,
            cancelButtonText: "취소",
            text: msg,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    confirmCallback();
                }
                else {
                    rejectCallback();
                }
            });
    };

    const $warning = function (title, callback) {
        $makeSwal("warning", title, callback);
    };
    const $info = function (title, callback) {
        $makeSwal("info",title, callback)
    };
    const $success = function (title, callback) {
        $makeSwal("success", title, callback);
    };
    const $error = function (title, callback) {
        $makeSwal("error", title, callback);
    };
    const $makeSwal = function (method, title, callback) {
        new Swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            icon: method,
            title: title,
        })
            .then(() => {
                if (typeof callback === "function") {
                    callback();
                }
            });

    };

/**
 * 특수문자 변환
 * @param text
 * @returns String
 */
// eslint-disable-next-line no-unused-vars
    const $converter = (text) => {
        let str = text;

        str = str.split("\\").join("￦");
        str = str.split("'").join("’");
        str = str.split("\"").join("″");
        str = str.split("\n").join("<br>");
        str = str.replace(/bslush;/g, "\\");
        str = str.replace(/sharp;/g, "#");
        str = str.replace(/amp;/g, "&");
        str = str.replace(/quot;/g, "'");
        str = str.replace(/pct;/g, "%");
        str = str.replace(/plus;/g, "+");
        str = str.replace(/<br>/g, "\n");
        str = str.replace(/dblq;/g, "\"");
        str = str.replace("que;", "?");
        return str;
    };


// 외부로 함수 Export
export {
    $get, $post, $loading, $hideLoading, $converter, $error, $info, $confirm, $question, $success, $warning, $makeSwal, $multipart
};