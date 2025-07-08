const axios = require('axios');
const Weapon = require('../classes/Weapon/Weapon.js');

module.exports = async function getAssetInfo(apiKey, appId, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');
  
    try {
      const response = await axios.get('https://market.csgo.com/api/full-export/RUB.json');
      const items = response.data.items;
      
      // Функция для задержки
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      
      const assetUrl = `https://market.csgo.com/api/full-export/${items[1]}`;
      
      try {
        const assetResponse = await axios.get(assetUrl);
        let counter = 0;

        for (const element of assetResponse.data) {
          const itemURL = `https://api.steampowered.com/ISteamEconomy/GetAssetClassInfo/v1/?appid=${appId}&classid0=${element[3]}&key=${apiKey}&class_count=1`;

          try {
            const resultInfo = await axios.get(itemURL);
            const type = resultInfo.data.result[element[3]].type;

            if (type === 'High Grade Sticker' ||
                type === 'Base Grade Graffiti' ||
                type === 'Exotic Sticker') {
                continue;
            }

            const classID = resultInfo.data.result[element[3]].classid;
            const imageURL = `https://community.cloudflare.steamstatic.com/economy/image/${resultInfo.data.result[element[3]].icon_url}/140fx105f/image.png`;
            const name = resultInfo.data.result[element[3]].name;
            const rarity = resultInfo.data.result[element[3]].tags['4'].name;

            const weapon = new Weapon(
              classID,
              imageURL,
              type,
              name,
              rarity,
            );

            res.write(JSON.stringify(weapon));
            counter++;

            if (counter > 21) {
              await delay(500);
            }
            
          } catch (error) {
            console.error(`Ошибка получения результата для ${element[3]}: ${error.message}`);
          }
        }
      } catch (error) {
        console.error(`Ошибка при получении информации о предмете: ${error.message}`);
      }
  
      res.end();
    } catch (error) {
      console.error('Ошибка при запросе:', error.message);
      res.status(500).send('Ошибка при запросе: ' + error.message);
    }
};