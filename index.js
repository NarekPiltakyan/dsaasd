const { Telegraf } = require('telegraf')
require("dotenv").config()
const bot = new Telegraf(process.env.BOT_TOKEN)


function showMenu(ctx) {
    return ctx.telegram.sendMessage(ctx.chat.id, "🔽 Выберите действие:", {
        reply_markup: {
            keyboard: [
                ["Узнать свое имя (Ты конченный?)"],
                ["Узнать Фамилию"],
                ["Взломать Пентагон"]
            ],
            resize_keyboard: true 
        }
    });
}

bot.start((ctx) => {
    ctx.reply("Привет! Я бот 🤖");
    showMenu(ctx);
});


bot.hears("Узнать свое имя (Ты конченный?)", (ctx) => {
    if (ctx.chat.first_name) {
        ctx.reply(`😂 Ты конченный! Твое имя: ${ctx.chat.first_name}`);
    } else ctx.reply(`😒 Стой твое имя не указано`);

});

bot.hears("Узнать Фамилию", (ctx) => {
    if (ctx.chat.last_name) {
        ctx.reply(`👍 Вот Фамилия ${ctx.chat.last_name}`);
    } else ctx.reply(`😒 Стой твоя фамилия не указана`);
});

bot.hears("Взломать Пентагон", async (ctx) => {
    let message = await ctx.reply("Начинаем...");
    let progress = 0;
    const interval = await setInterval(() => {
        progress += 10;
        if (progress < 100) {
            ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, `Процесс: ${progress}%`)
        }
        else {
            ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, "Взлом прошел успешно")
            clearInterval(interval)
        }
    }, 1000) 
});


bot.on("text", (ctx) => {
    ctx.reply("Я не понял 🤔");
    showMenu(ctx); 
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));