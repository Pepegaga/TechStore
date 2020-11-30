import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'

const Comments = ({ syncComments }) => {
    return syncComments.map((post) => <Comment comment={post} key={post.id} />)
}

const mapStateToProps = (state) => {
    return {
        syncComments: state.comments.comments,
    }
}

export default connect(mapStateToProps, null)(Comments)
