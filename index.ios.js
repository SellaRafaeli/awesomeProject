/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
//'use strict';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      score: 12,
      foo: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          score: 14,
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    //return this.renderLoadingView();
    if (this.state.view == 'singlePost') {
      return this.renderSinglePost();
    }

    //this.state.view == 'list'
    return (
      <View>
          <View style={styles.container}>
            <Text>
              MyScore: {this.state.score} {/*More: {this.state.scorez+10}}*/}
            </Text>
          </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            style={styles.listView}
          />
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderSinglePost: function(x) {
    var post = this.state.singlePost;
    return (
      <View style={styles.container}>
        <Text onPress={() => this.setState({view: 'list'})} >
          Back'\n\n'
        </Text>
        <Text>
          Title: {post.title+'\n\n'}
          Single Question {x}
          {/*Keys: {Object.keys(this.state.singlePost)}*/}
        </Text>
         
        {/*
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year} 
                onPress={() => this.setState({score: ++this.state.score})}
          >{movie.year}</Text>
        </View>*/}
      </View>
    );
  },

  renderMovie: function(post) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: post.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}
          
        >
          <Text style={styles.title}
            onPress={() => this.setState({singlePost: post, view: 'singlePost'})}            
          >{post.title}</Text>
          <Text style={styles.year} 
                onPress={() => this.setState({score: ++this.state.score})}
                //onPress={() => this.render(10)} //this.renderSingleQuestion(10)}
          >{post.year}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  year: {
    textAlign: 'center',
  }
});


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
