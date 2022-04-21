const csv = require('csv-parser');
const fs = require('fs');
const args = process.argv.slice(2);

const names = require('./ingredients-data').default;
const numberedFields = ['protein', 'carbs', 'fats'];
const result = [];

const processIngredients = ingredients => {
  const result = [];
  
  ingredients
    .split(',')
    .map(el => names
      .forEach(name => el.includes(name)
        ? result.push({title: name, info: el.replace(name, '').trim(), imgUrl: ''})
        : null));
  
  return result;
};

const normalizeProperty = property => {
  let key = (property[0] || '').toLowerCase().trim().replace(' ', '_');
  let value = property[1].trim();
  
  if (key === 'ingredients') {
    value = processIngredients(value);
  }
  
  if (!value.toString().localeCompare('yes', undefined, {sensitivity: 'accent'})) {
    value = true;
  }
  
  if (!value.toString().localeCompare('no', undefined, {sensitivity: 'accent'})) {
    value = false;
  }
  
  if (numberedFields.includes(key)) {
    value = value.replace('g', '').trim();
  }
  
  if (key === 'youtube_link') {
    value = value.split(',').map(el => el.trim());
    
    if (!value[0]) {
      value = [];
    }
  }
  
  if (key === 'directions') {
    value = value.split(/\d+\./).map(el => el.trim()).filter(Boolean);
  }
  
  property[0] = key;
  property[1] = value;
  
  return property;
}

const normalizeRow = row => Object.fromEntries(Object.entries(row).map(property => normalizeProperty(property)));

let count = 1;
fs.createReadStream(args[0])
  .pipe(csv())
  .on('data', row => {
    const normalized = normalizeRow(row);
    result.push(normalized);
    count++;
  })
  .on('end', _ => {
    const json = JSON.stringify(result, null, '\t');
    const writeCallback = _ => console.log(`Finished. Processed: ${ count } documents`);
    
    fs.writeFile('result.json', json, 'utf8', writeCallback);
  });