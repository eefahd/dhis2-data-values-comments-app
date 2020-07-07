import React, { useState, useEffect } from 'react'

import {
    AlertStack,
    AlertBar,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import * as classes from '../../App.module.css'

import { useDataQuery } from '@dhis2/app-runtime'

import CommentsTable from '../CommentsTable/CommentsTable'
import FilterBar from './FilterBar'

import AppContext from '../../context/app-context'

const commentsListQuery = {
    results: {
        resource: 'dataValueSets',
        params: ({ orgUnits, dataSets }) => ({
            orgUnit: orgUnits,
            startDate: '1990',
            endDate: '2050',
            dataSet: dataSets,
        }),
    },
}

const HomePage = () => {
    const [selectedOrgUnits, setSelectedOrgUnits] = useState([])
    const [selectedDataSet, setSelectedDataSet] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const { loading, error, data, refetch } = useDataQuery(commentsListQuery, {
        variables: { orgUnits: '', dataSets: '' },
        lazy: true,
    })

    useEffect(() => {
        if (error) {
            setAlertMessage(error.message)
            setShowAlert(true)
        }
    }, [error])

    return (
        <>
            <AppContext.Provider
                value={{
                    selectedOrgUnits,
                    setSelectedOrgUnits,
                    selectedDataSet,
                    setSelectedDataSet,
                    setShowAlert,
                    setAlertMessage,
                    refetch,
                }}
            >
                <div className={classes.tableContainer}>
                    <FilterBar />
                    {loading ? (
                        <CenteredContent>
                            <CircularLoader />
                        </CenteredContent>
                    ) : (
                        data &&
                        data.results.dataValues && (
                            <CommentsTable
                                comments={data.results.dataValues.filter(
                                    item => !!item.comment
                                )}
                                refetch={refetch}
                                setAlertMessage={setAlertMessage}
                                setShowAlert={setShowAlert}
                            />
                        )
                    )}
                    {/* <PaginationControls pager={data.results.pager} refetch={refetch} /> */}
                </div>
            </AppContext.Provider>
            {showAlert && (
                <AlertStack>
                    <AlertBar
                        duration={8000}
                        icon
                        warning
                        onHidden={() => setShowAlert(false)}
                    >
                        {alertMessage}
                    </AlertBar>
                </AlertStack>
            )}
        </>
    )
}

export default HomePage
