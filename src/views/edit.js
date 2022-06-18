import {html} from "../../node_modules/lit-html/lit-html.js"
import * as memeService from "../api/memeServices.js"
import { createSubmitHandler } from "../util.js";

const editTemplate = (meme, onSubmit) => html`
            <section id="edit-meme">
            <form @submit =${onSubmit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" value=${meme.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}></textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`

export async function editScreen(ctx) {
    const memeId = ctx.params.id;
    const meme  = await memeService.getById(memeId)

    ctx.render(editTemplate(meme, createSubmitHandler(ctx, onSubmit)))
}

async function onSubmit(ctx, data, event) {
    const memeId = ctx.params.id;

    if(Object.values(data).some( f => f == '')){
        return alert ('All fields are required')
    }
    await memeService.update(memeId,{
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl
      })
      event.target.reset()
      ctx.page.redirect('/details/' + memeId)
}