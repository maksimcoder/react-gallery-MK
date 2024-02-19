import { FavouritesPage } from "../pages/FavouritesPage";
import { MainPage } from "../pages/MainPage";

export const routes = {
    '/': MainPage,
    '/favourites': FavouritesPage
}

export const navigationRoutes = {
    'Main': '/',
    'Favourites': '/favourites'
}