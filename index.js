import React from "react"
import { render } from "react-dom"
import config from "recompose/rxjsObservableConfig"
import { setObservableConfig } from "recompose"
import App from './src/App.jsx';

setObservableConfig(config)
render(<App />, document.getElementById("app"))
