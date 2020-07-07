import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'

import { Navigation } from './components/Navigation'
import HomePage from './components/HomePage/HomePage'
import FollowupPage from './components/FollowupPage/FollowupPage'

const BatchEventCaptureApp = () => (
    <BrowserRouter>
        <div className={classes.container}>
            <div className={classes.left}>
                <Navigation />
            </div>

            <div className={classes.right}>
                <Switch>
                    <Route exact path="/followup" component={FollowupPage} />

                    <Route exact path="/" component={HomePage} />
                </Switch>
            </div>
        </div>
    </BrowserRouter>
)

export default BatchEventCaptureApp
