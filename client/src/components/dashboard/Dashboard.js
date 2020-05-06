import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {getCurrentProfile} from '../../actions/profile'

function Dashboard({auth, profile, getCurrentProfile}) {
   
    useEffect(()=>{
        getCurrentProfile();
    }, [])
    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
auth: store.auth,
profile: store.profile
})

const mapDispatchToProps = {
    getCurrentProfile
}

export default connect(mapStateToProps,mapDispatchToProps) (Dashboard);

