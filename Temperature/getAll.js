import { TEMPERATURE_TOPS } from './common.js';

const FIT_TEMPERATURE = 26;

function getDress(remainTemperature) {
  const res = [];
  const alreadyExist = (category, curAlreadyCategories) => {
    for (const item of curAlreadyCategories) {
      if (item === category) {
        return true;
      }
    }
    return false;
  }
  const arr = TEMPERATURE_TOPS.sort((a, b) => {
    return b.temperature - a.temperature;
  });
  const dfs = (curTemperature, index, alreadyCategories, curRes) => {
    let curRemain = curTemperature;
    const curAlreadyCategories = alreadyCategories;
    const curResNew = curRes;
    if (curRemain <= 0 || index >= arr.length - 1) {
      res.push(curResNew);
      return;
    }
    if (!alreadyExist(arr[index].category, curAlreadyCategories)) {
      curResNew.push(arr[index].name);
      curRemain -= arr[index].temperature;
      curAlreadyCategories.push(arr[index].category);
    }
    dfs(curRemain, index + 1, curAlreadyCategories, curResNew);
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].temperature <= remainTemperature / 4) {
      break;
    }
    dfs(remainTemperature, i, [], []);
  }
  return res;
}

function getAll(curTemperature) {
  return getDress(FIT_TEMPERATURE - curTemperature);
}

console.table(getAll(1));