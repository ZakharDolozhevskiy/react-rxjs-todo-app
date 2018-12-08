import React from "react"

const TodoItem = ({ record, onToggle, onDelete }) => (
    <li>
        <span onClick={onToggle} style={{ textDecoration: record.done ? 'line-through' : 'none' }}>
            {record.text}
        </span>
        <strong onClick={onDelete}> (X) </strong>
    </li>
)

export default TodoItem