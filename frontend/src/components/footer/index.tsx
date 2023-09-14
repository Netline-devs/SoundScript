/** @format */
import style from "./style.module.css";
import discordIcon from "../../assets/discord.png";
import instagramIcon from "../../assets/instagram.png";

const socialData = [
  {
    name: "discord",
    link: "https://discord.gg/sKmfq7DU58",
    icon: discordIcon,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/itszavier_1/",
    icon: instagramIcon,
  },
];
export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <h3>developer</h3>
        <p>imani brown</p>
      </div>

      <div className={style.container}>
        <h3>socials</h3>
        <div className={style.links}>
          {socialData.map((data, index) => (
            <a key={index} className={style.link} target="_blank" href={data.link}>
              <img src={data.icon} alt="discord" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
