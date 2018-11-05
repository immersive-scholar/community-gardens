const PathToPicture = (folder, filename) => {
  return [
    {
      srcSet: require(`../assets/${folder}/${filename}-thumb.jpg`),
      media: "(max-width: 100px)"
    },
    {
      srcSet: require(`../assets/${folder}/${filename}-sm.jpg`),
      media: "(max-width: 720px)"
    },
    {
      srcSet: require(`../assets/${folder}/${filename}.jpg`)
    }
  ];
};

export default PathToPicture;
