import React, { useEffect, useState } from 'react'
import RequestsList from './components/RequestsList'
import { getRequests } from '../../../services/api/request'

const Requests = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchRequests = () => {
        setLoading(true)
        getRequests()
            .then((res) => {
                setRequests(res?.data?.requests)
            }).catch((err) => {

            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchRequests()
    }, [])
    return (
        <div className='main-content-page home-screen-wrapper requests-pages-wrapper'>
            {loading ? <div className='loading-wrapper'>Loading ...</div> :
                <>
                    <div className="home-header">
                        <span className="name">Requests from users</span>
                        <span className="name">Total Requests : {requests?.length}</span>
                    </div>
                    <RequestsList requests={requests} />
                </>}

        </div>
    )
}

export default Requests