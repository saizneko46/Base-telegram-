const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const settings = require('./settings');
const botToken = settings.token;
const adminfile = 'adminID.json';
const premiumUsersFile = 'premiumUsers.json';
const bot = new TelegramBot(botToken, { polling: true });
const runningProcesses = {};
const { exec } = require('child_process'); // Import modul exec


let adminUsers = [];
try {
    adminUsers = JSON.parse(fs.readFileSync(adminfile));
} catch (error) {
    console.error('Error reading adminUsers file:', error);
}

let premiumUsers = [];
try {
    premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}

function readDatabase() {
    try {
        const data = fs.readFileSync('./database.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Gagal membaca database:", err);
        return [];
    }
}

function saveDatabase(data) {
    try {
        fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Gagal menyimpan database:", err);
    }
}

function addIdToDatabase(id) {
    let database = readDatabase();
    database.push({ id });
    saveDatabase(database);
}

function isIdInDatabase(id) {
    const database = readDatabase();
    return database.some(entry => entry.id === id);
}

function removeIdFromDatabase(id) {
    let database = readDatabase();
    database = database.filter(entry => entry.id !== id);
    saveDatabase(database);
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const from = msg.from.id;
    const usr = msg.from.username;
    if (!isIdInDatabase(from)) {
        bot.sendPhoto(chatId, settings.pp, { 
            caption: `╭╮╱╱╭┳━━━┳━╮╱╭┳━━━━╮
┃╰╮╭╯┃╭━╮┃┃╰╮┃┣━━╮━┃
╰╮╰╯╭┫┃╱┃┃╭╮╰╯┃╱╭╯╭╯
╱╰╮╭╯┃╰━╯┃┃╰╮┃┃╭╯╭╯╱
╱╱┃┃╱┃╭━╮┃┃╱┃┃┣╯━╰━╮
╱╱╰╯╱╰╯╱╰┻╯╱╰━┻━━━━╯
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

⏍ HAI KAK👋 @${usr} 🗿

▣┈──⟨ＩＮＦＯ ＢＯＴ
╎友 𝐍𝐀𝐌𝐄 𝐁𝐎𝐓 : 𝙔𝘼𝙉𝙕 𝗧𝗘𝗠𝗣𝗢𝗥𝗔𝗥𝗬
╎友 𝐀𝐔𝐓𝐇𝐎𝐑 : 𝙔𝘼𝙉𝙕 χ 𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙚𝙧
╎友 𝐂𝐑𝐄𝐀𝐓𝐎𝐑 : @XstyanzZx
▣─┈⋆

▭▬▭( 父 𝗦 𝗨 𝗕 - 𝗠 𝗘 𝗡 𝗨 - 𝗨 𝗧 𝗔 𝗠 𝗔 父 )▭▬▭

╔╾──⟨ＲＥＧＩＳＴＥＲ
╎❍︎ /register <𝘥𝘢𝘧𝘵𝘢𝘳 𝘵𝘦𝘳𝘭𝘦𝘣𝘪𝘩 𝘥𝘢𝘩𝘶𝘭𝘶>
╚╾─⬣
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
        });
    } else {
        bot.sendPhoto(chatId, settings.pp, { 
            caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

𝗖𝗔𝗥𝗔 𝗧𝗘𝗠𝗣𝗢𝗥 𝗪𝗔 𝗕𝗬 𝗬𝗔𝗡𝗭😎👌

PENGGUNAAN :
/temp (negara) (nomor) (jumlah)

Contoh : /temp 62 8xxxx 30

𝗕𝘂𝘆 𝗣𝗮𝗻𝗲𝗹 & 𝗕𝘂𝘆 𝗦𝗰? 𝗣𝘃 (@XstyanzZx)
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
        });
    }
});

bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;
    const from = msg.from.id;
    const usr = msg.from.username;
    if (!isIdInDatabase(from)) {
        addIdToDatabase(from);
        bot.sendPhoto(chatId, settings.pp, { 
            caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz 
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

╔╾──⟨ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟✅
╎❍︎ /start <𝘶𝘯𝘵𝘶𝘬 𝘮𝘦𝘮𝘶𝘭𝘢𝘪 𝘤𝘩𝘢𝘵>
╚╾─⬣
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
        });
    } else {
        bot.sendPhoto(chatId, settings.pp, { 
            caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

╔╾──⟨ 𝗦𝗨𝗗𝗔𝗛 𝗧𝗘𝗥𝗗𝗔𝗙𝗧𝗔𝗥✅
╎❍︎ /start <𝘶𝘯𝘵𝘶𝘬 𝘮𝘦𝘮𝘶𝘭𝘢𝘪 𝘤𝘩𝘢𝘵>
╚╾─⬣
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
        });
    }
});


bot.onText(/\/temp/, (msg) => {
    const chatId = msg.chat.id;
    const from = msg.from.id;
    const usr = msg.from.username;
    const args = msg.text.split(/\s+/); // Memisahkan pesan menjadi array kata-kata

    if (runningProcesses[chatId]) {
        bot.sendPhoto(chatId, settings.pp, {
            caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

╔╾──⟨ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦✅
╎❍︎ /stop <𝘶𝘯𝘵𝘶𝘬 𝘴𝘵𝘰𝘱 𝘵𝘦𝘮𝘱𝘰𝘳>
╚╾─⬣
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
        });
    } else {
        if (args.length !== 4) {
            bot.sendPhoto(chatId, settings.pp, {
                caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

𝗖𝗔𝗥𝗔 𝗧𝗘𝗠𝗣𝗢𝗥 𝗪𝗔 𝗕𝗬 𝗬𝗔𝗡𝗭😎👌

PENGGUNAAN :
/temp (negara) (nomor) (jumlah)

Contoh : /temp 62 8xxxx 30

𝗕𝘂𝘆 𝗣𝗮𝗻𝗲𝗹 & 𝗕𝘂𝘆 𝗦𝗰? 𝗣𝘃 (@XstyanzZx)
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
            });
        } else {
            const input1 = args[1];
            const input2 = args[2];
            const timeHours = parseInt(args[3]); // Mengonversi string waktu menjadi bilangan bulat

            if (isNaN(timeHours)) {
                bot.sendPhoto(chatId, settings.pp, {
                    caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

𝗖𝗔𝗥𝗔 𝗧𝗘𝗠𝗣𝗢𝗥 𝗪𝗔 𝗕𝗬 𝗬𝗔𝗡𝗭😎👌

PENGGUNAAN :
/temp (negara) (nomor) (jumlah)

Contoh : /temp 62 8xxxx 30

𝗕𝘂𝘆 𝗣𝗮𝗻𝗲𝗹 & 𝗕𝘂𝘆 𝗦𝗰? 𝗣𝘃 (@XstyanzZx)
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
                });
            } else {
                const command = `node temp.js ${input1} ${input2}`;
                const process = exec(command);

                bot.sendPhoto(chatId, settings.pp, {
                    caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

╔╾──⟨ ＷＡＲＮＩＮＧ
╎❍︎ 𝗧𝗔𝗥𝗚𝗘𝗧 : ${input1} ${input2}
╎❍︎ 𝗦𝗧𝗔𝗧𝗨𝗦 : 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟✅
╚╾─⬣
✧
╔╾──⟨ＳＴＯＰ ＴＥＭＰＯＲ
╎❍︎ /stop <𝘶𝘯𝘵𝘶𝘬 𝘴𝘵𝘰𝘱 𝘵𝘦𝘮𝘱𝘰𝘳>
╚╾─⬣
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
                });
                runningProcesses[chatId] = true;

                setTimeout(() => {
                    delete runningProcesses[chatId];
                    bot.sendPhoto(chatId, settings.pp, {
                        caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

╔╾──⟨ ＷＡＲＮＩＮＧ
╎❍︎ 𝗧𝗔𝗥𝗚𝗘𝗧 : ${input1} ${input2}
╎❍︎ 𝗦𝗧𝗔𝗧𝗨𝗦 : 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟✅
╚╾─⬣
✧
╔╾──⟨ＳＴＯＰ ＴＥＭＰＯＲ
╎❍︎ /stop <𝘶𝘯𝘵𝘶𝘬 𝘴𝘵𝘰𝘱 𝘵𝘦𝘮𝘱𝘰𝘳>
╚╾─⬣
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
                    });
                }, timeHours * 60 * 60 * 1000);
            }
        }
    }
});
bot.onText(/\/stop/, (msg) => {
    const chatId = msg.chat.id;
    const usr = msg.from.username;

    if (runningProcesses[chatId]) {
        delete runningProcesses[chatId];
        bot.sendPhoto(chatId, settings.pp, {
            caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

╔╾──⟨ ＰＲＯＣＥＳＳ✅
╎❍︎ 𝗣𝗿𝗼𝘀𝗲𝘀 𝗦𝘁𝗼𝗽 𝗧𝗲𝗺𝗽𝗼𝗿 𝗕𝗮𝗻𝗴!
╚╾─⬣
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
        });
    } else {
        bot.sendPhoto(chatId, settings.pp, {
            caption: `⏍ HAI KAK👋 @${usr}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
╭  ◦ 𝙏𝙀𝙎𝙏𝙄 𝙔𝘼𝙉𝙕 @testigwanjay
│  ◦ 𝙋𝙐𝘽𝙇𝙄𝘾 @publicyanz
╰  ◦ 𝙍𝙊𝙊𝙈 𝙎𝘾𝘼𝙈 -
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

╔╾──⟨ＩＮＦＯＲＭＡＴＩＯＮ
╎❍︎ 𝗦𝗶𝗹𝗮𝗵𝗸𝗮𝗻 𝗞𝗶𝗿𝗶𝗺 𝗡𝗼𝗺𝗼𝗿 𝗧𝗮𝗿𝗴𝗲𝘁!
╚╾─⬣
✧
📮NOTE :
► kalo kena tempor korban ga bisa dapet kode otp
tapi klo mau pake tempor, di no yg udh ke ban dulu
biar ga dapet kode otp pas masuk + hard bukanya🗿`
        });
    }
});