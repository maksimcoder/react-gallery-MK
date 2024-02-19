import { BrowserRouter, Switch, Route } from "react-router-dom";
import { navigationRoutes, routes } from "./routes";
import { NavLink } from "react-router-dom";
import styles from './Navigation.module.scss';
import { MainPage } from "../pages/MainPage";
import { FavouritesPage } from "../pages/FavouritesPage";

export const Router = () => {
    const mappedNavigation = Object.entries(navigationRoutes).map(([routeName, path]) => {
        return (
            <li key={routeName} className={styles.listItem}>
                <NavLink to={path}>{routeName}</NavLink>
            </li>
        )
    })

    const mappedRoutes = Object.entries(routes).map(([path, Component]) => {
        const exact = path !== '/favourites';
        return (
            <Route exact={exact} key={path} path={path}>
                <Component />
            </Route>
        )
    });

    return (
        <BrowserRouter>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {mappedNavigation}
                </ul>
            </nav>
            <Switch>
                {mappedRoutes}
            </Switch>
        </BrowserRouter>
    )
}