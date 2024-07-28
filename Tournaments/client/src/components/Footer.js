import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
// import '../css/Footer.css';
const Footer = () => {


    return (
        <footer class="bg-dark py-4 mt-auto">
            <div id="media" class="srodek">
                <div class="h6 fw-bolder">Social media: </div>
                <a class="fs-5 px-2 link-light" href="https://www.facebook.com/"><FacebookIcon /></a>
                <a class="fs-5 px-2 link-light" href="https://www.instagram.com/"><InstagramIcon /></a>
                <a class="fs-5 px-2 link-light" href="https://www.youtube.com/"><YouTubeIcon /></a>

            </div>
            <div class="container px-5">
                <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div class="col-auto"><div class="small m-0 text-white">Projekt &copy; <div>Mateusz Mazur</div><div>Jakub Laskowski</div></div></div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;