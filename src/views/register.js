import {html} from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js"
import * as userService from '../api/usersService.js'

const registerTemplate = (onSubmit) => html`
       <section id="register">
            <form @submit=${onSubmit} id="register-form">
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>`

export function registerScreen(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx,onSubmit)))
}
async function onSubmit(ctx,data,event) {
    if (!data.email || !data.password) {
        return alert('All Fields are required')
    }
    if (data.password != data['repeatPass']) {
        return alert('Passwords don\'t match!')
    }
    await userService.register(data.email, data.password)
    event.target.reset()
    ctx.page.redirect('/')
}