"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.Service = exports.Type = exports.Category = exports.LinksImage = exports.Mask = exports.UserService = exports.UserInfo = exports.User = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
exports.User = db_1.default.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    phone_number: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
    activate: { type: sequelize_1.DataTypes.BOOLEAN },
    activate_link: { type: sequelize_1.DataTypes.STRING },
    role: { type: sequelize_1.DataTypes.STRING, defaultValue: 'USER' },
    passwordLastUpdate: { type: sequelize_1.DataTypes.DATE }
});
exports.UserInfo = db_1.default.define('user_info', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    profileLink: { type: sequelize_1.DataTypes.STRING },
    name: { type: sequelize_1.DataTypes.STRING },
    description: { type: sequelize_1.DataTypes.STRING },
    avatar: { type: sequelize_1.DataTypes.STRING },
    userId: { type: sequelize_1.DataTypes.INTEGER }
}, { timestamps: false });
exports.UserService = db_1.default.define('user_service', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: sequelize_1.DataTypes.STRING },
    serviceId: { type: sequelize_1.DataTypes.INTEGER }
}, { timestamps: false });
var Mask;
(function (Mask) {
    Mask["At"] = "at";
    Mask["PhoneNumber"] = "phonenumber";
    Mask["Link"] = "link";
    Mask["Email"] = "email";
})(Mask = exports.Mask || (exports.Mask = {}));
var LinksImage;
(function (LinksImage) {
    LinksImage["Telephone"] = "phone-ico.svg";
    LinksImage["Mail"] = "mail-ico.svg";
    LinksImage["Site"] = "site-ico.svg";
    LinksImage["Telegram"] = "telegram-ico.svg";
    LinksImage["WhatsApp"] = "whatsapp-ico.svg";
    LinksImage["Viber"] = "viber-ico.svg";
    LinksImage["Discord"] = "discord-ico.svg";
    LinksImage["Instagram"] = "instagram-ico.svg";
    LinksImage["Vk"] = "vkontakte-ico.svg";
    LinksImage["Ok"] = "odnoklassniki-ico.svg";
    LinksImage["Tiktok"] = "tiktok-ico.svg";
    LinksImage["Twitter"] = "twitter-ico.svg";
    LinksImage["Facebook"] = "facebook-ico.svg";
    LinksImage["Snapchat"] = "snapchat-ico.svg";
    LinksImage["Sberbank"] = "sberbank-ico.svg";
    LinksImage["Tinkoff"] = "tinkoff-ico.svg";
    LinksImage["Umoney"] = "umoney-ico.svg";
    LinksImage["Behance"] = "behance-ico.svg";
    LinksImage["Dribbble"] = "dribbble-ico.svg";
    LinksImage["Twitch"] = "twitch-ico.svg";
    LinksImage["YouTube"] = "youtube-ico.svg";
    LinksImage["YandexMusic"] = "yandexmusic-ico.svg";
    LinksImage["Spotify"] = "spotify-ico.svg";
    LinksImage["AppleMusic"] = "applemusic-ico.svg";
    LinksImage["Soundcloud"] = "soundcloud-ico.svg";
    LinksImage["Steam"] = "steam-ico.svg";
})(LinksImage = exports.LinksImage || (exports.LinksImage = {}));
var Category;
(function (Category) {
    Category["Basic"] = "basic";
    Category["Messenger"] = "messenger";
    Category["SocialNetwork"] = "socialnetwork";
    Category["Requisite"] = "requisite";
    Category["Media"] = "media";
    Category["Music"] = "music";
})(Category = exports.Category || (exports.Category = {}));
var Type;
(function (Type) {
    Type["Contact"] = "contact";
    Type["App"] = "app";
})(Type = exports.Type || (exports.Type = {}));
exports.Service = db_1.default.define('service', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING },
    url: { type: sequelize_1.DataTypes.STRING },
    mask: { type: sequelize_1.DataTypes.ENUM('at', 'phonenumber', 'link', 'email') },
    img: { type: sequelize_1.DataTypes.ENUM('phone-ico.svg', 'mail-ico.svg', 'site-ico.svg', 'telegram-ico.svg', 'whatsapp-ico.svg', 'viber-ico.svg', 'discord-ico.svg', 'instagram-ico.svg', 'vkontakte-ico.svg', 'odnoklassniki-ico.svg', 'tiktok-ico.svg', 'twitter-ico.svg', 'facebook-ico.svg', 'snapchat-ico.svg', 'sberbank-ico.svg', 'tinkoff-ico.svg', 'umoney-ico.svg', 'behance-ico.svg', 'dribbble-ico.svg', 'twitch-ico.svg', 'youtube-ico.svg', 'yandexmusic-ico.svg', 'spotify-ico.svg', 'applemusic-ico.svg', 'soundcloud-ico.svg', 'steam-ico.svg') },
    category: { type: sequelize_1.DataTypes.ENUM('basic', 'messenger', 'socialnetwork', 'requisite', 'media', 'music') },
    type: { type: sequelize_1.DataTypes.ENUM('contact', 'app') }
}, { timestamps: false });
exports.Token = db_1.default.define('token', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: sequelize_1.DataTypes.STRING }
});
const ServiceUserService = db_1.default.define('service_user_service', {}, { timestamps: false });
exports.User.hasOne(exports.UserInfo, { as: 'user_info' });
exports.UserInfo.belongsTo(exports.User);
exports.UserInfo.hasMany(exports.UserService, { as: 'user_services' });
exports.UserService.belongsTo(exports.UserInfo);
exports.UserService.belongsTo(exports.Service, { as: 'service' });
exports.Service.belongsToMany(exports.UserService, { as: 'user_services', through: ServiceUserService });
exports.User.hasOne(exports.Token);
exports.Token.belongsTo(exports.User);
exports.default = { User: exports.User, UserInfo: exports.UserInfo, UserService: exports.UserService, Service: exports.Service, Token: exports.Token };
//# sourceMappingURL=models.js.map