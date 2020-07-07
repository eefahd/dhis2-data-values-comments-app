import React, { useState, useEffect } from 'react'
import { Switch } from '@dhis2/ui'

const FollowupButton = ({ refetch, cocQuery, mutate, data }) => {
    const [dataFetched, setDataFetched] = useState(true)

    const onClickFollowUp = () => {
        var coc = null
        setDataFetched(false)
        if (data.categoryOptionCombo) {
            coc = data.categoryOptionCombo
        }
        if (data.attributeOptionCombo) {
            cocQuery.refetch({ id: data.attributeOptionCombo })
        } else {
            mutate({
                ou: data.orgUnit,
                de: data.dataElement,
                pe: data.period,
                co: coc,
                cc: null,
                cp: null,
                comment: data.comment,
                followUp: true,
            }).then(refetch)
        }
    }

    useEffect(() => {
        if (!cocQuery.loading && !dataFetched && cocQuery.data) {
            // console.log(cocQuery.data)
            // console.log(data.orgUnit)
            // console.log(data.dataElement)
            // console.log(data.period)
            // console.log(data.categoryOptionCombo)
            // console.log(cocQuery.data.results.categoryCombo.id)
            setDataFetched(true)

            mutate({
                ou: data.orgUnit,
                de: data.dataElement,
                pe: data.period,
                co: data.categoryOptionCombo,
                cc: cocQuery.data.results.categoryCombo.id,
                cp: cocQuery.data.results.categoryOptions
                    .map(item => item.id)
                    .join(';'),
                comment: data.comment,
                followUp: true,
            }).then(refetch)
        }
    }, [cocQuery.loading])

    return (
        <Switch
            checked={data.followup}
            className="initially-focused"
            initialFocus
            name="followup"
            onChange={onClickFollowUp}
            value={data.followup.toString()}
        />
    )
}

export default FollowupButton
