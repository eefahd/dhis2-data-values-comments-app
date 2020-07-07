import React from 'react'

import OrgUnitBox from './OrgUnitBox'
import DataSetList from './DataSetList'
import FilterButton from './FilterButton'

import {
    filterBoxContainer,
    filterBoxItemsContainer,
} from '../../App.module.css'

const FilterBar = () => {
    return (
        <div className={filterBoxContainer}>
            <div className={filterBoxItemsContainer}>
                <OrgUnitBox />
                <DataSetList />
                <FilterButton />
            </div>
        </div>
    )
}

export default FilterBar
