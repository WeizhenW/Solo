import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    tableHeader: {
        fontSize: '16px',
        backgroundColor: 'black',
        color: 'white',
    },
    tableBody: {
        fontSize: '14px',
    },
    button: {
        fontSize: '10px',
    }
}

class NewJobList extends Component {
    componentDidMount() {
        //list of jobs with status = new
        this.props.dispatch({ type: 'FETCH_NEW_JOBS_LIST' });
        //fetch full list of status
        this.props.dispatch({
            type: 'FETCH_ALL_STATUS',
        });
    }

    //get input and dispatch the update action immediately
    handleChange = (job) => (event) => {

        this.props.dispatch({
            type: 'UPDATE_JOB_STATUS',
            payload: {
                status_id: event.target.value,
                job_id: job.id
            },
        })
    }

    //function to delete job
    handleDelete = (job) => {
        this.props.dispatch({
            type: 'DELETE_JOB',
            payload: job,
        })
    }

    //function to get job details for one job
    handleGetDetail = (job) => {
        this.props.history.push(`/job-list/detail/${job.id}`)
    }

    render() {
        return (
            <div>
                <pre>
                    {/* {JSON.stringify(this.props.reduxState.jobList.newJobsListReducer, null, 2)} */}
                    {/* {JSON.stringify(this.state, null, 2)} */}
                </pre>

                <Table style={styles.table}>
                    
                    <TableHead>
                        <TableRow >
                            <TableCell style={styles.tableHeader} >Job Title</TableCell>
                            <TableCell style={styles.tableHeader}>Company</TableCell>
                            <TableCell style={styles.tableHeader} >Post URL</TableCell>
                            <TableCell style={styles.tableHeader}>Status</TableCell>
                            <TableCell style={styles.tableHeader}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxState.jobList.newJobsListReducer.map(job => <TableRow key={job.id}>
                            <TableCell style={styles.tableBody}><Link to={`/job-list/detail/${job.id}`} >{job.title}</Link></TableCell>
                            <TableCell style={styles.tableBody}>{job.company}</TableCell>
                            <TableCell style={styles.tableBody}><a href={job.post_url}>Go to the post</a></TableCell>
                            <TableCell style={styles.tableBody}>
                                <Select
                                    id="status"
                                    name="status"
                                    displayEmpty
                                    value={job.status_id}
                                    onChange={this.handleChange(job)}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.props.status.map(status => <MenuItem key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                </Select>                               
                            </TableCell>
                            <TableCell style={styles.tableBody}><Button style={styles.button} variant="contained" onClick={() => this.handleDelete(job)}>Delete</Button></TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
    status: reduxState.status,
})
export default connect(mapReduxStateToProps)(NewJobList);