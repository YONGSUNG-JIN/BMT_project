const User = require('../model/User');
const axios = require('axios');
const https = require("https");
const cheerio = require('cheerio');


// const noticeCtrl = async (req, res) => {
//     const articles = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     const articleList = articles.data
//     res.render('notice.ejs', { articleList })
// }

const homeCtrl = async (req, res) => {
    const eventsPage = await axios(
        'https://www.fastfive.co.kr/#enp_mbris',
        {
            method: "get",
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
        });
    const eventsList = await eventsPage.data.toString();
    const $ = cheerio.load(eventsList);
    // const wrapper = $('.nav_menu_sub_box_link')
    //     console.log(wrapper.length)
    const events = [];
    $('#nav_01 > div > div > div > .nav_menu_sub_box_link > ul > li > a').map((i, el) => {
        const event = $(el).text().trim();
        events.push(event);
    })

    res.render('home.ejs', { events })

}



module.exports = homeCtrl;