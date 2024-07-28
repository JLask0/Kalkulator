import React from "react";
import { Container, Link } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsIcon from '@mui/icons-material/Sports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import '../css/Home.css';
import backgroundImg from './tloprojektu.png';

const Home = () => {
    return (
        <div >
            <div className="home">
                <div className="container">
                    <div className="text-overlay">
                        <h1>
                            <span className='one'>T</span>
                            <span className='two'>o</span>
                            <span className='three'>u</span>
                            <span className='four'>r</span>
                            <span className='five'>n</span>
                            <span className='six'>e</span>
                            <span className='seven'>y</span>
                            <span className='one'>F</span>
                            <span className='two'>o</span>
                            <span className='three'>r</span>
                            <span className='four'>g</span>
                            <span className='five'>e</span>
                        </h1>
                        <h3>Najlepszy sposób na rozpoczęcie rywalizacji.</h3>
                    </div>
                    <img src={backgroundImg} alt='Stadion' className="background-image" />
                </div>
            </div>
            <div className="d-flex flex-column h-100">
                <main className="flex-shrink-0">
                    <section className="py-5" id="features">
                        <Container>
                            <div className="row gx-5">
                                <div className="col-lg-4 mb-5 mb-lg-0">
                                    <h2 className="fw-bolder mb-0">Co znajdziesz na stronie?</h2>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row gx-5 row-cols-1 row-cols-md-2">
                                        <div className="col mb-5 h-100">
                                            <Link href="/tournaments">
                                                <EmojiEventsIcon style={{ background: "#4db1bc", padding: "2px", borderRadius: "10px", textAlign: "center", fontSize: 40, color: 'black' }} />
                                            </Link>
                                            <h2 className="h5">Turnieje</h2>
                                            <p className="mb-0">Twórz nowe wydarzenia lub dołącz do istniejących</p>
                                        </div>
                                        <div className="col mb-5 h-100">
                                            <Link href="/referee">
                                                <SportsIcon style={{ background: "#4db1bc", padding: "2px", borderRadius: "10px", textAlign: "center", fontSize: 40, color: 'black' }} />
                                            </Link>
                                            <h2 className="h5">Sędziowie</h2>
                                            <p className="mb-0">Jeśli jesteś sędzią mamy również coś dla ciebie. Dołącz do nas</p>
                                        </div>
                                        <div className="col mb-5 mb-md-0 h-100">
                                            <Link href="/my-tournaments">
                                                <AccountCircleIcon style={{ background: "#4db1bc", padding: "2px", borderRadius: "10px", textAlign: "center", fontSize: 40, color: 'black' }} />
                                            </Link>
                                            <h2 className="h5">Moje turnieje</h2>
                                            <p className="mb-0">Przejdź do zakładki z moimi turniejami</p>
                                        </div>
                                        <div className="col h-100">
                                            <Link href="/about">
                                                <QuestionMarkIcon style={{ background: "#4db1bc", padding: "2px", borderRadius: "10px", textAlign: "center", fontSize: 40, color: 'black' }} />
                                            </Link>
                                            <h2 className="h5">Pomoc</h2>
                                            <p className="mb-0">W razie uzyskania dodatkowych informacji skontaktuj się z nami</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </section>
                    <div className="py-5 bg-light">
                        <Container>
                            <div className="row gx-5 justify-content-center">
                                <div className="col-lg-10 col-xl-7">
                                    <div className="text-center">
                                        <div className="fs-4 mb-4 fst-italic">"Everything is practise."</div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="fw-bold">
                                                Edson Arantes do Nascimento - Pele
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;