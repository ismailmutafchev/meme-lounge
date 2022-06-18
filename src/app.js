import page from "../node_modules/page/page.mjs";

import { logout } from "./api/usersService.js";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";

import { catalogScreen } from "./views/catalog.js";
import { createScreen } from "./views/create.js";
import { detailsScreen } from "./views/details.js";
import { editScreen } from "./views/edit.js";
import { homeScreen } from "./views/home.js";
import { loginScreen } from "./views/login.js";
import { profileScreen } from "./views/profile.js";
import { registerScreen } from "./views/register.js";

page(addSession)
page(addRender)

page('/catalog',catalogScreen)
page('/',homeScreen)
page('/create/',createScreen)
page('/profile/',profileScreen)
page('/register',registerScreen)
page('/login',loginScreen)
page('/edit/:id',editScreen)
page('/logout',onLogout)
page('/details/:id', detailsScreen)


page.start()

function onLogout(ctx) {
    logout()
    ctx.page.redirect('/')
}