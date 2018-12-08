import React from "react"
import T from './types';

const Filters = ({ onChange, value = T.ALL }) => (
    <fieldset id="filters-group">
        <label>
            <input
                type="radio"
                name="filters-group"
                defaultChecked={value === T.ALL}
                onChange={() => onChange(T.ALL)}
            /> All
        </label>
        <label>
            <input
                type="radio"
                name="filters-group"
                defaultChecked={value === T.DONE}
                onChange={() => onChange(T.DONE)}
            /> Completed
        </label>
        <label>
            <input
                type="radio"
                name="filters-group"
                defaultChecked={value === T.NEW}
                onChange={() => onChange(T.NEW)}
            /> New
        </label>
    </fieldset>
)

export default Filters