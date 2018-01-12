import React, { Component } from 'react';
import { Header, Segment, Card, Button, Modal, Image, List } from 'semantic-ui-react';
import axios from 'axios'

class Home extends Component {
  state = { episodes: []}

  componentDidMount() {
    axios.get('https://api.got.show/api/episodes/')
    .then( res => {
      this.setState({episodes: res.data})
    })
    .catch(err => {
      console.log(err.response);
  });
  }

  displayCharacters = (episode)  => {
    return episode.characters.map( character => {
      return( 
        <List.Item key={character._id}> 
        {character}
      </List.Item> 
      )
    })
  }

  displayEpisodes = () => {
    return this.state.episodes.map( episode => {
      return(
        <Card key={episode._id}>
          <Card.Content>
            <Card.Header>
              {episode.name}
            </Card.Header>
          </Card.Content>
          <Card.Meta> 
           Directed by: {episode.director}
          </Card.Meta> 
          <Modal trigger={<Button>View Description</Button>}>
            <Modal.Header>{episode.name}</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Header>Characters</Header>
                <List>
                  {this.displayCharacters(episode)}
               </List> 
               <List> 
                <List.Item> 
                Season: {episode.season}
                </List.Item> 
                <List.Item> 
                Director: {episode.director}
                </List.Item> 
                <List.Item> 
                Air Date: {episode.airDate}
                </List.Item>
                </List>
              </Modal.Description>
            </Modal.Content>
          </Modal> 
        </Card>
        )
      })
  }


  render() {
    return (
      <Segment basic> 
        <Header as='h1' textAlign='center'>Game of Thrones</Header>
        <Card.Group stackable itemsPerRow={5}> 
        {this.displayEpisodes()}
        </Card.Group> 
      </Segment> 
    );
  }
}

export default Home;
