var React = require('react');
var ReactDOM = require('react-dom');
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
var paper_listing = [
  {title: "Gut metagenomes reveal interactions between dietary restriction, ageing and the microbiome in genetically diverse mice.",
    authors: ["Litichevskiy, L.", "Considine, M.", "Gill, J.", "Shandar, V.", "Cox, T.", "Descamps, H.", "Wright, K.", "Amses, K.", "Dohnalová, L.", "Liou, M.", "Tetlak, M.", "Galindo-Fiallos, M.", "Wong, A.", "Lundgren, P.", "Kim, J.", "Uhr, G.", "Rahman, R.", "Mason, S.", "Merenstein, C.", "Bushman, F.", "Raj, A.", "Harding, F.", "Chen, Z.", "Prateek, G.", "Mullis, M.", "Deighan, A.", "Robinson, L.", "Tanes, C.", "Bittinger, K.", "Chakraborty, M.", "Bhatt, A.", "Li, H.", "Barnett, I.", "Davenport, E.", "Broman, K.", "Levy, M.", "Cohen, R.", "Botstein, D.", "Freund, A.", "Di Francesco, A.", "Churchill, G.", "Li, M.", "Thaiss, C."],
    link: "https://www.nature.com/articles/s41564-025-01963-3",
    citation: {venue: "2025, Nature Microbiology", bibtex: false}
  },
  {title: "BiDAC-dependent degradation of plasma membrane proteins by the endolysosomal system.",
    authors: ["Villa, S.", "Jafri, Q.", "Lazzari-Dean, J.", "Sangha, M.", "Olsson, N.", "Lefebvre, A.", "Fitzgerald, M.", "Jackson, K.", "Chen, Z.", "Feng, B.", "Nile, A.", "Stokoe, D.", "Bersuker, K."],
    link: "https://www.nature.com/articles/s41467-025-59627-z",
    citation: {venue: "2025, Nature Communications", bibtex: false}
  },
  {title: "Baikal: Unpaired Denoising of Fluorescence Microscopy Images using Diffusion Models.",
    authors: ["Chaudhary, S.", "Sankarapandian, S.", "Sooknah, M.", "Pai, J.", "McCue, C.", "Chen, Z.", "Xu, J."],
    link: "https://papers.miccai.org/miccai-2024/paper/3885_paper.pdf",
    citation: {venue: "2024, MICCAI", bibtex: false}
  },
  {title: "Dietary restriction impacts health and lifespan of genetically diverse mice.",
    authors: ["Di Francesco, A.", "Deighan, A.", "Litichevskiy, L.", "Chen, Z.", "Luciano, A.", "Robinson, L.", "Garland, G.", "Donato, H.", "Vincent, M.", "Schott, W.", "Wright, K.", "Raj, A.", "Prateek, G.", "Mullis, M.", "Hill, W.", "Zeidel, M.", "Peters, L.", "Harding, F.", "Botstein, D.", "Korstanje, R.", "Thaiss, C.", "Freund, A.", "Churchill, G."],
    link: "https://www.nature.com/articles/s41586-024-08026-3",
    citation: {venue: "2024, Nature", bibtex: false}
  },
  {title: "Analysis of somatic mutations in whole blood from 200,618 individuals identifies pervasive positive selection and novel drivers of clonal hematopoiesis.",
    authors: ["Bernstein, N.", "Chapman, M.S.", "Nyamondo, K.", "Chen, Z.", "Williams, N.", "Mitchell, E.", "Campbell, P.", "Cohen, R.L.", "Nangalia, J."],
    link: "https://www.nature.com/articles/s41588-024-01755-1",
    citation: {venue: "2024, Nature Genetics", bibtex: false}
  },  
  {title: "Senescence rewires microenvironment sensing to facilitate antitumor immunity.",
   authors: ["Chen, H.", "Ho, Y.", "Mezzadra, R.", "Adrover, J.M.", "Smolkin, R.", "Zhu, C.", "Woess, K.",
   "Bernstein, N.", "Schmitt, G.", "Fong, L.", "Luan, W.", "Wuest, A.", "Tian, S.", "Li, X.", "Broderick, C.",
   "Hendrickson, R.C.", "Egeblad, M.", "Chen, Z.", "Alonso-Curbelo, D.", "Lowe, S.W."],
   link: "https://aacrjournals.org/cancerdiscovery/article/13/2/432/716311",
   citation: {venue: "2023, Cancer Discovery", bibtex: false}
  },
  {title: "The immunoregulatory landscape of human tuberculosis granulomas.",
   authors: ["McCaffrey, E.F.", "Donato, M.", "Keren, L.", "Chen, Z.", "Delmastro, A.", "Fitzpatrick, M.B.", "Gupta, S.", "Greenwald, N.F.",
   "Baranski, A.", "Graf, W.", "Kumar, R.", "Bosse, M.", "Camacho Fullaway, C.", "Ramdial, P.K.", "Forgó, E.", "Jojic, V.",
   "Van Valen, D.", "Mehra, S.", "Khader, S.A.", "Bendall, S.C.", "van de Rijn, M.", "Kalman, D.", "Kaushal, D.", "Hunter, R.L.",
   "Banaei, N.", "Steyn, A.J.C.", "Khatri, P.", "Angelo, M"],
   link: "https://www.nature.com/articles/s41590-021-01121-x.",
   citation: {venue: "2022, Nature Immunology.", bibtex: false}
  },
  {title: "Automated, high-dimensional evaluation of physiological aging and resilience in outbred mice.",
   authors: ["Chen, Z.", "Raj, A.", "Gundannavar Vijay, P.", "Di Francesco, A.", "Liu, J.", "Keyes, B.", "Kolumam, G.",
   "Jojic, V.", "Freund, A"],
   link: "https://elifesciences.org/articles/72664.",
   citation: {venue: "2022, eLife.", bibtex: false}
  },
  {title: "Find your microenvironments faster with Neural Spatial LDA.",
    authors: ["Sankarapandian, S.", "Xu, J.", "Chen, Z."],
    link: "https://openreview.net/pdf/8b8717bb124d70db08d275f1f14219d1437ad524.pdf",
    citation: {venue: "2022, NeurIPS Learning Meaningful Representations of Life Workshop", bibtex: false}
  },
  {title: "Modeling Multiplexed Images with Spatial-LDA Reveals Novel Tissue Microenvironments",
   authors: ["Chen, Z.", "Soifer, I.", "Hilton, H.", "Keren, L.", "Jojic, V."],
   link: "https://www.liebertpub.com/doi/pdf/10.1089/cmb.2019.0340",
   citation: {venue: "2020, JCB", bibtex: false}
  },
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

export var papers_component = _.map(paper_listing, function (publication, i) {
  publication.key = i
  return React.createElement(Publication, publication)
})
