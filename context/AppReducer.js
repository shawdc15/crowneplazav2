export const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
  activeModal: '',
  error: [],
  isRegistered: false,
  menuSidebarStatus: false,
  profileModalStatus: false,
  accomodationList: [],
  reservationList: [],
  activeSidebar: 0,
  adminModalData: null,
  selectedData: [],
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_SIDEBAR':
      return {
        ...state,
        activeSidebar: action.value,
      }
    // reservation
    case 'RESERVATION_HISTORY_REQUEST':
      return {
        ...state,
        access_id: localStorage.getItem('access_id'),
        isLoading: true,
      }
    case 'RESERVATION_HISTORY_SUCCESS':
      return {
        ...state,
        reservationList: action.value,
        isLoading: false,
      }
    case 'RESERVATION_HISTORY_ERROR':
      return {
        ...state,
        reservationList: [],
        isLoading: false,
      }
    // accomodation state
    case 'ACCOMODATION_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'ACCOMODATION_SUCCESS':
      return {
        ...state,
        accomodationList: action.value,
        isLoading: false,
      }
    case 'ACCOMODATION_ERROR':
      return {
        ...state,
        accomodationList: [],
        isLoading: false,
      }
    // modal

    case 'SWITCH_MENU_SIDEBAR_STATUS':
      return {
        ...state,
        menuSidebarStatus: !state.menuSidebarStatus,
      }
    case 'SWITCH_PROFILE_MODAL_STATUS':
      return {
        ...state,
        profileModalStatus:
          action.value == 'close' ? false : !state.profileModalStatus,
      }
    case 'CLOSE_MENU': {
      return {
        ...state,
        error: [],
        activeModal: '',
        menuSidebarStatus: !state.menuSidebarStatus,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        error: [],
        activeModal: '',
      }
    }
    case 'OPEN_LOGIN_MODAL': {
      return {
        ...state,
        error: [],
        activeModal: 'LOGIN',
        menuSidebarStatus: false,
      }
    }
    case 'OPEN_REGISTER_MODAL': {
      return {
        ...state,
        error: [],
        activeModal: 'REGISTER',
        isRegistered: false,
        menuSidebarStatus: false,
      }
    }
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        error: [],
        isRegistered: true,
        isLoading: false,
      }
    }
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        isLoading: true,
        error: [],
      }
    }
    case 'LOGIN_SUCCESS': {
      localStorage.setItem('access_id', action.value._id)
      return {
        ...state,
        isAuth: true,
        user: action.value,
        error: [],
        access_id: action.value._id,
        isLoading: false,
        activeModal: '',
      }
    }
    case 'REGISTER_ERROR':
    case 'LOGIN_ERROR': {
      return {
        ...state,
        error: action.value,
        isLoading: false,
      }
    }
    case 'LOGOUT': {
      localStorage.removeItem('access_id')
      return {
        ...state,
        isAuth: false,
        access_id: '',
        user: {},
        access_id: '',
        profileModalStatus: false,
        reservationList: [],
      }
    }
    case 'SET_USER': {
      return {
        ...state,
        access_id: localStorage.getItem('access_id'),
        menuSidebarStatus: false,
        profileModalStatus: false,
        isAuth: true,
        user: action.value,
      }
    }
    case 'ADMIN_MODAL_DATA': {
      return {
        ...state,
        adminModalData: action.value,
      }
    }
    case 'SET_SELECTED_DATA': {
      return {
        ...state,
        selectedData: action.value,
      }
    }
    case 'CLEAR_SELECTED_DATA': {
      return {
        ...state,
        selectedData: null,
      }
    }
  }
}
