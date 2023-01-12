import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import  {Header} from '../Header'
import * as User from '../USerContext'
const context = {
    state:{},
    dispatch: jest.fn()
}

let mock;
beforeEach('Header render',()=>{
    mock = jest.spyOn(User, 'User').mockReturnValue(context)
  
})

