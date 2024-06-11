var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('underscore');

const Citation = React.createClass({
  render: function () {
    return (
      <div className="citation">
        {this.props.venue}
      </div>
    );
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

var talks_and_other_publications = [
  {title: "Automatically generated flash cards",
   authors: ["Chen, Z.", "Ngiam, J.", "Koller, D"],
   link: "https://patents.google.com/patent/US10453354B2/en",
   citation: {venue: "USPTO 2019. (Patent)", bibtex: "...."}
  },
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

export var talks_component = _.map(talks_and_other_publications, function (publication, i) {
  publication.key = i
  return React.createElement(Publication, publication)
})
