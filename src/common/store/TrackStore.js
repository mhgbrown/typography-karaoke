import _ from 'lodash';

import Track from './Track';
import client from './Contentful';

var path = "";

if(window.location.href.indexOf('github') >= 0) {
  path = path + '/typography-karaoke/';
}

class TrackStore {
  constructor() {
    this.tracks = [];
    this.onAddCallbacks = [];
  }

  addTrack(track) {
    this.tracks.push(track);

    _.each(this.onAddCallbacks, function(func) {
      func(track);
    });
  }

  registerOnAddCallback(func) {
    this.onAddCallbacks.push(func);
  }

  getRandom() {
    return _.sample(this.tracks);
  }

  getTrackById(id) {
    // FIXME for now this works because it's just 3 things
    return _.find(this.tracks, ['id', id]);
  }
}

var trackStore = new TrackStore();

client.getEntries({ content_type: 'audio' })
.then(function (entries) {
  entries.items.forEach(function (entry, index) {
    var subtitlesDataURI = 'data:text/vtt;base64,' + btoa(entry.fields.subtitles)
    trackStore.addTrack(new Track(entry.sys.id, entry.fields.name, entry.fields.track.fields.file.url, subtitlesDataURI));
  });
});

export default trackStore;