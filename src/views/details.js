import {html, nothing} from "../../node_modules/lit-html/lit-html.js"
import * as memeService from '../api/memeServices.js'

const detailsTemplate = (meme, onDelete) => html`
  <section id="meme-details">
            <h1>Meme Title: ${meme.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${meme.description}
                    </p>

                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    ${meme.isOwner 
                    ?html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button  @click=${onDelete} href="javascript:void(0)" class="button danger">Delete</button>`
                    : nothing}
                    
                    
                </div>
            </div>
        </section>

        `

export async function detailsScreen(ctx) {
    const memeId = ctx.params.id
    const meme = await memeService.getById(memeId)

    if (ctx.user) {
        meme.isOwner = ctx.user._id == meme._ownerId;
    }
    ctx.render(detailsTemplate(meme, onDelete))
    

    async function onDelete() {
       let choice = confirm(`Are you sure you want to delete ${meme.title}`)
       if (choice) {
         await memeService.deleteById(memeId)
         ctx.page.redirect('/')
       } 
    }
}