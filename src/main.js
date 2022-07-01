import Vue from 'vue'
import App from './App.vue'
import Swal from 'vue-sweetalert2';
Vue.config.productionTip = false
import {
  $get, $post, $loading, $hideLoading, $converter, $error, $info, $confirm, $question, $success, $warning, $makeSwal
} from "@/script/common";
import MemberInfo from "@/script/memberInfo";

/** CSS */
import 'sweetalert2/dist/sweetalert2.min.css';

const app = new Vue({
  render: h => h(App),
}).$mount('#app')

app.use(Swal);
/* Common_Func */
app.config.globalProperties.$get = $get;
app.config.globalProperties.$post = $post;
app.config.globalProperties.$loading = $loading;
app.config.globalProperties.$hideLoading = $hideLoading;
app.config.globalProperties.$converter = $converter;
app.config.globalProperties.$error = $error;
app.config.globalProperties.$info = $info
app.config.globalProperties.$confirm = $confirm;
app.config.globalProperties.$question = $question;
app.config.globalProperties.$success = $success;
app.config.globalProperties.$warning = $warning;
app.config.globalProperties.$makeSwal = $makeSwal;
app.config.globalProperties.$MemberInfo = new MemberInfo.MemberInfo(app);
