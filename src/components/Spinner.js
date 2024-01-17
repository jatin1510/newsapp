import React, { Component } from 'react'
import loading from './loading.gif'

export class Loading extends Component {
  render() {
    return (
      // <div className='text-center my-4' style={{position: 'fixed', zIndex: 2, top: '88%', left: '48%'}}>
      <div className='text-center'>
        <img src={loading} alt="" height={'50px'}/>
      </div>
    )
  }
}

export default Loading
