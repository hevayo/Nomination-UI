import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import {APPROVAL_STATE} from  './state/ElectionTypes';
import { getAllElectionReviews, getElectionReviewData,  onChangeApproval} from "./state/ElectionAction.js";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';//--
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Done from '@material-ui/icons/Done';
import classNames from 'classnames';
import Block from '@material-ui/icons/Block';
import moment from 'moment';


const drawerWidth = 240;



const styles = theme => ({
    root: {
        display: 'flex',
        margin: 20
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    left_icon: {
        marginLeft: theme.spacing.unit,
      },
      button: {
        margin: theme.spacing.unit,
      },
      green_button: {
        color: "darkgreen",
      },
      red_button: {
        color: "firebrick",
      },
});

class Dashboard extends React.Component {
    state = {
        open: true,
        nominations: [],
        activeElections:[]
    };


    componentDidMount() {
        const { allElectionModules, getAllElectionReviews,getElectionReviewData } = this.props;
        getAllElectionReviews();

        getElectionReviewData(this.props.location.state.id);
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    changeElectionStatus = (electionId, status) => {
        const {onChangeApproval} = this.props;
        onChangeApproval(electionId, status);
      };
      

    render() {
        const { classes, allElectionModules,ElectionReviewData } = this.props;
        var Authjority = ' ';
        var CalculationType = ' ';
        var WeightageVote = ' ';
        var WeightagePref = ' ';
        var NominationSubmissionBy = '';
        var CandidatePayment = '';
        (ElectionReviewData.electionConfig ? ElectionReviewData.electionConfig.map((record) => {
        //     testing = {
        //         Authjority : record.key==="2353453" ? record.value : " ",
        //     CalculationType : record.key==="15990459-2ea4-413f-b1f7-29a138fd7a97" ? record.value : " ",
        //     WeightageVote : record.key==="324324" ? record.value : " ",
        //     WeightagePref : record.key==="234433" ? record.value : " "
        // }
        //       testing = {
        //         Authjority : record.key==="2353453" ? record.value : " ",
        //     CalculationType : record.key==="15990459-2ea4-413f-b1f7-29a138fd7a97" ? record.value : " ",
        //     WeightageVote : record.key==="324324" ? record.value : " ",
        //     WeightagePref : record.key==="234433" ? record.value : " "
        // }
        if(record.key=="2353453"){
            Authjority = record.value
        }
        if(record.key=="15990459-2ea4-413f-b1f7-29a138fd7a97"){
            CalculationType = record.value
        }
        if(record.key=="324324"){
            WeightageVote = record.value
        }
        if(record.key=="234433"){
            WeightagePref = record.value
        }
        if(record.key=="1243123"){
            NominationSubmissionBy = record.value
        }
        if(record.key=="123213"){
            CandidatePayment = record.value
        }
        
        
         
           
    }): 
        setEmpty()
    );
    function setEmpty(string) {
            return {};
          }
    // setEmpty(){
    //     return {}
    // }

        //   var outputObj = { //create a new object with one default value
        //     time: {
        //         Authjority: ""
        //     }
        //   };
        //   ElectionReviewData.electionConfig.forEach(function(item) { //iterate the any array and then keep adding key and values to new Object
        //     outputObj[item] = {
        //         Authjority: capitalizeFirstLetter(item)
        //     };
        //   });
          
        //   function capitalizeFirstLetter(string) {
        //     return string.key==="2353453" ? string.value : "a";
        //   }

          console.log("outputObj",Authjority);
        

        // const test = ElectionReviewData.electionConfig ? ElectionReviewData.electionConfig.map((config) => (
           
            const test = (  <div>
            <Grid container spacing={24}>
                <Grid item xs={6} sm={3}>
                    <Typography className={classes.text_a} component="p">Authjority: { Authjority }</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.text_b} component="p">Calculation Type : { CalculationType  }</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.text_b} component="p">Weightage(%):Vote Based</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input id="common-name" value={ WeightageVote  } />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.text_b} component="p">Weightage(%):Preference Based</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input id="common-name" value={ WeightagePref  } />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={3}>
                    <Typography className={classes.text_b} component="p">Nomination Submission by</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12}>
                            <Typography className={classes.text_b} component="p">{NominationSubmissionBy}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                                    <Grid item xs={12} sm={3}>
                                        <Typography className={classes.text_b} component="p">Deposit Payment</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">Amount per nominee</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Input id="common-name" value={'(Rs.) ' + CandidatePayment} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
            </div>);

       
        
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <div style={{ width: '100%' }}>
                    <Typography variant="h5" component="h2">Election process review({ElectionReviewData.name})</Typography>
                    <br />
                    <div className={classes.container}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container spacing={24}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography className={classes.text_a} component="p">Election Type: {ElectionReviewData.moduleName}</Typography>
                                    </Grid>
                                </Grid>
                                 {test}
                                
                                
                                <br />
                                <hr />
                                <br />
                                <Typography className={classes.text_a} component="p"><b>Timeline</b></Typography>
                                <br />
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">Nomination Start Date</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="date"
                                                    // label="Birthday"
                                                    value={moment(ElectionReviewData.nominationStart).format('YYYY-MM-DD')}
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">Objection Start Date</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="date"
                                                    // label="Birthday"
                                                    type="date"
                                                    value={moment(ElectionReviewData.objectionStart).format('YYYY-MM-DD')}
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p"> Nomination End Date</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="date"
                                                    // label="Birthday"
                                                    value={moment(ElectionReviewData.nominationEnd).format('YYYY-MM-DD')}
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">Objection End Date </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="date"
                                                    // label="Birthday"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    value={moment(ElectionReviewData.objectionEnd).format('YYYY-MM-DD')}
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <Typography className={classes.text_a} component="p"><b>Eligibility</b> </Typography>
                                <br />
                                <br />
                                <Grid container spacing={24}>
                                    <Table className={classes.candidates_table}>
                                        <TableHead>
                                            <TableCell align="left">Eligibility(List)</TableCell>

                                            <TableCell align="left">Select</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow >
                                                <TableCell align="left">Minimum ae should be 35</TableCell>

                                                <TableCell align="left"><Checkbox
                                                    checked value={true} /></TableCell>
                                            </TableRow>

                                            <TableRow >
                                                <TableCell align="left">Another item</TableCell>

                                                <TableCell align="left"><Checkbox
                                                    value={true} /></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </Grid>
                                <br />
                                <Grid container spacing={24}>
                                    <Grid item xs={4} sm={1}>
                                        <Link to="/election-process-review" >
                                            <Button size="medium">Back</Button>
                                        </Link>
                                    </Grid>
                                    <Grid style={{marginRight:15}} item xs={4} sm={1}>
                                    <Button 
                                        variant={ ElectionReviewData.approval_status==="APPROVE" ? "contained" : "outlined" }
                                        disabled={ ElectionReviewData.approval_status==="APPROVE" }
                                        onClick={ () => { this.changeElectionStatus(ElectionReviewData.id, APPROVAL_STATE.APPROVE ) }}
                                        className={classNames(classes.button, classes.green_button)}>
                                        {ElectionReviewData.approval_status==="APPROVE" ? "Approved" : "Approve"}
                                        <Done className={classes.left_icon} />
                                    </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={1}>
                                    <Button
                                        variant={ ElectionReviewData.approval_status==="REJECT" ? "contained" : "outlined" }
                                        disabled={ ElectionReviewData.approval_status==="REJECT" }
                                        onClick={ () => { this.changeElectionStatus(ElectionReviewData.id, APPROVAL_STATE.REJECT ) }}
                                        className={classNames(classes.button, classes.red_button)}>
                                        {ElectionReviewData.approval_status==="REJECT" ? "Rejected" : "Reject"}
                                        <Block className={classes.left_icon} />
                                    </Button>
                                    </Grid>
                                    <Grid item xs="3">
                                </Grid>

                                </Grid>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
    const { allElectionModules } = Election;
    const { getElectionReviewData } = Election;
    const  ElectionReviewData  = Election.ElectionReviewData;

    

    return { allElectionModules,getElectionReviewData ,ElectionReviewData}
};

const mapActionsToProps = {
    getAllElectionReviews,
    getElectionReviewData,
    onChangeApproval,

};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dashboard));




