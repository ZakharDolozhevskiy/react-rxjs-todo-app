import React from "react"
import { Observable } from "rxjs"
import { createEventHandler, componentFromStream } from "recompose"

import Input from './InputField.jsx'
import TodoList from './TodoList'
import T from './types'

const App = componentFromStream(props$ => {
    const {
        stream: onInput$,
        handler: onInput
    } = createEventHandler()

    const {
        stream: onDelete$,
        handler: onDelete
    } = createEventHandler()

    const {
        stream: onToggle$,
        handler: onToggle
    } = createEventHandler()

    const actionHandler = (records, action) => {
        if (action.type === T.ADD) {
            records = records.concat(action.record)
        }
        if (action.type === T.DELETE) {
            records = records.filter(record => record.id != action.id)
        }
        if (action.type === T.TOGGLE) {
            let record = records.find(r => r.id === action.id)
            record.done = !record.done
        }
        return records
    }

    return Observable.combineLatest(
        props$,
        Observable.merge(onInput$, onDelete$, onToggle$, 3)
            .startWith([])
            .scan(actionHandler),
        (_, records) => (
            <section>
                <Input
                    onInput={onInput}
                />
                <TodoList
                    records={records}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            </section>
        )
    )
})

export default App