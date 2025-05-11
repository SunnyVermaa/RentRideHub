// import Header from '../components/Header/Header'
import DesignImage from "../assets/Design.svg";
import EnvelopeIcon from "../assets/envelope-open-solid.svg";
import FacebookIcon from "../assets/facebook-square-brands.svg";
import InstagramIcon from "../assets/instagram-square-brands.svg";
import LinkedInIcon from "../assets/linkedin-brands.svg";
import TwitterIcon from "../assets/twitter-square-brands.svg";
import MobileIcon from '../assets/mobile.svg'
import DeveloperIcon from '../assets/Develope.svg'
import SupportIcon from '../assets/Support.svg'
import RocketIcon from '../assets/rocket image.png'
import '../css/Home.css'
const Home = () =>{
    return(
        <>
        <section className="section1">
         <div className="center">
            <div className="centerPart1">
                <h1>Navigating the digital landscape for success</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sapiente nulla architecto saepe amet recusandae cupiditate commodi obcaecati hic eum doloremque maxime fugit, quaerat deleniti quidem, dolor exercitationem quo odio.</p>
                <button>Book a cuslantantion</button>
            </div>
            <div className="centerPart2">
                <img src={DesignImage}alt="design"/>
            </div>
        </div>

    </section>
    <section className="shadow-md">
        <div className="section2top">
        <img src={EnvelopeIcon} alt="Envelope" />
          <img src={FacebookIcon} alt="Facebook" />
          <img src={InstagramIcon} alt="Instagram" />
          <img src={LinkedInIcon} alt="LinkedIn" />
          <img src={TwitterIcon} alt="Twitter" />
        </div>

        <div className="services">
            <h3>Services</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni tenetur nam at quis numquam optio eaque dolorum asperiores vero eveniet iure.</p>

        </div>

    <div className="container">
        <div className="elem">
            <div className="elem-part1">
            <h2>Search engine optimization</h2>
            <h4>leran more</h4>
            </div>
            <div className="elem-part2">
                <img src={MobileIcon} alt="" />
            </div>
        </div>
        <div className="elem black">
        <div className="elem-part1">
            <h2>Pay Per Click Advertisement</h2>
            <h4>leran more</h4>
            </div>
            <div className="elem-part2">
                <img src={DeveloperIcon} alt="" />
            </div>

        </div>
        <div className="elem black">
        <div className="elem-part1">
            <h2>Social Media Marketing</h2>
            <h4>leran more</h4>
            </div>
            <div className="elem-part2">
                <img src={RocketIcon} alt="" />
            </div>
        </div>
        <div className="elem">
        <div className="elem-part1">
            <h2>E-mail Marketing</h2>
            <h4>leran more</h4>
            </div>
            <div className="elem-part2">
                <img src={SupportIcon} alt="" />
            </div>

        </div>
    </div>
    </section>
    </>
    )

}

export default Home;
