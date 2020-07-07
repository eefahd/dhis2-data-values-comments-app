import { Menu, MenuItem } from '@dhis2/ui'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

const NavigationItem = ({ path, label }) => {
    const history = useHistory()

    const routeMatch = useRouteMatch(path)
    const isActive = routeMatch?.isExact

    const onClick = () => !isActive && history.push(path)

    return <MenuItem label={label} active={isActive} onClick={onClick} />
}

NavigationItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}

export const Navigation = () => (
    <aside>
        <Menu>
            <NavigationItem label="Home" path="/" />

            <NavigationItem label="Follow-up" path="/followup" />
        </Menu>
    </aside>
)
