import AsyncStorage from '@react-native-community/async-storage';
import {SELECT_LANGUAGE } from '../constants';
export const selectLanguage=(val)=>{
    return async dispatch => {
        await AsyncStorage.setItem('authData', ('selectedLanguage',val))
       dispatch( {type:SELECT_LANGUAGE,
        language:val});
    };
}