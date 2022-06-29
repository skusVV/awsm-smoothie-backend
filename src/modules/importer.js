const csv = require('csv-parser');
const fs = require('fs');
const args = process.argv.slice(2);
const ObjectId = require('mongodb').ObjectId

const names = require('./ingredients-data').default.map(el => el.toLowerCase());
const numberedFields = ['protein', 'carbs', 'fats'];
const result = [];

const processIngredients = ingredients => {
  const result = [];
  
  ingredients
    .toLowerCase()
    .split(', ')
    .forEach(el => {
        const namesLength = names.length;
        
        for (let i = 0; i < namesLength; i++) {
          if (el.includes(names[i])) {
            result.push({
              title: names[i],
              info: el
                .replace(names[i], '')
                .replace(/ of |,/gi, '')
                .replace(/ /g, ' ')
                .trim(),
              imgUrl: '',
              ingredient_id: nornalizeName(names[i])});
            return;
          }
        }
      }
    );
  
  return result;
};
const processCategories = categories => categories.split(', ').map(el => nornalizeName(el))

const normalizeProperty = property => {
  let key = (property[0] || '').toLowerCase().trim().replace(' ', '_');
  let value = property[1].trim();
  
  if (key === 'ingredients') {
    value = processIngredients(value);
  }
  
  if (key === 'category') {
    key = 'categories';
    value = processCategories(value);
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
  
  if (key === 'images') {
    value = value.split(',').map(el => el.trim());
    
    if (!value[0]) {
      value = ['https://storage.googleapis.com/smoothie_bucket/recipes/not-found.jpg'];
    }
  }
  
  property[0] = key;
  property[1] = value;
  
  return property;
}

const normalizeRow = row => Object.fromEntries(Object.entries(row).map(property => normalizeProperty(property)));

const addOptions = row => {
  row.name;
  return {
    _id: {
      $oid: new ObjectId()
    },
    ...row,
    title: row.name,
    name: nornalizeName(row.name),
    videoUrl: row.youtube_link[0] && `https://www.youtube.com/embed/${row.youtube_link[0]?.split('/')?.pop()}` || '',
    badges: [
      {
        type: 'time',
        info: '10 minutes'
      },
      {
        type: 'serving',
        info: '2 portions'
      },
      {
        type: 'timeframe',
        info: row.meal_replacement_time && row.meal_replacement_time.split(', ').map(i => capitalize(i)).join(', ') || 'Breakfast'
      }
    ],
    labels: row.diet_type.split(','),
    author_id: 'kaivan-dave',
    overviewDescription: row.overview,
    overviewParagraphs: row.overview.split('|'),
    timeToRead: 6,
    date: 'July 20, 2022',
    reviewer_id: 'kelsey-butler'
  }
}

const nornalizeName = value => value.toLowerCase().trim().replace(/ /g, '-');
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

let count = 1;
fs.createReadStream(args[0])
  .pipe(csv())
  .on('data', row => {
    const normalized = addOptions(normalizeRow(row));
    
    result.push(normalized);
    count++;
  })
  .on('end', _ => {
    const json = JSON.stringify(result, null, '\t');
    const writeCallback = _ => console.log(`Finished. Processed: ${count} documents`);
    
    fs.writeFile('result.json', json, 'utf8', writeCallback);
  });