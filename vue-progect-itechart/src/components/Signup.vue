<template>
    <!-- <form @submit.prevent>
        Name: <input type="text" v-model="username"> <br/>
        Email: <input type="text" v-model="email"> <br/>
        Password: <input type="password" v-model="password"> <br/>
        <button @click="SignUp">Signup</button>
        {{error}}
    </form> -->
    <h1>Sign Up </h1>
<div id="wrapper">
	<form @submit.prevent id="signin" method="" action="" autocomplete="off">
		<input v-model="username" type="text" id="user" name="user" placeholder="username" />
        <input v-model="email" type="text" name="user" placeholder="email" />
		<input v-model="password" type="password" id="pass" name="pass" placeholder="password" />
		<button @click="SignUp" type="submit">&#xf0da;</button>
		<p>Login if you are registered <router-link to="/login">click here</router-link></p>
	</form>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            username: '',
            email: '',
            password: '',

            error: '',
        }
    },
    methods: {
        SignUp () {
            let newUser = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            axios.post('http://localhost:3000/signup', newUser).then(res => {
                console.log(res);
                this.error = '';
                this.$router.push('/login')
            }, err => {
                console.log(err.response);
                this.error = err.response.data.error;
            })
        }
    }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css');

*{
	font-family: 'Open Sans', 'sans-serif', 'FontAwesome';
}
body{
    background: rgb(52, 56, 61);
	padding: 80px;
}
h1{
	color: rgb(255, 255, 255);
	margin: 20px auto 0;
	width: 200px;
	text-align: center;
}
#wrapper{
	position: absolute;
	width: 320px;
	left: 50%;
	margin-left: -160px;
	top: 50%;
	margin-top: -75px;
}

/* === Sign in Form === */
#signin {
	height: 80px;
	width: 300px;
	border-radius: 8px;
	position: relative;
}

#signin::before {
	display: block;
	position: relative;
	height: 2px;
	background: rgb(52, 56, 61);
	content: '';
	top: 44px;
	margin-left: 20px;
	z-index: 1;
}

#signin::after {
	display: block;
	position: relative;
	height: 2px;
	background: rgb(52, 56, 61);
	content: '';
	top: -70px;
	margin-left: 20px;
	z-index: 1;
}



#signin input:first-of-type{
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
}
#signin input:last-of-type{
	border-bottom-right-radius: 8px;
	border-bottom-left-radius: 8px;
}
#signin::before input:last-of-type{
	display: block;
	position: relative;
	height: 2px;
	background: rgb(52, 56, 61);
	content: '';
	top: 44px;
	margin-left: 20px;
	z-index: 1;
}
#signin  input[type="text"], #signin  input[type="password"], #signin button[type="submit"]{
	background: rgb(28, 30, 33);
	box-shadow: inset -100px -100px 0 rgb(28, 30, 33); /*Prevent yellow autofill color*/
	color: rgb(52, 56, 61);
}
#signin  input[type="text"], #signin  input[type="password"]{
	position: relative;
	display: block;
	width: 280px;
	height: 45px;
	border: 0;
	outline: 0;
	top: -2px;
	padding: 0 0 0 20px;
	font-weight: 700;
}

#signin  input[type="text"]:focus, #signin  input[type="password"]:focus{
	color: rgb(255, 255, 255);
}
#signin button[type="submit"]{
	display: block;
	position: absolute;
	width: 52px;
	height: 52px;
	color: rgb(52, 56, 61);
	border-radius: 50px;
	outline: 0;
	z-index: 2;
	top: 40px;
	right: -24px;
	border: 6px solid rgb(52, 56, 61);
	font-size: 25px;
	text-indent: 0px;
	padding-left: 9px;
	padding-bottom: 3px;
	text-align: center;
}
#signin button[type="submit"]:hover{
	color: rgb(0, 126, 165);
	text-shadow: 0 0 10px rgb(0, 126, 165);
	cursor: pointer;
}
#signin p {
	color: rgb(79, 85, 97);
	padding: 0 20px;
	font-weight: 700;
	font-size: 12px;
	margin: 5px 0 0 0;
}
#signin p > a{
	color: rgb(111, 119, 135);
	text-decoration: none;
}
#signin p > a:hover{
	border-bottom: 1px solid;
}
</style>
