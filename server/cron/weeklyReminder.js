
const cron = require("node-cron");
const Journal = require("../models/journalModel");
const User = require("../models/User");
const sendReminderEmail = require("../utils/sendReminderEmail");

cron.schedule("0 9 * * 0", async () => {

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const users = await User.find();

  for (let user of users) {
    const recentEntry = await Journal.findOne({
      user: user._id,
      createdAt: { $gte: oneWeekAgo }
    });

    if (!recentEntry) {
      await sendReminderEmail(user.email, user.name, user._id);
    }
  }
});
