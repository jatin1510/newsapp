import "./App.css";
import React, { Component } from 'react'
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    pageSize: 8,
    progress: 0,
  }

  setProgress = (progress) => {
    this.setState({progress:progress})
  }

  render() {
    return (
      <Router>
      <div>
        <Navbar/>
        <LoadingBar
          height={2.5}
          color='#f11946'
          progress={this.state.progress}
          shadow={false}
        />  
        <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} key="generalHome" pageSize={this.state.pageSize} country='in' category='general'/>} /> 
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.state.pageSize} country='in' category='business'/>} /> 
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.state.pageSize} country='in' category='entertainment'/>} /> 
        <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.state.pageSize} country='in' category='general'/>} /> 
        <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.state.pageSize} country='in' category='health'/>} /> 
        <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.state.pageSize} country='in' category='science'/>} /> 
        <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.state.pageSize} country='in' category='sports'/>} /> 
        <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.state.pageSize} country='in' category='technology'/>} /> 
        </Routes>
      </div>
     </Router>
    )
  }
}
