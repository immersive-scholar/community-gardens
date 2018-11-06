const PathToPicture = (folder, filename) => {
  return [
    {
      srcSet: require(`assets/${folder}/${filename}-sm.jpg`),
      media: "(max-width: 720px)"
    },
    {
      srcSet: require(`assets/${folder}/${filename}.jpg`),
      media: "(max-width: 1400px)"
    },
    {
      srcSet: require(`assets/${folder}/${filename}-xl.jpg`)
    }
  ];
};

export default PathToPicture;
