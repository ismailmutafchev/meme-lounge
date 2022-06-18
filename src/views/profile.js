import { html } from "../../node_modules/lit-html/lit-html.js"
import * as memeService from '../api/memeServices.js'

const profileTemplate = (user, memes) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            <!-- Display : All created memes by this user (If any) -->
            ${memes.length > 0
                ?memes.map(x => memeTemplate(x))
                :html`<p class="no-memes">No memes in database.</p>`}
            <!-- Display : If user doesn't have own memes  -->
        </div>
    </section>`

const memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`

export async function profileScreen(ctx) {
    const user = ctx['user']
    const userId = ctx.user._id
    const userMemes = await memeService.getUserMemes(userId)
    ctx.render(profileTemplate(user, userMemes))

    // ctx.render(detailsTemplate(meme, onDelete))


    // async function onDelete() {
    //    let choice = confirm(`Are you sure you want to delete ${meme.title}`)
    //    if (choice) {
    //      await memeService.deleteById(memeId)
    //      ctx.page.redirect('/')
    //    } 
    // }
}
