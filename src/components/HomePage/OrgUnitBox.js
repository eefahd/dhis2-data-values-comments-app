import React, { useContext } from 'react'

import { OrganisationUnitTree, CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'

import { orgUnitTree } from '../../App.module.css'
import AppContext from '../../context/app-context'

const rootOrgUnitQuery = {
    results: {
        resource: 'organisationUnits',
        params: () => ({
            level: '1',
            fields: 'id',
        }),
    },
}

const OrgUnitBox = () => {
    const { selectedOrgUnits, setSelectedOrgUnits } = useContext(AppContext)

    const { loading, error, data } = useDataQuery(rootOrgUnitQuery)
    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {
        return <CircularLoader />
    }

    const onChangeOrgUnitTreeSelection = e => {
        console.log(e.selected.map(item => item.split(/[\/ ]+/).pop()).join())
        setSelectedOrgUnits(e.selected)
    }

    const rootOrgUnits = data.results.organisationUnits.map(obj => obj.id)
    return (
        <div className={orgUnitTree}>
            <OrganisationUnitTree
                filter={[]}
                highlighted={[]}
                initiallyExpanded={[]}
                name="Root org unit"
                onChange={onChangeOrgUnitTreeSelection}
                roots={rootOrgUnits}
                selected={selectedOrgUnits}
            />
        </div>
    )
}

export default OrgUnitBox
