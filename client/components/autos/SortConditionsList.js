import React from 'react'
import classNames from 'classnames'

function handleClick(hideFilterPopover, dispatch, item) {
    dispatch({type: 'autos/saveFilterCondition', payload: { field: 'sort', value: item.id }})
    hideFilterPopover()
}

function SortConditionsList({ styles, data, selectedConditions, hideFilterPopover, dispatch }) {
    const condition = selectedConditions.filter(item => item.field === 'sort')[0].value
    const cx = (item) => classNames({[styles['sort-list-item']]: true, [styles['sort-list-item-active']]: item.id === condition})
    return (
        <ul className={styles['sort-list']}>
            {
                data.map(item => (
                    <li key={item.id} className={cx(item)} onClick={() => handleClick(hideFilterPopover, dispatch, item)}>{item.name}</li>
                ))
            }
        </ul>
    )
}

export default SortConditionsList
