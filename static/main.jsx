var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('underscore');
var Stickyfill = require('stickyfill');
var stickyfill = Stickyfill();

import {introduction} from './introduction.jsx'
import {papers_component} from './papers.jsx'
import {talks_component} from './talks.jsx'
import {work_history} from './work_history.jsx'
import {about_me, contacting_me} from './about_me.jsx'


const Section = React.createClass({
  componentDidMount: function () {
    setTimeout(function () {
        var stickyElements = document.getElementsByClassName('sticky');
        for (var i = stickyElements.length - 1; i >= 0; i--) {
            stickyfill.add(stickyElements[i]);
        }
    }, 1000);
  },
  render: function () {
    return (
      <div className="section" id={"section" + this.props.id}>
        <div className="left sticky">{this.props.title}</div>
        <div className="right">{this.props.contents}</div>
      </div>)
  }
})

const Publication = React.createClass({
  render: function () {
    var authors, download_link;

    if (this.props.authors) {
      authors = _.map(this.props.authors, function (name) {
        if (name === "Chen, Z.") {
          return (<div className="author me" key={name}>{name}</div>);
        } else {
          return (<div className="author" key={name}>{name}</div>);
        }
      })
    }

    if (this.props.link) {
      download_link = <a className="download_link" href={this.props.link}>link</a>
    }

    return (
      <div className="item publication">
        <div className="title">{this.props.title}</div>
        {download_link}
        <div className="author_list">{authors}</div>
        {React.createElement(Citation, this.props.citation)}
      </div>);
  }
})

const Citation = React.createClass({
  render: function () {
    return (
      <div className="citation">
        {this.props.venue}
      </div>
    );
  }
})


const App = React.createClass({
  render: function() {
    var sidebar = <div className="sidebar">
      <img src="assets/profile_sketch.png" style={{width:"140px",borderRadius:"140px",paddingBottom:"5px"}}/>
      <p className="name">Zhenghao Chen</p>
      <p>
        <a href="https://www.linkedin.com/in/zhenghao-chen-44865036">LinkedIn</a> | <a href="assets/Zhenghao CV March 2020.pdf">Resume</a>
      </p>
    </div>

    var research_sidebar = <div className="sidebar">
      Research Publications
      <p style={{paddingTop: "10px"}}>
        <a href="https://scholar.google.com/citations?user=dGPqP-wAAAAJ&hl=en">Google Scholar</a>
      </p>
    </div>


    return (
      <div className="container">
        <Section id="1" title={sidebar} contents={introduction}/>
        <Section id="2" title={research_sidebar} contents={papers_component}/>
        <Section id="3" title="Articles and Talks" contents={talks_component}/>
        <Section id="4" title="Education and Work History" contents={work_history}/>
        <Section id="5" title="About Me" contents={about_me}/>
        <Section id="6" title="Getting in Touch" contents={contacting_me}/>
      </div>
      );
  }
});


ReactDOM.render(
  <App/>,
  document.getElementById('main')
);
