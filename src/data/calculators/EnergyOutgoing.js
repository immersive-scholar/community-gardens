// a high energyOutgoing score is bad
const EnergyOutgoing = d => {
  let energyOutgoing = 0;

  // if the user is searching for a job, it consumes energy
  const jobSearch = parseInt(d.Job_search, 10);
  if (jobSearch === 1) {
    energyOutgoing += 2;
  }

  // if the student is fulltime, then working more takes more energy
  let workHours = parseInt(d.workhours, 10) || 0;

  // If the individual works full-time, their workhours ‘cost’ twice as much energy as if they are part-time
  const fullTime = parseInt(d.FT_PT, 10) === 1;
  // energyOutgoing += fullTime ? workHours * 2 : workHours;

  // some degrees take more energy to pursue than others
  const degree = parseInt(d.Degree, 10);
  switch (true) {
    // Associates
    case degree === 1:
      break;
    // Bachelors
    case degree === 2:
      energyOutgoing += 2;
      break;
    // Masters, Doctoral
    case degree === 3:
      energyOutgoing += 4;
      break;
    default:
      break;
  }

  // any temporary housing, by Month or Year
  const sleptInShelterM = parseInt(d.sleep51, 10) === 1;
  const sleptInShelterY = parseInt(d.sleep52, 10) === 1;
  energyOutgoing += sleptInShelterM * 3 + sleptInShelterY;

  const couchSurfM = parseInt(d.sleep71, 10) === 1;
  const couchSurfY = parseInt(d.sleep72, 10) === 1;
  energyOutgoing += couchSurfM * 3 + couchSurfY;

  const tempHotelM = parseInt(d.sleep81, 10) === 1;
  const tempHotelY = parseInt(d.sleep82, 10) === 1;
  energyOutgoing += tempHotelM * 3 + tempHotelY;

  // if you are sleeping outside you spend a lot of energy
  // just by being alert
  const outdoorsM = parseInt(d.sleep121, 10) === 1;
  const outdoorsY = parseInt(d.sleep122, 10) === 1;
  energyOutgoing += (outdoorsM * 4 + outdoorsY) * 2;

  // if you are sleeping in an inhabitable space you spend a lot of energy
  // hoping you don't die
  const inhabitableSpaceM = parseInt(d.sleep131, 10) === 1;
  const inhabitableSpaceY = parseInt(d.sleep132, 10) === 1;
  energyOutgoing += (inhabitableSpaceM * 4 + inhabitableSpaceY) * 2;

  // if you have children
  const hasChildren = parseInt(d.Children, 10) === 1;
  energyOutgoing += hasChildren ? 4 : 0;

  // if you are a FirstGen, you have to learn everything on your own
  const isFirstGen = d.FirstGen === "Y";
  energyOutgoing += isFirstGen ? 2 : 0;

  return energyOutgoing;
};

export default EnergyOutgoing;
