import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailsPage} from './pages/DetailsPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthentificated => {
    if(isAuthentificated){
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage></LinksPage>
                </Route>
                <Route path="/create" exact>
                    <CreatePage></CreatePage>
                </Route>
                <Route path="/detail/:id">
                    <DetailsPage></DetailsPage>
                </Route>
                <Redirect to="/create"></Redirect>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage></AuthPage>
            </Route>
            <Redirect to="/"></Redirect>
        </Switch>
    )
}