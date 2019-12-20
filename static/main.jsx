var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('underscore');
var Stickyfill = require('stickyfill');
var stickyfill = Stickyfill();

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
      <img src="assets/profile.jpg" style={{width:"160px",borderRadius:"160px",paddingBottom:"5px"}}/>
      <p className="name">Zhenghao Chen</p>
      <p>
        <a href="https://www.linkedin.com/in/zhenghao-chen-44865036">LinkedIn</a> | <a href="assets/ZhenghaoChen_resume.pdf">Resume</a>
      </p>
    </div>

    var introduction = <div>
        <p>I'm a principal ML engineer on the computing team at <a href="https://www.calicolabs.com">Calico Life Sciences</a> &mdash;
        a biotech startup that studies aging and ways to enable people to live longer and
        healthier lives. At Calico, my work focuses on building models for understanding perturbations
        to cellular state (e.g. cell morphology), spatial profiling and time-series analysis.</p>
        <p>My main interests are in machine learning, statistics, and data analysis and visualization.</p>
        <p>Before this, I was a data scientist and engineer at <a href="https://www.coursera.org">Coursera</a> for 5 years.
        I got my B.S. and M.S. (in Computer Science) at Stanford where I worked
        with <a href="http://www.andrewng.org/">Andrew Ng</a> and <a href="http://ai.stanford.edu/users/koller/">Daphne Koller</a> on deep learning and computational biology.</p>
      </div>

    var research_sidebar = <div className="sidebar">
      Research Publications
      <p style={{paddingTop: "10px"}}>
        <a href="https://scholar.google.com/citations?user=dGPqP-wAAAAJ&hl=en">Google Scholar</a>
      </p>
    </div>

    var research_work = [
      {title: "Mapping the pairwise choices leading from pluripotency to human bone, heart, and other mesoderm cell types",
       authors: ["Loh, K.M.", "Chen, A.", "Koh, P.W.", "Deng, T.Z.", "Sinha, R.", "Tsai, J.M.", "Barkal, A.A.",
       "Shen, K.Y.", "Jain, R.", "Morganti, R.M.", "Shyh-Chang, N.", "Fernhoff, N.B.", "George, B.M.", "Wernig, G.",
       "Salomon, R.E.", "Chen, Z.", "Vogel, H.", "Epstein, J.A.", "Kundaje, A.", "Talbot, W.S.", "Beachy, P.A.",
       "Ang, L.T.", "Weissman, I.L."],
       link: "https://www.sciencedirect.com/science/article/pii/S0092867416307401",
       citation: {venue: "2016, Cell", bibtex: false}
      },
      {title: "Tuned Models of Peer Assessment in MOOCs",
       authors: ["Piech, C.", "Huang, J.", "Chen, Z.", "Do, C.", "Ng, A.Y.", "Koller, D."],
       link: "http://arxiv.org/pdf/1307.2579v1.pdf",
       citation: {venue: "2013, EDM", bibtex: false}
      },
      {title: "A Graph Regularization Based Approach for Gene Scoring",
       authors: ["Chen, Z.", "Koller, D."],
       link: "assets/GraphRegularizationBasedApproachForGeneScoring.pdf",
       citation: {venue: "2012, Stanford CS Honors Thesis, Supervised by Prof. Daphne Koller.", bibtex: false}
      },
      {title: "Dissecting an Online Intervention for Cancer Survivors",
       authors: ["Chen, Z.", "Koh, P.W.", "Ritter, P.L.", "Lorig, K.", "Bantum, E.O.", "Saria, S."],
       link: "http://heb.sagepub.com/content/42/1/32.short",
       citation: {venue: "Health Educ Behav February 1, 2015 42: 5-7", bibtex: false}
      },
      {title: "Learning Deep Energy Models",
       authors: ["Ngiam, J.", "Chen, Z.", "Koh, P.W.", "Ng, A.Y."],
       link: "http://ai.stanford.edu/~ang/papers/icml11-DeepEnergyModels.pdf",
       citation: {venue: "2011, ICML", bibtex: false}
      },
      {title: "On Random Weights and Unsupervised Feature Learning",
       authors: ["Saxe, A.M.", "Koh, P.W.", "Chen, Z.", "Bhand, M.", "Suresh, B.", "Ng, A.Y."],
       link: "http://robotics.stanford.edu/~ang/papers/nipsdlufl10-RandomWeights.pdf",
       citation: {venue: "2011, ICML", bibtex: false}
      },
      {title: "Sparse Filtering",
       authors: ["Ngiam, J.", "Chen, Z.", "Bhaskar, S.A.", "Koh, P.W.", "Ng, A.Y."],
       link: "http://papers.nips.cc/paper/4334-sparse-filtering.pdf",
       citation: {venue: "2011, NIPS (Spotlight Paper)", bibtex: false}
      },
      {title: "Tiled convolutional neural networks",
       authors: ["Quoc, V.L.", "Ngiam, J.", "Chen, Z.", "Chia, D.", "Koh, P.W.", "Ng, A.Y."],
       link: "http://www.robotics.stanford.edu/~ang/papers/nips10-TiledConvolutionalNeuralNetworks.pdf",
       citation: {venue: "2010, NIPS", bibtex: false}
      },
      {title: "Lower Bound on the Time Complexity of Local Adiabatic Evolution",
       authors: ["Chen, Z.", "Koh, P.W.", "Yan, Z."],
       link: "http://journals.aps.org/pra/pdf/10.1103/PhysRevA.74.052314",
       citation: {venue: "2006, Physical Review A", bibtex: false}
      }
    ];
    
    var research_work_components = _.map(research_work, function (publication, i) {
      publication.key = i
      return React.createElement(Publication, publication)
    })
    
    var talks_and_other_publications = [
      {title: "Learning good representaions of cell state from cell painting",
       authors: ["Chen, Z.", "Jan, C.", "Li, Frank.", "Xu, J."],
       link: false,
       citation: {venue: "2019, NeurIPS Learning Meaningful Representations of Life Workshop. (Poster, Flash Talk)", bibtex: "...."}
      },
      {title: "Modeling multiplexed images with Spatial-LDA reveals novel tissue microenvironments",
       authors: ["Chen, Z.", "Soifer, I", "Hilton, H.", "Keren, L.", "Jojic, V."],
       link: false,
       citation: {venue: "2019, ICML Computational Biology Workshop. (Poster, Poster Award)", bibtex: "...."}
      },
      {title: "Content-based audio playback speed controller",
       authors: ["Ngiam, J.", "Lee, C.C.", "Charumilind, J.", "Chen, Z."],
       link: "https://patents.google.com/patent/US9741392B2/en",
       citation: {venue: "USPTO 2019. (Patent)", bibtex: "...."}
      },
      {title: "Who’s Benefiting from MOOCs, and Why?",
       authors: ["Chen, Z.", "Alcorn, B.", "Christensen, G.", "Eriksson, N.", "Koller, D.", "Emanuel, E.J."],
       link: "https://hbr.org/2015/09/whos-benefiting-from-moocs-and-why",
       citation: {venue: "September 2015, Harvard Business Review. (Article)", bibtex: "...."}
      },
      {title: "Learning about learning: Lessons from a thousand MOOCs and millions of learners.",
       authors: false,
       link: false,
       citation: {venue: "Singapore IDA iDEAS. (Talk)", bibtex: false}
      },
      {title: "What Matters, What Doesn't? A Coursera-Wide Look at Course Metrics",
       authors: false,
       link: false,
       citation: {venue: "2015 Coursera Partners Conference, Irvine, CA. (Talk)", bibtex: false}
      },
      {title: "Retention and Intention in Massive Open Online Courses",
       authors: ["Koller, D.", "Ng, A.Y.", "Do. C.", "Chen, Z."],
       link: "http://er.educause.edu/articles/2013/6/retention-and-intention-in-massive-open-online-courses-in-depth",
       citation: {venue: "June 2013, Educause Review. (Article)", bibtex: "...."}
      },
      {title: "Self-Driven Mastery in Massive Open Online Courses",
       authors: ["Do, C.B.", "Chen, Z.", "Brandman, R.", "Koller, D."],
       link: "http://online.liebertpub.com/doi/abs/10.1089/mooc.2013.0003",
       citation: {venue: "MOOCs FORUM. September 2013, 1(P): 14-16. doi:10.1089/mooc.2013.0003."}
      },
      {title: "Automated Population-scale Screening for Fragile X: Validation and Experience on 76,421 Samples.",
       authors: ["Patterson, S.A.", "Theilmann, M.R.", "Chen, Z.", "Haque, I.S."],
       link: false,
       citation: {venue: "2013, AMP. (Poster)", bibtex: ""}
      }
    ];
    
    var talks_and_other_publications_components = _.map(talks_and_other_publications, function (publication, i) {
      publication.key = i
      return React.createElement(Publication, publication)
    })

    var education_and_work_background = <div>
      <p>
        I received my B.S. (with honors and distinction) and M.S. (specializing in AI and Biocomputation) in Computer Science 
        from <a href="https://stanford.edu/">Stanford University</a> in 2013 and received
        the <a href="http://engineering.stanford.edu/portals/student/terman-awards/2012-2013-terman-awards">Terman award</a> for 
        academic excellence. At Stanford I also worked 
        with <a href="http://www.andrewng.org/">Andrew Ng</a> and <a href="http://ai.stanford.edu/users/koller/">Daphne Koller</a> on
        deep learning and computational biology.
      </p>

      <p>
        I joined <a href="https://coursera.org">Coursera</a> in 2012 as an early employee and was one of the first 2 members of 
        the analytics team. At Coursera, I built core data infrastructure including: our A/B testing platform 
        which served 100s of experiments a month, our recommendations system and data-driven content categorization / ontology,
        ETL tools for data scientists, systems for curating data analysis and more.
        I was also heavily involved in driving key decision making through the use of data including leading what
        was then the largest ever empirical study on the effectiveness of MOOCs and determinants of quality in
        online education / MOOCs.
      </p>

      <p>
        Prior to Coursera, I interned at <a href="http://www.counsyl.com">Counsyl</a> where I worked on 
        improving calling algorithms for Fragile X syndrome testing.
      </p>

      <p>
        Language-wise, I am fluent in English, Mandarin Chinese, Python, R, Javascript and SQL. I am somewhat competent in Matlab, C, Java, and Scala.
      </p>
    
    </div>
    
    var about_me = <div>
      <p>
        I was born and raised in Singapore where I picked up my love of Computer Science and cheap, tasty food.
        In Singapore, I served in the Singapore Armed Forces as a Signals officer and was awarded the Sword of Honour 
        (best overall officer cadet in my graduating class). I enjoy cooking and travelling and I once spent a month
        training to be a safari guide with my good friend (and frequent collaborator) <a href="http://cs.stanford.edu/~pangwei/">Pang Wei Koh</a>.
        I also enjoy reading non-fiction, especially books on military history.
      </p>

      <p>
        I also like sharing and learning new technologies; I have a particular interest in understanding how to 
        teach better through data.
        Before starting at Stanford, Pang Wei and I planned and taught
        a collection of 14 full-day workshops introducting concepts in CS, AI, cryptography and computer networking to
        over a hundred high school students.
      </p>
    
    </div>

    var contacting_me = <div>
      You can reach me via email at <a href="mailto:zhenghao@z-chen.net">zhenghao@z-chen.net</a> or
      connect with me on <a href="https://www.linkedin.com/in/zhenghao-chen-44865036">LinkedIn</a>.
    </div>

    return (
      <div className="container">
        <Section id="1" title={sidebar} contents={introduction}/>
        <Section id="2" title={research_sidebar} contents={research_work_components}/>
        <Section id="3" title="Articles and Talks" contents={talks_and_other_publications_components}/>
        <Section id="4" title="Education and Work History" contents={education_and_work_background}/>
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
