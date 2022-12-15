const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(talkersPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
};

const writeFile = async (data) => { 
  try {
    await fs.writeFile(talkersPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.log(`Error on write file ${error.message}`);
    return false;
  }
};

module.exports = {
  readFile,
  writeFile,
};
