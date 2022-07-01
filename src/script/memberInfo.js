
// eslint-disable-next-line no-unused-vars
class MemberInfo {
    id = null;
    #pw = null;
    #authKey = null;
    grade = null;
    mi = null;
    oThis = null;
// eslint-disable-next-line no-unused-vars
    constructor(oThis) {
        // console.log(oThis.$error("안녕"));
        this.oThis = oThis;
    }

    /**
     * @param mi
     */
    loginCheck(mi) {
        this.oThis.$loading();
        if (!(mi instanceof this)) {
            this.oThis.$error("서버와의 연결에 실패했습니다.");
        }

        this.oThis.$post("member/loginCheck", mi)
            .then((data) => {
                const {res} = data;

                if (!res) {
                    this.oThis.$info("세션이 만료되었습니다.\n 다시 로그인해주세요.");
                }
            })
            .catch((error) => {
                this.oThis.error("서버와의 연결에 실패했습니다.", () => {
                    console.error(error);
                });
            })
            .finally(() => {
                this.oThis.$hideLoading();
            });
    }

    /**
     * @param id
     * @param pw
     * @param callback
     */
    login(id, pw, callback) {
        this.oThis.$loading();

        this.oThis.$post("member/login", {id: id, pw: pw})
            .then((data) => {
                const {res, rows} = data;

                if (res) {
                    const row = rows[0];

                    if (typeof callback === "function") {
                        callback();
                    }

                    this.id = row.id;
                    this.#pw = row.pw;
                    this.#authKey = row.authKey;
                    this.grade = row.grade;
                } else {
                    this.oThis.$error("잘못된 로그인 정보입니다.");
                }
            })
            .catch((error) => {
                this.oThis.$error("서버와의 연결에 실패했습니다.", () => {
                    console.error(error);
                });
            })
            .finally(() => {
                this.oThis.$hideLoading();
            });
    }

    logOut() {

    }

    /**
     * authKey를 server에서 보관하고 해당 key로 Symbol 생성
     * */
    getMemberInfo() {
        return this;
    }
}

export default {
    MemberInfo
}