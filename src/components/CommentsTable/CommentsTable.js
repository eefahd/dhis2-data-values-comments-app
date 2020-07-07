import React, { useEffect } from 'react'
import {
    ButtonStrip,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
} from '@dhis2/ui'

import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'

import FollowupButton from './FollowupButton'
import { tableCellRight } from '../../App.module.css'

const categoryOptionCombosQuery = {
    results: {
        resource: 'categoryOptionCombos',
        id: ({ id }) => id,
        params: {
            fields: 'categoryCombo,categoryOptions',
        },
    },
}

const mutation = {
    resource: 'dataValues',
    type: 'create',
    params: ({ ou, de, pe, co, cc, cp, comment, followUp }) => ({
        ou: ou,
        de: de,
        pe: pe,
        co: co,
        cc: cc,
        cp: cp,
        comment: comment,
        followUp: followUp,
    }),
}

const CommentsTable = ({
    comments,
    refetch,
    setAlertMessage,
    setShowAlert,
}) => {
    const [mutate, { error }] = useDataMutation(mutation)

    const cocQuery = useDataQuery(categoryOptionCombosQuery, {
        variables: { id: '' },
        lazy: true,
    })

    useEffect(() => {
        if (error) {
            setAlertMessage(error.message)
            setShowAlert(true)
        }
    }, [error])

    useEffect(() => {
        if (cocQuery.error) {
            setAlertMessage(cocQuery.error.message)
            setShowAlert(true)
        }
    }, [cocQuery.error])

    return (
        <>
            {comments && (
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>OrgUnit</TableCellHead>
                            <TableCellHead>Period</TableCellHead>
                            <TableCellHead>Data Element</TableCellHead>
                            <TableCellHead>Value</TableCellHead>
                            <TableCellHead>Comment</TableCellHead>
                            <TableCellHead>User</TableCellHead>
                            <TableCellHead>Last Updated</TableCellHead>
                            <TableCellHead className={tableCellRight}>
                                Follow Up
                            </TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{comment.orgUnit}</TableCell>
                                <TableCell>{comment.period}</TableCell>
                                <TableCell>{comment.dataElement}</TableCell>
                                <TableCell>{comment.value}</TableCell>
                                <TableCell>{comment.comment}</TableCell>
                                <TableCell>{comment.storedBy}</TableCell>
                                <TableCell>
                                    {!!comment.lastUpdated &&
                                        new Date(
                                            comment.lastUpdated
                                        ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <ButtonStrip end>
                                        <FollowupButton
                                            cocQuery={cocQuery}
                                            refetch={refetch}
                                            data={comment}
                                            mutate={mutate}
                                        />
                                    </ButtonStrip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}

export default CommentsTable
