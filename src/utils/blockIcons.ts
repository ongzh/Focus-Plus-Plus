import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaYoutube,
  FaDiscord,
  FaTwitch,
  FaAmazon,
  FaReddit,
  FaFacebookMessenger,
  FaLinkedin,
} from "react-icons/fa";
import { TbBrandNetflix, TbBrandDisney } from "react-icons/tb";

export const BlockIcons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  youtube: FaYoutube,
  discord: FaDiscord,
  twitch: FaTwitch,
  amazon: FaAmazon,
  netflix: TbBrandNetflix,
  disneyplus: TbBrandDisney,
  reddit: FaReddit,
  messenger: FaFacebookMessenger,
  linkedin: FaLinkedin,
};

export type BlockIconsKeys = keyof typeof BlockIcons;
