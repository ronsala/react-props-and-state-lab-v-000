import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  adoptPet = () => {
    console.log('in adoptPet')
  }

  changeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      } 
    })
  }

  fetchPets = () => {

    let p;
    if(this.state.filters.type === 'all') {
      fetch('/api/pets').then(resp => {p = resp})
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`).then(resp => {p = resp})
    }

    this.setState({
      pets: p
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
