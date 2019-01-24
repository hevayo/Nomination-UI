import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from 'components/MainMenu/MainMenu';
import NominationForm from 'components/NominationForm/NominationForm';
import { postNominationPayments } from './state/NominationAction';
import { connect } from 'react-redux';


import axios from 'axios';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
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
    }
});

class Dashboard extends React.Component {
    // state = {
    //     open: true,
    //     nominations: [],
    //     depositor:'test',
    //     depositAmount:'test',
    //     depositeDate:'test',
    //     paymentStatus:'test',

    // };
    constructor(props) {
        super(props)
    
        this.state = {
            open: true,
            nominations: [],
            depositor:'test',
            depositAmount:'test',
            depositeDate:'test',
            paymentStatus:'test',
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
        
        this.handleChange = this.handleChange.bind(this);




      }
  

    // handleSubmit(activeStep){
    //     console.log("activeStep",this.state);
    //     if (activeStep == 2){
    //         postNominationPayments(this.state);
    //     }
    // };

    handleChange(name) {
        // console.log(event.target.value)
        console.log("0000000000000000",this.state);

// debugger;
        

        this.setState({
            payments:{
                // [name]:event.target.value,
            } 
        });
        // console.log("====",this.state);
        // console.log('**********************');
        // console.log(this.state);
    };
    
    
    componentDidMount() {
      
            // const { postNominationPayments, candidatePayments } = this.props;
            // postNominationPayments();
    
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        

        const { classes, postNominationPayments } = this.props;

        return (
            <div className={classes.root}>
            
                <CssBaseline />
                <MainMenu title="Elections Commission of Sri Lanka"></MainMenu>
                <NominationForm postNominationPayments={this.props.postNominationPayments} handleChange={this.handleChange} title="Elections Commission of Sri Lanka"></NominationForm>

            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
    const { candidatePayments } = Election;
    return { candidatePayments }
};

const mapActionsToProps = {
    
    postNominationPayments
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dashboard));

// export default withStyles(styles)(Dashboard);
