import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileUpload from "../common/FileUpload";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {postNominationSupportDocs } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import DoneOutline from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Cancel';
import axios from "axios";



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    divider: {
      marginBottom:30
    },
    label: {
      marginLeft: theme.spacing.unit*15,
  },
});


class CandidateFileUpload extends React.Component {

  constructor(props) {
        super(props);
    this.state = {
        status: "ready",
        filename:'',
        supportDocId:'3',
        supportdoc:[],
        currentSdocId:''
    }
 }

  handleChange(files) {
        this.setState({
          files: files
        });
  }

  handleSubmit = (e) => {
    console.log(this.state);
    var candidateSuppertDocs = {
      // nominationId:nominationSuppertDocs.nominationId,
      // candidateId:nominationSuppertDocs.nominationId,
      candidateSupportDocs:this.state.supportdoc
    }
    debugger;
        e.preventDefault();
       
        axios({
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: 'nominations/candidate/support-docs',
            data: candidateSuppertDocs
        })
        .then(function (response) {
           console.log(response);
          })
          .catch(function (error) {
              alert("error",error);
            // resultElement.innerHTML = generateErrorHTMLOutput(error);
          });
  
};


  onSelectFiles = evt => {
   
    evt.preventDefault();
    evt.stopPropagation();

    var array = [...this.state.supportdoc];
    var index = array.map(
      function(item){
        return item.id
      }
    ).indexOf(evt.target.id);
    var count=2;
    if(evt.target.id==='fe2c2d7e-66de-406a-b887-1143023f8e72'){
      array.map(item =>(
        item.id==='fe2c2d7e-66de-406a-b887-1143023f8e72' ? count++ : count
      )
      )
    }
    if(evt.target.id==='fe2c2d7e-66de-406a-b887-1143023f8e72'){
      if(index !== -1 && count=== 4){
        array.splice(index,1)
      }
    }else{
      if(index !== -1){
        array.splice(index,1)
      }
    }
    

    this.setState({
      status: evt.type,
      supportdoc:array,
      supportDocId: evt.target.id
    });

    // Fetch files
    const { files } = evt.target;
    this.uploadFiles(files);
  };

  uploadFiles = files => {
    let error = false;
    const errorMessages = [];

    const data = {
      error: null,
      files
    }; 

    const { allowedTypes, allowedSize } = this.state;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        // Validate file type
        if (allowedTypes && allowedTypes.length > 0) {
          if (!allowedTypes.includes(file.type)) {
            error = true;
            errorMessages.push("Invalid file type(s)");
          }
        }

        // Validate fileSize
        if (allowedSize && allowedSize > 0) {
          if (file.size / 1048576 > allowedSize) {
            error = true;
            errorMessages.push("Invalid file size(s)");
          }
        }
      }
    }

    if (error) {
      data.error = errorMessages;
      data.files = null;
      this.reset();
    } else {
      const formData = new FormData();
      this.setState({status: "uploading", progress: 0});
      formData.append("file", data.files[0]);
      axios.post('http://localhost:9001/ec-election/file-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },

        onUploadProgress: (progressEvent) => {
          let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
          this.setState(
            {progress: percentCompleted}
          );
          console.log(percentCompleted);
        }


      }).then((response) => {

       
      
        const obj = {'id':this.state.supportDocId, 'filename':response.data.filename, 'originalname':response.data.originalname};
        
        const newArray = this.state.supportdoc.slice(); // Create a copy
        newArray.push(obj); // Push the object
        this.setState(
          {
            status: "uploaded",
            currentSdocId: response.data.originalname,
            supportdoc: newArray
          }
        );
      });
    }
  };

  handleChangeButton = (e) => {
    const { onCloseModal } = this.props;
    if(e.currentTarget.value==="Submit&Clouse"){
        onCloseModal();
    }
    }

  handleUpload = (event) => {
    const data = new FormData();
    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    var filesArray = this.state.files;
  };
  showFlagToStyle = (flag) => (
    {display: flag ? "" : "none"}
  );

    render() {
        const {classes} = this.props;
        var names = ['Jake', 'Jon', 'Thruster'];
        const supportingDocs = [{
          "id": "ff4c6768-bdbe-4a16-b680-5fecb6b1f747",
          "doc": "Birth Certificate",
        }, {
          "id": "fe2c2d7e-66de-406a-b887-1143023f8e72",
          "doc": "National Identity Card (NIC)",
        }, {
          "id": "32423",
          "doc": "Declaration of Assets and Liabilities Form",
        }, {
            "id": "15990459-2ea4-413f-b1f7-29a138fd7a97",
            "doc": "Affidavit",
          }
      ];

    const doneElement = (<div className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
    <DoneOutline  color="secondary"/>
    {/* <a download={"filename"} href={"ok"}>filename</a> */}
    </div>);
      const closeElement = (<div  className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
      <CloseIcon ref={this.state.currentSdocId} onClick={this.handleRese} color="red"/>
      {/* <a download={"filename"} href={"ok"}>filename</a> */}
      </div>);

        const supportingDocItems = supportingDocs.map(docs => (
          <div>
            <Grid style={{width: '100%'}} container spacing={24}>
            <Grid item lg={2}>
            {
             this.state.supportdoc.map(sdoc => (
              sdoc.id === docs.id ? doneElement : ' '
            ))
          }   
            </Grid>
            <Grid item lg={8}>
            <span>
              {docs.doc}
            </span>
            </Grid>
            <Grid item lg={2}>
            <span><FileUpload value={docs.id} doneElement={doneElement} onSelectFiles={this.onSelectFiles} /></span>
              {
             this.state.supportdoc.map(sdoc => (
              sdoc.id === docs.id ? 
              <Typography variant="caption" gutterBottom>
            {sdoc.originalname}{closeElement}
           </Typography>
               : ' '
            ))
          } 
           
            {docs.id === 'fe2c2d7e-66de-406a-b887-1143023f8e72' ?
            
              <span><FileUpload   style={{textAlign: 'right'}} value={docs.id} doneElement={doneElement} onSelectFiles={this.onSelectFiles} /></span>
             : ' ' }
            </Grid>
            </Grid>
            <Divider className={classes.divider} variant="middle"/>
          </div>
          ));

      return (
        <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <div>
        {supportingDocItems}
        <Grid container spacing={12}>
                    <Grid className={classes.label}  item lg={12}>
                    <br /><br />
                        <Button variant="contained" type="submit" value="Submit&New" color="primary" className={classes.submit}>
                            Save & New
                        </Button>
                        <Button  variant="contained" onClick = { this.handleChangeButton }  type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                            Save & Close
                        </Button>
                    </Grid>
                </Grid>
        </div>
         </form>
        );
    }
}

CandidateFileUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination}) => {
    const {postNominationSupportDocs} = Nomination;
    return {postNominationSupportDocs};
  };
  
  const mapActionsToProps = {
    postNominationSupportDocs
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CandidateFileUpload));