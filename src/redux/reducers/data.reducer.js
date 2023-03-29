import {CLEAR_MEMBER, CLEAR_MEMBERS, SET_FLUSH, SET_MEMBER, SET_MEMBERS, SET_STUDENT, SET_STUDENTS, SET_TRANSACTIONS} from "../actions/types";

const INIT_STATE = {
    students: [],
    isFlush: false,
    members: [],
    student: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    transactions: [],
    totalMembershipFund: 0,
    totalDirectReferral: 0,
    member: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      birthDate: undefined,
      address: "",
      membershipFee: 12000,
      parent: undefined,
    }
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_STUDENTS: {
      return {
        ...state,
        students: payload
      };
    }
    
    case SET_TRANSACTIONS: {
      return {
        ...state,
        ...payload
      };
    }
    
    case SET_MEMBER: {
      return {
        ...state,
        member: payload
      };
    }
    
    
    case CLEAR_MEMBER: {
      return {
        ...state,
        member: {}
      };
    }
    
    case SET_MEMBERS: {
      return {
        ...state,
        members: payload
      };
    }
    
    case CLEAR_MEMBERS: {
      return {
        ...state,
        members: []
      };
    }
    
    case SET_STUDENT: {
      return {
        ...state,
        student: payload
      };
    }
    case SET_FLUSH: {
      return {
        ...state,
        isFlush: payload
      };
    }
    default:
        return state;
};
}
