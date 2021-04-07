// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import FilmSeeingItem from './FilmSeeingItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _displayDetailForFilm = (film) => {
    // console.log("Display film " + idFilm)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('FilmDetail', {film: film})
  }

 _filmData () {
     if (this.props.screenType === 1) {
       return (this.props.films)
     }
     else if(this.props.screenType === 2) {
       return(this.props.favoritesFilm)
     }
     else if(this.props.screenType === 3) {
       return(this.props.seeingsFilm)
     }
 }

  render() {
    //console.log(this.props)
    return (
        <FlatList
          style={styles.list}
          data={this._filmData()}

          extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => {
            if (this.props.screenType !==3 ) {
              return (<FilmItem
                film={item}
                //isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                favoritesFilm={this.props.favoritesFilm}
                displayDetailForFilm={this._displayDetailForFilm}
              />)
            }
            else {
              return (<FilmSeeingItem
                film={item}
                //isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                favoritesFilm={this.props.favoritesFilm}
                displayDetailForFilm={this._displayDetailForFilm}
              />)
            }
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.props.page < this.props.totalPages) {
              // On appelle la méthode loadFilm du component Search pour charger plus de films
              this.props.loadFilms()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seeingsFilm: state.toggleseeing.seeingsFilm
  }
}

export default connect(mapStateToProps)(FilmList)
