// file of constants, such as locations of images, and the songs

// Path: app/CONSTANTS.js
// Compare this snippet from app/songs.js:
// export a component that is an object called Constants
// that has a property called songs, which is an array of objects
// each object has a name and src property
export const Constants = {
  songs: [
    {
      name: "song0",
      src: "../audio/song0.mp3",
    },
    {
      name: "song1",
      src: "../audio/song1.mp3",
    },
    {
      name: "song2",
      src: "../audio/song2.mp3",
    },
  ],
  sfx: [
    "../audio/da.mp3",
    "../audio/due.mp3",
    "../audio/ce.mp3",
    "../audio/yeahthatsright.mp3",
  ],
};
