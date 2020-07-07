import React, { useState, useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import {
    CenteredContent,
    CircularLoader,
    AlertStack,
    AlertBar,
} from '@dhis2/ui'

import * as classes from '../../App.module.css'

import CommentsTable from '../CommentsTable/CommentsTable'

const orgUnitGroupsListQuery = {
    results: {
        resource: 'organisationUnitGroups',
        params: {
            paging: false,
            fields: ['id'],
        },
    },
}

const dataSetListQuery = {
    results: {
        resource: 'dataSets',
        params: {
            paging: false,
            fields: ['id'],
        },
    },
}

const commentsListQuery = {
    results: {
        resource: 'dataValueSets',
        params: ({ orgUnitGroups, dataSets, startDate, endDate }) => ({
            orgUnitGroup: orgUnitGroups,
            startDate: startDate,
            endDate: endDate,
            dataSet: dataSets,
        }),
    },
}

export const FollowupPage = () => {
    const nowDate = new Date().toISOString().substring(0, 10)
    const beforeXDaysDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const orgUnitGroupsDataQuery = useDataQuery(orgUnitGroupsListQuery)
    const dataSetsDataQuery = useDataQuery(dataSetListQuery)
    const { loading, error, data, refetch } = useDataQuery(commentsListQuery, {
        variables: { orgUnitGroups: '', dataSets: '' },
        lazy: true,
    })
    console.log(nowDate)
    console.log(beforeXDaysDate)
    useEffect(() => {
        if (error) {
            setAlertMessage(error.message)
            setShowAlert(true)
        }
        if (
            orgUnitGroupsDataQuery.data &&
            orgUnitGroupsDataQuery.data.results.organisationUnitGroups &&
            !!orgUnitGroupsDataQuery.data.results.organisationUnitGroups
                .length &&
            dataSetsDataQuery.data &&
            dataSetsDataQuery.data.results.dataSets &&
            !!dataSetsDataQuery.data.results.dataSets.length
        ) {
            refetch({
                orgUnitGroups: orgUnitGroupsDataQuery.data.results.organisationUnitGroups
                    .map(obj => obj.id)
                    .join(),
                dataSets: dataSetsDataQuery.data.results.dataSets
                    .map(obj => obj.id)
                    .join(),
                startDate: beforeXDaysDate,
                endDate: nowDate,
            })
        }
    }, [orgUnitGroupsDataQuery.data, dataSetsDataQuery.data])

    useEffect(() => {
        if (error) {
            setAlertMessage(error.message)
            setShowAlert(true)
        }
    }, [error])

    return (
        <>
            <div className={classes.tableContainer}>
                {loading ||
                orgUnitGroupsDataQuery.loading ||
                dataSetsDataQuery.loading ? (
                    <CenteredContent>
                        <CircularLoader />
                    </CenteredContent>
                ) : (
                    data &&
                    data.results.dataValues && (
                        <CommentsTable
                            comments={data.results.dataValues.filter(
                                item => !!item.comment && item.followup
                            )}
                            refetch={refetch}
                            setAlertMessage={setAlertMessage}
                            setShowAlert={setShowAlert}
                        />
                    )
                )}
            </div>
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

export default FollowupPage
