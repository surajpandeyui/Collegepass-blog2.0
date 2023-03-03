import Router, { useRoouter } from 'next/router';

import React, { useEffect } from 'react'

const CollegeAdmission = () => {
    useEffect(() => {
        Router.push('ivy-league-undergraduate-admissions');
    }, [])
    return (
        <div>
            College Admission
        </div>
    )
}

export default CollegeAdmission
