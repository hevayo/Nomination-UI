import {
  GET_NOMINATIONS,
  POST_NOMINATION_PAYMENTS,
  PUT_NOMINATION_PAYMENTS,
  NOMINATIONS_LOADED,
  ON_NOMINATION_APPROVAL_CHANGE,
  GET_NOMINATION_PAYMENTS,
  HANDLE_CHANGE_PAYMENT,
  GET_NOMINATION_CANDIDATES,
  DELETE_NOMINATION_CANDIDATE,
  UPDATE_NOMINATION_PAYMENTS,
  POST_NOMINATION_SUPPORT_DOC,
  APPROVED_ELECTIONS,
  PARTY_LIST_LOADED,
  GET_NOMINATION_LIST,
  RECEIVE_NOMINATION_STATUS,
  POST_CANDIDATE_SUPPORT_DOC,
  CANDIDATE_SUPPORT_DOC_LOADED

} from "./NominationTypes";
import {API_BASE_URL} from "../../../config.js";
import axios from "axios";
import { openSnackbar } from '../../election/state/ElectionAction';
import moment from "react-moment";

const nominationLoaded = (getNominations) => {
  return {
    type: NOMINATIONS_LOADED,
    payload: getNominations,
  };
};

export function getNominations(selectedElection,selectedParty) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${selectedElection}/pending-nominations/${'SUBMIT'}/team/${selectedParty}`,
    )
    .then(response => {
       dispatch(nominationLoaded(response.data));
    }).catch(err => {
          console.log(err)
    });
  };
}

const nominationPaymentLoaded = (getNominationPayments) => {
  return {
    type: GET_NOMINATION_PAYMENTS,
    payload: getNominationPayments,
  };
};

export function getNominationPayments(customProps) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${customProps}/payments`,
    )
    .then(response => {
      const getNominationPayments = response.data;
       dispatch(nominationPaymentLoaded(getNominationPayments));
    }).catch(err => {
          console.log(err)
    });
  };
}

const approveElectionLoaded = (approveElections) => {
  return {
    type: APPROVED_ELECTIONS,
    payload: approveElections,
  };
};

export function getApproveElections() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/elections/status/${'APPROVE'}`,
    )
    .then(response => {
      const approveElections = response.data;
       dispatch(approveElectionLoaded(approveElections));
    }).catch(err => {
          console.log(err)
    });
  };
}

//get party list for nomination review
const partyListLoaded = (partyList) => {
  return {
    type: PARTY_LIST_LOADED,
    payload: partyList,
  };
};

export function getTeams() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/teams`,
    )
    .then(response => {
      const partyList = response.data;
       dispatch(partyListLoaded(partyList));
    }).catch(err => {
          console.log(err)
    });
  };
}

const nominationCandidateLoaded = (getNominationCandidates) => {
  return {
    type: GET_NOMINATION_CANDIDATES,
    payload: getNominationCandidates,
  };
};

export function getNominationCandidates(customProps) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${customProps}/candidates`,
    )
    .then(response => {
      const getNominationCandidates = response.data;
       dispatch(
         nominationCandidateLoaded(getNominationCandidates)
         );
    }).catch(err => {
      const getNominationCandidates = [];
      dispatch(
        nominationCandidateLoaded(getNominationCandidates)
        );
          console.log(err)
    });
  };
}

export const onChangeApprovalData = (nominationApprovals) => {
  return {
    type: ON_NOMINATION_APPROVAL_CHANGE,
    payload: nominationApprovals,
  }
};

export function onChangeApproval(nominations,id,status,reviewNote) {
  return function (dispatch) {
    let nominationApprovals = {
      createdBy: 'admin',//TODO: yujith, change this to session user after creating the session
      createdAt: Date.parse(new Date()),
      updatedAt: Date.parse(new Date()),
      status: status,
      reviewNote:reviewNote,
      nominationId: id
    };
    const index = nominations.findIndex(x => x.id === id);
    const division = nominations[index].division_name;
    const party = nominations[index].party;

    const response = axios
    .post(
      `${API_BASE_URL}/nominations/${id}/approve-nomination`,
          {...nominationApprovals}
    )
    .then(response => {
       dispatch(onChangeApprovalData(response.data));
       dispatch(openSnackbar({ message:(status === '1ST-APPROVE') ? 'Approved nomination for '+party+' '+ division+' division' : 'Rejected nomination for '+party+' '+ division+' division'}));
    }).catch(err => {
          console.log(err)
    });
  };
}

// export const handleChangePayment = (paymentState) => {
//   debugger;
//   return {
//     type: HANDLE_CHANGE_PAYMENT,
//     payload: paymentState,
//   }
// };


export const handleChangePayment = (name) => event => {
  this.setState({
    [name]:event.target.value,
}); 
let paymentState = this.state;
return {
  type: HANDLE_CHANGE_PAYMENT,
  payload: paymentState,
} 

};

export const setData = (val) => {
    return {
        type: POST_NOMINATION_PAYMENTS,
        payload: val
    }
}

export function postNominationPayments(candidatePayments,candidateCount) {
    return function (dispatch) {

        let nominationPayments = {
            depositor: candidatePayments.depositor,
            amount: 2000*candidateCount,
            depositDate: Date.parse(candidatePayments.depositeDate),
            filePath: candidatePayments.filePath,
            status: "PENDING",
            createdBy:candidatePayments.depositor,//TODO: yujith,change this to session user after session user created
            createdAt:Date.parse(new Date()),
            updatedAt:Date.parse(new Date()),
            nominationId: candidatePayments.nominationId
        };
       
      const response = axios
      .post(
        `${API_BASE_URL}/nominations/payments`,
            {...nominationPayments}
      )
      .then(response => {
         dispatch(setData(response.data));
      }).catch(err => {
            console.log(err)
      });
    };
  }

  export const setSupportDocData = (val) => {
    return {
        type: POST_NOMINATION_SUPPORT_DOC,
        payload: val
    }
}
export const setNominationStatus = (nominationSuppertDocs) => {
  return {
      type: RECEIVE_NOMINATION_STATUS,
      payload: nominationSuppertDocs
  }
}


  export function postNominationSupportDocs(nominationSuppertDocs,divisionId) {
   debugger;
    var nominationSuppertDocs = {
      nominationId:nominationSuppertDocs.nominationId,
      candidateSupportDocs:nominationSuppertDocs.supportdoc,
      divisionId:divisionId
    }
    return function (dispatch) {
       
      const response = axios
      .put(
        `${API_BASE_URL}/nominations/${nominationSuppertDocs.nominationId}/support-docs`,
            {...nominationSuppertDocs}
      )
      .then(response => {
         dispatch(setSupportDocData(response.data));
         dispatch(setNominationStatus(nominationSuppertDocs));
        debugger;
      }).catch(err => {
            console.log(err)
      });
    };
  }

  export const setCandidateSupportDocData = (val) => {
    return {
        type: POST_CANDIDATE_SUPPORT_DOC,
        payload: val
    }
}
  export function postCandidateSupportDocs(candidateSuppertDocs) {
    debugger;
     
     return function (dispatch) {
        
       const response = axios
       .post(
         `${API_BASE_URL}/nominations/candidate/support-docs`,
             {...candidateSuppertDocs}
       )
       .then(response => {
          dispatch(setCandidateSupportDocData(response.data));
       }).catch(err => {
             console.log(err)
       });
     };
   }

  export const setUpdatedPaymentData = (val) => {
    return {
        type: PUT_NOMINATION_PAYMENTS,
        payload: val
    }
}

  export function updateNominationPayments(customProps,candidatePayments,candidateCount) {
    return function (dispatch) {
      let nominationPayments = {
        depositor: candidatePayments.depositor,
        amount: candidateCount*2000,
        depositDate:Date.parse(candidatePayments.depositeDate),
        filePath: candidatePayments.filePath,
        status: candidatePayments.status,
        updatedAt:Date.parse(new Date()),
        nominationId: candidatePayments.nominationId
    };
      const response = axios
      .put(
        `${API_BASE_URL}/nominations/${customProps}/payments`,
        {...nominationPayments}
      )
      .then(response => {
        const updateNominationPayments = response.data;
         dispatch(setUpdatedPaymentData(updateNominationPayments));
      }).catch(err => {
            console.log(err)
      });
    };
  }

//--------------- Start of Delete Nomination Candidate -------------
export const setDeleteData = (getNominationCandidateDeleted) => {
  return {
      type: DELETE_NOMINATION_CANDIDATE,
      payload: getNominationCandidateDeleted
  }
}

export function deleteNominationCandidate(customProps) {
    return function (dispatch) {
       
      const response = axios
      .delete(
        `${API_BASE_URL}/nominations/${customProps}/candidates`,
      )
      .then(response => {
        const getNominationCandidateDeleted = response.data;
         dispatch(
          setDeleteData(getNominationCandidateDeleted)
           );
      }).catch(err => {
        const getNominationCandidateDeleted = [];
        dispatch(
          setDeleteData(getNominationCandidateDeleted)
          );
            console.log(err)
      });
    };
  }
//--------------- End of Delete Nomination Candidate -------------

//--------------- Start of get nomination list -------------------
const nominationListLoaded = (getNominationList) => {
  return {
    type: GET_NOMINATION_LIST,
    payload: getNominationList,
  };
};

export function getNominationList() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/elections/${sessionStorage.getItem('election_id')}/teams/1111/divisions`,
    )
    .then(response => {
      const getNominationList = response.data;
       dispatch(
         nominationListLoaded(getNominationList)
         );
    }).catch(err => {
      const getNominationList = [];
      dispatch(
        nominationListLoaded(getNominationList)
        );
          console.log(err)
    });
  };
}

//--------------- End of get nomination list---------------------------

//--------------- Start of get nomination candidate support doc list -------------------
const candidateSupportdocLoaded = (getcandidateSupportdocList) => {
  return {
    type: CANDIDATE_SUPPORT_DOC_LOADED,
    payload: getcandidateSupportdocList,
  };
};

export function getCandidateSupportingDocs(candidateId) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${candidateId}/candidate/support-docs`,
    )
    .then(response => {
      const getcandidateSupportdocList = response.data;
       dispatch(
        candidateSupportdocLoaded(getcandidateSupportdocList)
         );
    }).catch(err => {
      const getcandidateSupportdocList = [];
      dispatch(
        candidateSupportdocLoaded(getcandidateSupportdocList)
        );
          console.log(err)
    });
  };
}

//--------------- End of get nomination candidate support doc list---------------------------







