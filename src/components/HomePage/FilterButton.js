import React, { useContext } from 'react'

import { Button } from '@dhis2/ui'

import { filterButton } from '../../App.module.css'
import AppContext from '../../context/app-context'

const FilterButton = () => {
    const {
        selectedOrgUnits,
        selectedDataSet,
        setShowAlert,
        setAlertMessage,
        refetch,
    } = useContext(AppContext)

    const onClickGetComments = () => {
        console.log(selectedOrgUnits)
        console.log(selectedDataSet)
        if (!selectedDataSet || !selectedOrgUnits.length) {
            setAlertMessage(
                'Please select valid dataset and organisation units!'
            )
            setShowAlert(true)
        } else {
            refetch({
                orgUnits: selectedOrgUnits
                    .map(item => item.split(/[\/ ]+/).pop())
                    .join(),
                dataSets: selectedDataSet,
            })
        }
    }

    return (
        <div className={filterButton}>
            <Button
                name="Filter button"
                onClick={onClickGetComments}
                type="button"
                className={filterButton}
            >
                Get Comments
            </Button>
        </div>
    )
}

export default FilterButton
