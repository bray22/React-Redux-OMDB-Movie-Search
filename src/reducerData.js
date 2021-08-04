import {
  SET_DATA,
  RESET_DATA,
  SET_HEADER_DATA,
  SET_MISSING_DOC_STATUS_LIST,
  SET_RIGHT_COL_DATA,
  SET_RECORD,
} from './actions';


const initialState = {
  data: {},
  headerData: [],
  missingDocStatusList: [],
  rightColData: {},
};

const rootReducer = (state = initialState, action) => {
console.log(action);
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case SET_RECORD: {
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items.map(item => {
            if (item.coll_action_item_id === action.payload.coll_action_item_id) {
              return action.payload;
            }

            return item;
          }),
        },
      };
    }
    case RESET_DATA: {
      return {
        data: {},
        headerData: {},
        missingDocStatusList: [],
        rightColData: {},
      };
    }
    case SET_HEADER_DATA: {
      console.log(action);
      return {
        ...state,
        headerData: [1,2],
      };
    }
    case SET_RIGHT_COL_DATA: {
      return {
        ...state,
        rightColData: action.payload,
      };
    }
    case SET_MISSING_DOC_STATUS_LIST: {
      return {
        ...state,
        missingDocStatusList: action.payload,
      };
    }
    default:
      return {
        ...state,
        headerData: action.payload,
      };
  }
};

export default rootReducer;
