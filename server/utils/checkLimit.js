module.exports = function checkLimit(type, user) {
  if (user.isAdmin || user.isPremium) return true;

  const today = new Date().toDateString();

  const limitType = user[`${type}Limit`] || { count: 0 };
  const usedToday = limitType.lastUsed?.toDateString() === today ? limitType.count : 0;

  if ((type === "chat" && usedToday >= 5) || (type === "journal" && usedToday >= 3)) {
    return false;
  }

  return true;
};
