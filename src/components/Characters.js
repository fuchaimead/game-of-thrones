import React, { Component } from 'react';
import { Header, Segment, Card, Image } from 'semantic-ui-react';
import axios from 'axios'

class Characters extends Component {
  state = { characters: []}

  componentDidMount() {
    axios.get('https://api.got.show/api/characters/')
    .then( res => {
      this.setState({characters: res.data})
    })
    .catch(err => {
      console.log(err.response);
  });
  }

  displayCharacters = ()  => {
    return this.state.characters.map( character => {
      return( 
        <Card key={character._id}>
          {character.imageLink ?
                <Image
                  centered
                  src={ `https://api.got.show/${character.imageLink}`}
                  alt={`${character.name} image`}
                />
                :
                <p> nothing </p> }
            <br />
        <Card.Content>
          <Card.Header>
            {character.name}
          </Card.Header>
          <Card.Description> 
            Date of Birth: {character.dateOfBirth}
            <br />
            Date of Death: {character.dateOfDeath}
            <br />
            House: {character.house}
            <br />
            Heir: {character.heir}
          </Card.Description> 
        </Card.Content>
      </Card>
      )
    })
  }




  render() {
    return (
      <Segment basic> 
        <Header as='h1' textAlign='center'>Game of Thrones</Header>
        <Card.Group stackable itemsPerRow={5}> 
        {this.displayCharacters()}
        </Card.Group> 
      </Segment> 
    );
  }
}

export default Characters;
