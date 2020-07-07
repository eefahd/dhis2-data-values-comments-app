import React, { useContext } from 'react'

import { SingleSelect, SingleSelectOption, CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'

import { dataSetListClass } from '../../App.module.css'
import AppContext from '../../context/app-context'

const dataSetQuery = {
    results: {
        resource: 'dataSets',
        params: () => ({
            paging: false,
            fields: ['id', 'displayName'],
        }),
    },
}

const DataSetList = () => {
    const { selectedDataSet, setSelectedDataSet } = useContext(AppContext)

    const { loading, error, data } = useDataQuery(dataSetQuery)

    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {
        return <CircularLoader />
    }

    const datasets = data.results.dataSets
    return (
        <div className={dataSetListClass}>
            <SingleSelect
                className="select"
                selected={selectedDataSet}
                onChange={e => setSelectedDataSet(e.selected)}
            >
                {datasets.map(dataset => (
                    <SingleSelectOption
                        key={dataset.id}
                        label={dataset.displayName}
                        value={dataset.id}
                    />
                ))}
            </SingleSelect>
        </div>
    )
}

export default DataSetList
