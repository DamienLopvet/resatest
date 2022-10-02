import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Ajouter from "./Ajouter";
import Modifier from "./Modifier";
import Supprimer from "./Supprimer";
import Connexion from "./Connexion";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/Ajouter">Ajouter</Link>
                        </li>
                        <li>
                            <Link to="/Modifier">Modifier</Link>
                        </li>
                        <li>
                            <Link to="/Supprimer">
                                <Supprimer />
                            </Link>
                        </li>
                        <li>
                            <Link to="/Connexion">Connexion</Link>
                        </li>
                    </ul>
                </nav>
                <hr></hr>
                <Routes>
                    <Route path="/Ajouter" element={<Ajouter />} />
                    <Route path="/Modifier" element={<Modifier />} />
                    <Route path="/Supprimer" element={<Supprimer />} />
                    <Route path="/Connexion" element={<Connexion />} />

                </Routes>
            </div>
        </Router>
    );
}
