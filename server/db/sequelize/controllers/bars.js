import _ from 'lodash';
import Models from '../models';
const Bar = Models.Bar;
const sequelize = Models.sequelize;

function addZero(date){
  date = date.toString();
  return (date.length < 2) ? '0' + date : date;
}

function createDate (date) {
  let month = addZero(date.getMonth());
  let day = addZero(date.getDate());
  
  return Number([date.getFullYear(), month, day].join(''));
}

export function get(req, res, next) {
  const { data } = req.body; 
  let barLookup = {};

  const barIds = data.businesses.map((bar, i) => {
    bar.going = [];
    barLookup[bar.id] = i;
    return bar.id;
  } );

  Bar.findAll({where: { id: barIds }}).then((bars) => {

    //For each bar, updates their last request and the going array if it is a new day
    bars.forEach((bar) => {
      const index = barLookup[bar.id];
      const lastUpdate = createDate(bar.lastRequest);
      const currentDate = createDate(new Date);

      if(currentDate > lastUpdate) {
        bar.going = [];
        Bar.update({ lastRequest: new Date, going: [] }, {where: { id: bar.id }}).then(() => null);
      }
      data.businesses[index].going = bar.going;
    });

    res.json(data);
    return null; 
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Unable to find the bars you requested.');
    return null; 
  })
  return null;
}

export function add(req, res) {
  let data = req.body;
  Bar.findOrCreate({where: { id: data.id } , defaults: { going: [], lastRequest: new Date() }}).then((bar) => {
    if(!req.user){
      res.status(204).send('Cannot add a user if they are not logged in.');
      return null;
    }
    
    let user = bar[0].going.indexOf(req.user.id);

    if(user === -1){
      bar[0].going.push(req.user.id);
    } else {
      bar[0].going.splice(user, 1);
    }

    Bar.update({ going: bar[0].going }, { where: { id: bar[0].id }}).then(() => {
      res.json(req.user.id);
      return null;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('We were unable to add or remove you from the list');
      return null;
    })
    return null;
  })
  .catch((err) => {
    console.log('Yelp encountered an error:');
    console.log(err);
    res.status(500).send('We were unable to find or create the bar you requested');
    return null;
  })
  return null;
}

export default {
  get,
  add
}