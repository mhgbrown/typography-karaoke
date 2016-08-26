import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';
import _ from 'lodash';

import fontStore from '../../common/store/FontStore.js'

import styles from "./style.css";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fonts: fontStore.fonts
    };
  }

  render() {
    var path = '/';
    if(window.location.href.indexOf('github') >= 0) {
      path = path + 'typography-karaoke/';
    }

    var fontItems = _.map(this.state.fonts, function(font) {
      var link = path + 'karaoke/' + font.name;

      return (
        <li>
          <Link to={ link }>
            <p>{ font.name }</p>
          </Link>
        </li>
      );
    });

    return (
      <ul className={ styles.directory }>
        { fontItems }
      </ul>
    );
  }
}