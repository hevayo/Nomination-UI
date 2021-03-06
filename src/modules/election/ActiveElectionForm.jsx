import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ElectionTimeLine from '../../components/ElectionTimeLine/ElectionTimeLine';
import ElectionPayment from '../../components/ElectionPayment/ElectionPayment';
import ElectionWeightage from '../../components/ElectionWeightage/ElectionWeightage';
import AllowNomination from './AllowNomination';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NotifierRedux from '../../components/Notifier';
import Dialog from '@material-ui/core/Dialog';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import DialogContentText from '@material-ui/core/DialogContentText';
import { setCallElectionData, postCallElectionData, openSnackbar, getFieldOptions, getCallElectionData, handleChangeElectionData, editCallElectionData, deleteCallElectionData } from './state/ElectionAction';
import { connect } from 'react-redux';
import moment from 'moment';


const styles = theme => ({
  root: {
    width: '90%',
    paddingLeft: 24
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  panel_wrapper: {
    "min-width": 800,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    
  },
});

function getSteps() {
  return ['TIMELINE', 'SELECT ELECTORATES'];
}


function Transition(props) {
  return <Slide direction="up" {...props} />;
}


const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class ActiveElectionForm extends React.Component {

  constructor(props) {
    super(props);
    const { CallElectionData } = this.props;
    let newDate = new Date();
    this.state = {
      activeStep: 0,
      nominationStart: Date.parse(newDate),
      nominationEnd: Date.parse(newDate),
      objectionStart: Date.parse(newDate),
      objectionEnd: Date.parse(newDate),
      // depositAmount: 'Amount',
      // WeightagePrefarence: '%',
      // WeightageVote: '%',
      electionName: CallElectionData.electionName,
      electionModule: CallElectionData.electionModule,
      values: '',
      rowData: '',
      goToHome: false,
      columnHeaders: '',
      errorTextNominationStart:'',
      errorTextNominationEnd:'',
      errorTextObjectionStart:'',
      errorTextObjectionEnd:'',
      goNext:false,
      errorTextElectorates:''
    };

  }

  componentDidMount() {
    const { CallElectionData, getCallElectionData, } = this.props;
    getCallElectionData(this.props.electionId);

    getFieldOptions((CallElectionData.module_id) ? CallElectionData.module_id : this.props.moduleId).then((data) => {
      this.setState(data);
    })
  }

  handleNext = () => {
    let activeStep;
    const { setElectionTimeLine,CallElectionData } = this.props;

      var goNext = true;

      if(CallElectionData.timeLineData.nominationStart==='' || isNaN(CallElectionData.timeLineData.nominationStart)){
        this.setState({errorTextNominationStart:'emptyField'});
        goNext = false;
      }
      if(CallElectionData.timeLineData.nominationEnd==='' || isNaN(CallElectionData.timeLineData.nominationEnd)){
        this.setState({errorTextNominationEnd:'emptyField'});
        goNext = false;
      }
      if(CallElectionData.timeLineData.objectionStart==='' || isNaN(CallElectionData.timeLineData.objectionStart)){
        this.setState({errorTextObjectionStart:'emptyField'});
        goNext = false;
      }
      if(CallElectionData.timeLineData.objectionEnd==='' || isNaN(CallElectionData.timeLineData.objectionEnd)){
        this.setState({errorTextObjectionEnd:'emptyField'});
        goNext = false;
      }
      var nominationStart = moment(CallElectionData.timeLineData.nominationStart).format("YYYY-MM-DD");
      var nominationEnd = moment(CallElectionData.timeLineData.nominationEnd).format("YYYY-MM-DD");
      var objectionStart = moment(CallElectionData.timeLineData.objectionStart).format("YYYY-MM-DD");
      var objectionEnd = moment(CallElectionData.timeLineData.objectionEnd).format("YYYY-MM-DD");

      if(moment(nominationEnd).isBefore(nominationStart)){
        this.setState({errorTextNominationEnd:'emptyField2'});
        goNext = false;
      }
      if(moment(objectionStart).isBefore(nominationEnd)){
        this.setState({errorTextObjectionStart:'emptyField2'});
        goNext = false;
      }
      if(moment(objectionEnd).isBefore(objectionStart)){
        this.setState({errorTextObjectionEnd:'emptyField2'});
        goNext = false;
      }
      if(this.state.activeStep===1){
        if(CallElectionData.rowData.length === 0){
          this.setState({errorTextElectorates:'emptyField'});
          goNext = false;
        }
      }

      if(goNext){
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      }
    
    if (activeStep === 1) {
      setElectionTimeLine(this.state);
    }
    // const { setCallElectionData } = this.props;
    // const newElectionModule = {...this.props.CallElectionData};

  

    if (this.state.activeStep === 0) {
      // setCallElectionData(newElectionModule);
    }

  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleSubmit = () => {
    const { postCallElectionData, CallElectionData, electionData, openSnackbar } = this.props;

    openSnackbar({ message: CallElectionData.name + ' has been submitted for approval ' });

    postCallElectionData(CallElectionData, electionData);
    this.setState({
      goToHome: true
    });
  };
  handleDone = () => {
    this.setState({
      goToHome: true
    });
  };
  handleUpdate = () => {
    const { editCallElectionData, CallElectionData, electionData, openSnackbar, electionId } = this.props;

    openSnackbar({ message: CallElectionData.name + ' has been updated ' });

    editCallElectionData(CallElectionData, electionId);
    this.setState({
      goToHome: true
    });
  };
  handleDelete = () => {
    const { deleteCallElectionData, CallElectionData, openSnackbar, electionId } = this.props;

    openSnackbar({ message: CallElectionData.name + ' has been deleted ' });

    deleteCallElectionData(electionId);
    this.setState({
      goToHome: true
    });
  };


  handleChange = (input) => e => {
    const { handleChangeElectionData } = this.props;
    const newElectionModule = { ...this.props.CallElectionData };
    const name = input;
    const value = e.target.value;

    if ("nominationStart" == name) { 
      newElectionModule.timeLineData["nominationStart"] = Date.parse(value) 
      this.setState({errorTextNominationStart:''});
    }
    if ("nominationEnd" == name) { 
      newElectionModule.timeLineData["nominationEnd"] = Date.parse(value) 
      this.setState({errorTextNominationEnd:''});
    }
    if ("objectionStart" == name) { 
      newElectionModule.timeLineData["objectionStart"] = Date.parse(value) 
      this.setState({errorTextObjectionStart:''});
    }
    if ("objectionEnd" == name) { 
      newElectionModule.timeLineData["objectionEnd"] = Date.parse(value)
      this.setState({errorTextObjectionEnd:''});
     }
     this.setState({errorTextElectorates:''});

     handleChangeElectionData(newElectionModule)
      

  };
  onOpenModal = () => {
    this.setState({ open: true });
  
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  // handleChange = input => e => {
  //   this.setState({ [input]: e.target.value });
  // }

  getStepContent(step, values) {
    const { CallElectionData } = this.props;
    const {errorTextNominationStart,errorTextNominationEnd,errorTextObjectionStart,errorTextObjectionEnd} = this.state;
    const errorTextItems = { errorTextNominationStart, errorTextNominationEnd, errorTextObjectionStart, errorTextObjectionEnd }

    switch (step) {
      case 0:
        return <ElectionTimeLine
          handleChange={this.handleChange}
          values={values}
          CallElectionData={CallElectionData}
          errorTextItems={errorTextItems}
        />;
      // case 1:
      //   return <ElectionPayment
      //     handleChange={this.handleChange}
      //     values={values}
      //   />;
      // case 2:
      //   return <ElectionWeightage
      //     handleChange={this.handleChange}
      //     values={values}
      //   />;
      case 1:
        return <AllowNomination
          handleChange={this.handleChange}
          values={values}
          CallElectionData={CallElectionData}
          errorTextElectorates={this.state.errorTextElectorates}
        />;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const { nominationStart, nominationEnd, objectionStart, objectionEnd, depositAmount, WeightageVote, WeightagePrefarence, columnHeaders } = this.state;
    const values = { nominationStart, nominationEnd, objectionStart, objectionEnd, depositAmount, WeightageVote, WeightagePrefarence, columnHeaders }



    return (
      <div className={classes.root}>
        {this.state.goToHome ? (
          <Redirect to="/admin/call-election" />
        ) : (
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => {
                return (

                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{this.getStepContent(activeStep, values)}</Typography>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                      </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          // onClick={activeStep === 3 ? this.handleSubmit : this.handleNext}

                          >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          )}
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps have been completed</Typography>
            <Grid container classname={classes.panel_wrapper} spacing={16}>
              <Grid item xs="1">
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
            </Button>
              </Grid>
              {((this.props.electionId) && this.props.check !== 'approve' && this.props.check !== 'reject') ?
                <Grid item xs="2">
                  <Button color="primary" onClick={this.handleUpdate} className={classes.button}>
                    Update
            </Button>
                  <Button color="secondary"  onClick={this.onOpenModal} className={classes.button}>
                    Delete
                    <DeleteIcon className={classes.rightIcon} />
            </Button>
                </Grid>
                : (this.props.check === 'approve') ?
                  <Grid item xs="1">
                    <Button style={{ marginLeft: -50 }} color="primary" onClick={this.handleDone} className={classes.button}>
                      Done
            </Button>
                  </Grid>
                  : (this.props.check === 'reject') ?
                    <Grid item xs="1">
                      <Button style={{ marginLeft: -50 }} color="primary" onClick={this.handleUpdate} className={classes.button}>
                        Update
            </Button>
                    </Grid>
                    :
                    <Grid item xs="2">
                      <Button color="primary" onClick={this.handleSubmit} className={classes.button}>
                        Submit for approval
            </Button>
                    </Grid>
              }
            </Grid>
          </Paper>
        )}
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
          </DialogTitle>
          <DialogContent>

            <DialogContentText id="alert-dialog-slide-description">
              {/* <WarningIcon className={classes.warningIcon} /> */}
              Are You Sure You Want to Delete This Election ?
                                            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id={this.state.moduleId} value="OK" onClick={this.handleDelete}  color="primary">
              OK
                                            </Button>
            <Button onClick={this.onCloseModal} color="primary">
              Cancel
                                            </Button>
          </DialogActions>
        </Dialog>
      </div>

    );
  }
}

ActiveElectionForm.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = ({ Election }) => {

  const { setCallElectionData, postCallElectionData, openSnackbar } = Election;
  const CallElectionData = Election.CallElectionData;
  const electionData = Election.electionData;
  const getCallElectionData = Election.getCallElectionData;

  return { setCallElectionData, CallElectionData, electionData, postCallElectionData, openSnackbar, getCallElectionData }
};

const mapActionsToProps = {
  setCallElectionData,
  postCallElectionData,
  openSnackbar,
  getCallElectionData,
  handleChangeElectionData,
  editCallElectionData,
  deleteCallElectionData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ActiveElectionForm));

