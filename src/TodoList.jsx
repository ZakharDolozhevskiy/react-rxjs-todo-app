import React from "react"
import { mapPropsStream, createEventHandler } from "recompose"
import Filters from './Filter'
import TodoItem from './TodoItem'
import T from './types'

const TodoList = ({ activeFilter, onFilterChange, onDelete, onToggle, records }) => (
    <section>
        <Filters value={activeFilter} onChange={onFilterChange} />
        <ul>
            {records.map((record, index) =>
                <TodoItem
                    key={index}
                    record={record}
                    onDelete={() => onDelete({ type: T.DELETE, id: record.id })}
                    onToggle={() => onToggle({ type: T.TOGGLE, id: record.id })}
                />
            )}
        </ul>
    </section>
)

export default mapPropsStream(props$ => {
    const {
        stream: onFilterChange$,
        handler: onFilterChange
    } = createEventHandler()

    const filters = {
        [T.ALL]: r => r,
        [T.DONE]: r => r.done,
        [T.NEW]: r => !r.done,
    }

    return props$.combineLatest(
        onFilterChange$.startWith(T.ALL),
        (props, activeFilter) => ({
            ...props,
            activeFilter,
            onFilterChange,
            records: props.records.filter(filters[activeFilter])
        })
    )
})(TodoList)
