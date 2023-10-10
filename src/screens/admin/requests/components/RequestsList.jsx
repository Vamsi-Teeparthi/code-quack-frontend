import { Person } from '@mui/icons-material'
import React from 'react'
import { timeFormat } from '../../../../utils/timeFormat'

const EachRequest = ({ key, data }) => {

    return (
        <div key={key} className="each-request-list-wrapper">
            <Person />
            <div className="request-info">
                <div className="requester-name-time">
                    <span className="requester-name">{data?.user?.name}</span>
                    <span className="requester-date">{timeFormat(data?.createdAt)}</span>
                </div>
                <div className="requesting-language">Requesting {data?.language} programming language</div>
                {data?.message &&
                    <div className="requesting-message">{data?.message}</div>
                }
            </div>
        </div>
    )
}

const RequestsList = ({ requests }) => {
    return (
        <div className='request-list-wrapper'>
            {requests && requests?.map((each) => (
                <EachRequest key={each?._id} data={each} />

            ))}
        </div>
    )
}

export default RequestsList