import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js"
import * as memeServices from "../api/memeServices.js"

const createTemplate = (onSubmit) => html`
        <section id="create-meme">
            <form @submit=${onSubmit} id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>`

export function createScreen(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)))
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(f => f == '')) {
        return alert('All fields are required')
    }
    await memeServices.create({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl
    }
    )
    event.target.reset()
    ctx.page.redirect('/')
}