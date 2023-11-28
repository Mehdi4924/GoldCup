import { configureStore } from '@reduxjs/toolkit';
import {nameReducer} from './mainSlice';

const store=configureStore({
    reducer:{
        nameReducer,
    }
});

export default store;