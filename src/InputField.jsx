import React from "react"
import {
    compose,
    withState,
    withHandlers,
    defaultProps
  } from "recompose"
import T from './types'

const getID = (() => {
    let next = 0;
    return () => next++
})()

const getRecord = text => (
    { id: getID(), text, done: false }
)

const component = ({ onChange, onSubmit, onKeyPress, value }) => (
    <div>
        <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="Add item"
        />
        <button onClick={onSubmit}>Add</button>
    </div>
)

const onSubmit = props => () => {
    props.updateValue('')
    props.onInput({ type: T.ADD, record: getRecord(props.value) })
}

const onChange = props => event =>
    props.updateValue(event.target.value)

const onKeyPress = props => event =>
    event.key === 'Enter' && onSubmit(props)()

export default compose(
    withState('value', 'updateValue', props => props.value),
    withHandlers({ onChange, onSubmit, onKeyPress }),
    defaultProps({ value: '' })
)(component)
