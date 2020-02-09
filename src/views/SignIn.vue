<template>
    <div class="sign-in-wrap">
        <div class="logo">
            <img src="../assets/images/logo_itm.png" alt="logo">
        </div>
        <div class="sign-in-form">
            <div class="form-headline">
                <h3>АВТОРИЗАЦИЯ</h3>
                <p>Войдите в учетную запись агента</p>
            </div>
            <div class="sign-in-content">
                <div class="login-wrap">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.70312 12.1406C5.54688 11.3906 7.3125 11.0156 9 11.0156C10.6875 11.0156 12.4375 11.3906 14.25 12.1406C16.0938 12.8594 17.0156 13.8125 17.0156 15V17.0156H0.984375V15C0.984375 13.8125 1.89062 12.8594 3.70312 12.1406ZM11.8125 7.82812C11.0312 8.60938 10.0938 9 9 9C7.90625 9 6.96875 8.60938 6.1875 7.82812C5.40625 7.04688 5.01562 6.10938 5.01562 5.01562C5.01562 3.92188 5.40625 2.98438 6.1875 2.20312C6.96875 1.39062 7.90625 0.984375 9 0.984375C10.0938 0.984375 11.0312 1.39062 11.8125 2.20312C12.5938 2.98438 12.9844 3.92188 12.9844 5.01562C12.9844 6.10938 12.5938 7.04688 11.8125 7.82812Z" fill="#1F2041" fill-opacity="0.5"/>
                    </svg>
                    <label class="" for="login">Логин</label>
                    <input type="text" id="login" :class="['',{'white-back':fields.email == ''}]" placeholder="Введите ваш логин" v-model.trim="$v.fields.email.$model"/>
                    <div class="error-text" v-if="$v.fields.email.$error">Логин обязателен.</div>
                </div>
                <div class="password-wrap">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 20.0156V9.98438H3V20.0156H15ZM15 8.01562C15.5312 8.01562 16 8.21875 16.4062 8.625C16.8125 9 17.0156 9.45312 17.0156 9.98438V20.0156C17.0156 20.5469 16.8125 21.0156 16.4062 21.4219C16 21.7969 15.5312 21.9844 15 21.9844H3C2.46875 21.9844 2 21.7969 1.59375 21.4219C1.1875 21.0156 0.984375 20.5469 0.984375 20.0156V9.98438C0.984375 9.45312 1.1875 9 1.59375 8.625C2 8.21875 2.46875 8.01562 3 8.01562H12.0938V6C12.0938 5.15625 11.7812 4.4375 11.1562 3.84375C10.5625 3.21875 9.84375 2.90625 9 2.90625C8.15625 2.90625 7.42188 3.21875 6.79688 3.84375C6.20312 4.4375 5.90625 5.15625 5.90625 6H3.98438C3.98438 4.625 4.46875 3.45312 5.4375 2.48438C6.4375 1.48438 7.625 0.984375 9 0.984375C10.375 0.984375 11.5469 1.48438 12.5156 2.48438C13.5156 3.45312 14.0156 4.625 14.0156 6V8.01562H15ZM10.4062 16.4062C10 16.8125 9.53125 17.0156 9 17.0156C8.46875 17.0156 8 16.8125 7.59375 16.4062C7.1875 16 6.98438 15.5312 6.98438 15C6.98438 14.4688 7.1875 14 7.59375 13.5938C8 13.1875 8.46875 12.9844 9 12.9844C9.53125 12.9844 10 13.1875 10.4062 13.5938C10.8125 14 11.0156 14.4688 11.0156 15C11.0156 15.5312 10.8125 16 10.4062 16.4062Z" fill="#1F2041" fill-opacity="0.5"/>
                    </svg>
                    <label class="" for="password">Пароль</label>
                    <input type="password" id="password" :class="['',{'white-back':fields.password == ''}]" placeholder="Введите ваш пароль" v-model.trim="$v.fields.password.$model"/>
                    <div class="error-text" v-if="$v.fields.password.$error">Пароль обязателен.</div>
                </div>
                <div class="login-btn">
                    <button type="submit" @click.prevent="signIn">Войти</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    import * as types from "@/stores/modules/auth/types";

    export default {
        name: "SignIn",
        data() {
            return {
                fields: {
                    email: "",
                    password: ""
                }
            }
        },
        validations: {
            fields: {
                email: {
                    required
                },
                password: {
                    required
                },
            }
        },
        methods: {
            signIn() {
                this.$store.dispatch("auth/" + types.A_LOGIN, this.fields)
                    .then(res => {
                        this.$router.push('/dashboard');
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sign-in-wrap{
        width: 100%;
        min-height: 100vh;
        background-color: #eeeeee;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 55px 0;

        .logo{
            margin-bottom: 30px;
        }
        .sign-in-form{
            width: 400px;
            background-color: #ffffff;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            padding-top: 42px;

            .form-headline{
                h3{
                    color: #3A3B58;
                    font-size: 18px;
                    font-family: "Montserrat";
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 3px;
                }
                p{
                    font-size: 12px;
                    color: #6B6B81;
                    text-align: center;
                    margin-bottom: 5px;
                    font-family: "Montserrat";
                }
            }
            .sign-in-content{
                padding: 38px 30px 31px;

                .login-wrap, .password-wrap{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    padding-bottom: 17px;

                    label{
                        color: #3A3B58;
                        font-weight: bold;
                        font-size: 12px;
                        text-transform: uppercase;
                        font-family: "Montserrat";
                        margin-bottom: 5px;
                    }
                    input{
                        background-color: #E8F0FE;
                        padding: 8px 16px 8px 44px;
                        font-size: 12px;
                        line-height: 24px;
                        border: 1px solid rgba(31, 32, 65, 0.5);
                        border-radius: 4px;
                        outline: none;
                        margin-bottom: 5px;
                        font-family: "Montserrat";

                        &.white-back{
                            background-color: white;
                        }
                    }
                    svg{
                        position: absolute;
                        top: 35px;
                        left: 14px;
                        font-size: 20px;
                        color: #999;
                    }
                    .error-text{
                        position: absolute;
                        bottom: 3px;
                        left: 0;
                        color: red;
                        font-size: 12px;
                        font-family: "Montserrat";
                    }
                }

                .password-wrap{
                    padding-bottom: 50px;
                    svg{
                        top: 32px;
                    }
                    .error-text{
                        bottom: 35px;
                    }
                }

                .login-btn button{
                    width: 100%;
                    color: #fff;
                    background-color: #4CD964;
                    font-size: 12px;
                    font-weight: bold;
                    text-transform: uppercase;
                    line-height: 24px;
                    padding: 10px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    outline: none;
                    font-family: "Montserrat";
                }
            }
        }
    }
</style>