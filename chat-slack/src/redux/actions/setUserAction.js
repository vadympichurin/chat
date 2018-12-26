import * as actionTypes from "./type";

export const setUser = user => ({
    type: actionTypes.SET_USER,
    data: {
        currentUser: user
    },
})

export const clearUser = () => ({
    type: actionTypes.CLEAR_USER,
})

export const setCurrentChannel = (channel) => ({
    type: actionTypes.SET_CURRENT_CHANNEL,
    data: channel,
})

export const setPrivateChannel = (isPrivateChannel) => ({
    type: actionTypes.SET_PRIVATE_CHANNEL,
    data: isPrivateChannel,
})

export const setColorsAction = ( primaryColor, secondaryColor) => ({
    type: actionTypes.SET_COLOR,
    data: {
        primaryColor,
        secondaryColor,
    }
})
