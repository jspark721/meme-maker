import React, { Component } from 'react';

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      altText: '',
      randomImg: 'https://memegen.link/buzz/memes/memes_everywhere.jpg',
      allMemeImgs: [],
    };
    //bind the handleChange function
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randomMeme = this.state.allMemeImgs[randomNum];
    const randomMemeImg = randomMeme.url;
    const altText = randomMeme.name;
    this.setState({ randomImg: randomMemeImg, altText: altText });
  }

  render() {
    return (
      <div>
        <form className='meme-form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='topText'
            placeholder='Top Text'
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='bottomText'
            placeholder='Bottom Text'
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>Generate</button>
        </form>
        <div className='meme'>
          <p>
            input top text and bottom text and click generate to view your
            random meme!
          </p>
          <img src={this.state.randomImg} alt={this.state.altText} />
          <h2 className='top'>{this.state.topText}</h2>
          <h2 className='bottom'>{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
