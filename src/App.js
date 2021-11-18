import React from 'react';
import './App.css';

let questions = [
  {
    'id': 1,
    'question': 'En 1863, Jules Verne publie cinq semaines...',
    'reponses': [
      ['En avion', false],
      ['En camion', false],
      ['En ballon', true],
      ['Environ', false]
    ]
  },
  {
    'id': 2,
    'question': 'Quelle était la profession du père de Pinocchio ?',
    'reponses': [
      ['Garagiste', false],
      ['Menuisier', true],
      ['Aubergiste', false],
      ['Ramoneur', false]
    ]
  },
  {
    'id': 3,
    'question': "Quel est l'autre nom du globule blanc ?",
    'reponses': [
      ['Leucocyte', true],
      ['Ostéoblaste', false],
      ['Gamète', false],
      ['Hématie', false]
    ]
  },
  {
    'id': 4,
    'question': "Parmi les sept merveilles du monde, on comptait les jardins suspendus siégeant...",
    'reponses': [
      ['à Ephèse', false],
      ['à Rhodes', false],
      ['à Babylone', true],
      ['à Constantinople', false]
    ]
  },
  {
    'id': 5,
    'question': "Le point culminant du Japon est appelé le mont Fuji, il réside sur l'île...",
    'reponses': [
      ['Kyushu', false],
      ['Shikoku', false],
      ['Hokkaido', false],
      ['Honshu', true]
    ]
  },
  {
    'id': 6,
    'question': "Louis XVI et Marie-Antoinette furent guillotinés en 1793 à Paris sur l'actuelle :",
    'reponses': [
      ['Place de la Bastille', false],
      ['Place de la Nation', false],
      ['Place de la République', false],
      ['Place de la Concorde', true]
    ]
  },
  {
    'id': 7,
    'question': "Combien, le célèbre basketteur américain 'Magic' Johnson, mesure-t-il environ ?",
    'reponses': [
      ['1,90m', false],
      ['1,95m', false],
      ['2,05m', true],
      ['2,15m', false]
    ]
  },
  {
    'id': 8,
    'question': "Quand on subit une opération chirurgicale, on dit familièrement qu'on \"passe...",
    'reponses': [
      ['À la caisse', false],
      ['Sur le billard', true],
      ['Du rire aux larmes', false],
      ['Son bac', false]
    ]
  },
  {
    'id': 9,
    'question': "Quel est le pays le plus peuplé de l'Union européenne ?",
    'reponses': [
      ['L\'Allemagne', true],
      ['La France', false],
      ['L\'Angleterre', false],
      ['L\'Espagne', false]
    ]
  },
  {
    'id': 10,
    'question': "Combien de temps a duré la guerre de 100 ans ?",
    'reponses': [
      ['99', false],
      ['100', false],
      ['116', true],
      ['150', false]
    ]
  }
];

class Question extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      question : questions[0],
      reponse : "",
      score : 0
    }

    this.choixReponse = this.choixReponse.bind(this);
    this.validate = this.validate.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  };

  componentDidMount(){
    document.getElementById("valider").disabled = true;
    document.getElementById("suivant").disabled = true;
  }

  choixReponse(e){
    e.preventDefault();
    this.setState({reponse: parseInt(e.target.id)});
    document.querySelectorAll("#reponses button").forEach(item => item.disabled = true);
    document.getElementById("valider").disabled = false;
  }

  validate(e){
    e.preventDefault();

    if(this.state.question.reponses[this.state.reponse][1] === true){
      document.getElementById(this.state.reponse).style.border = "3px solid #87986a";
      this.setState({score: this.state.score + 1});
    } else {
      document.getElementById(this.state.reponse).style.border = "3px solid #ae2012";
      let index = this.state.question.reponses.indexOf(this.state.question.reponses.filter(item => item[1] === true)[0]);
      document.getElementById(index).style.border = "3px solid #87986a";
    }

    document.getElementById("valider").disabled = true;
    document.getElementById("suivant").disabled = false;
  }

  nextQuestion(e){
    e.preventDefault();
    document.querySelectorAll("#reponses button").forEach(item => item.style.border = null);
    document.querySelectorAll("#reponses button").forEach(item => item.disabled = false);
    document.getElementById("valider").disabled = true;
    document.getElementById("suivant").disabled = true;
    if(questions[questions.indexOf(this.state.question) + 1]){
      this.setState({question: questions[questions.indexOf(this.state.question) + 1]});
    } else {
      this.props.getScorePage(this.state.score);
    }
  }

  render() {
    return (
      <div id="question-component">
        <p className="question">{this.state.question.id}. {this.state.question.question}</p>
        <div id="reponses">
          <button className="r0" id="0" onClick={this.choixReponse}>{this.state.question.reponses[0][0]}</button>
          <button className="r1" id="1" onClick={this.choixReponse}>{this.state.question.reponses[1][0]}</button>
          <button className="r2" id="2" onClick={this.choixReponse}>{this.state.question.reponses[2][0]}</button>
          <button className="r3" id="3" onClick={this.choixReponse}>{this.state.question.reponses[3][0]}</button>
        </div>

        <button id="valider" onClick={this.validate}>Valider</button>
        <button id="suivant" onClick={this.nextQuestion}>Suivant</button>
      </div>
    )
  }
};

class ScoreScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      score: this.props.score
    }
  }

  componentDidMount(){
    if(this.state.score < 6){
      document.getElementById("final-score").style.color = "#ae2012";
    } else if (this.state.score > 7){
      document.getElementById("final-score").style.color = "#87986a";
    }
  }

  render(){

    return (
      <div>
        <h2 id="score-titre">Votre score :</h2>
        <p id="score"><span id="final-score">{this.props.score}</span> / {questions.length}</p>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: <div id="welcome"><h1>Bienvenue !</h1><button onClick={this.startQuiz}>Commencer le quiz</button></div>
    }

    this.startQuiz = this.startQuiz.bind(this);
    this.getScorePage = this.getScorePage.bind(this);
    
  }

  componentDidMount(){
    this.setState({content: <div id="welcome"><h1>Bienvenue !</h1><button onClick={this.startQuiz}>Commencer le quiz</button></div>})
  }

  startQuiz(e){
    e.preventDefault()
    this.setState({content: <Question getScorePage={this.getScorePage}/>})
  }

  getScorePage(score){
    this.setState({content: <ScoreScreen score={score}/>})
  }

  render() {
  return (
    <div id="main">
      {this.state.content}
    </div>
  )};
};

export default App;
