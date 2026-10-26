import { useState } from "react";

function Mieszalnik(){
    const [maszyna, setMaszyna] = useState("Mieszalnik")
    const [pokrywa, setPokrywa] = useState("Otwarte");
    const [praca, setPraca] = useState("Spoczynek");
    const [ZawartoscDziennika, setZawartoscDziennika] = useState("");
    const [komunikat, setKomunikat] = useState("Sterownik gotowy");

    return(
        <div className="CalaKarta">
            <h3>Sterownik urządzenia</h3>
            <select
               value={maszyna}
               onChange={(e) =>{
                setMaszyna(e.target.value)
                setPraca("Spoczynek")
                setPokrywa("Otwarte")
                setZawartoscDziennika("Zmieniono urządzenie")
               }}>
                <option value="Mieszalnik">Mieszalnik</option>
                <option value="Suszarka">Suszarka</option>
            </select>
            <p>Stan: {pokrywa} {praca}</p>
            <div>
                <button style={{margin: "5px"}} onClick={() => {
                    if(pokrywa === "Zamknięte") {setZawartoscDziennika(prev => prev + "Pokrywa już zamknięta\n"); return;}
                    setPokrywa("Zamknięte")
                    setZawartoscDziennika(prev => prev + "Zamknięto pokrywę\n")
                    setKomunikat("");
                }}>Zamknij</button>
                <button style={{margin: "5px"}} onClick={() =>{
                    if(pokrywa === "Otwarte") {setZawartoscDziennika(prev => prev + "Zamknij pokrywę\n"); return;}
                    if(praca === "Mieszanie" || praca === "Suszenie") {setZawartoscDziennika(prev => prev + "Urządzenie już pracuje\n"); return;}

                    {maszyna === "Mieszalnik" ? setPraca("Mieszanie") : setPraca("Suszenie")}
                    {maszyna === "Mieszalnik" ? setZawartoscDziennika(prev => prev + "Rozpoczęto mieszanie\n") : setZawartoscDziennika(prev => prev + "Rozpoczęto suszenie\n")}
                    setKomunikat("");
                }}>Start</button>
                <button style={{margin: "5px"}} onClick={() => {
                    if(praca === "Spoczynek") {setZawartoscDziennika(prev => prev + "Urządzenie nie pracuje\n"); return;}
                    setPraca("Spoczynek") 
                    setZawartoscDziennika(prev => prev + "Zatrzymano urządzenie\n")
                    setKomunikat("");
                }}>Stop</button>
                <button style={{margin: "5px"}} onClick={() => {
                    if(praca === "Mieszanie" || praca === "Suszenie") {setZawartoscDziennika(prev => prev + "Najpierw zatrzymaj urządzenie\n"); return;}
                    if(pokrywa === "Otwarte") {setZawartoscDziennika(prev => prev + "Pokrywa już otwarta\n"); return;}
                    setPokrywa("Otwarte")
                    setZawartoscDziennika(prev => prev + "Otwarto pokrywę\n")
                    setKomunikat("");
                }}>Otworz</button>
                <button style={{margin: "5px"}} onClick={() => setZawartoscDziennika("Wyczyszczono dziennik")}>Wyczysc dziennik</button>
                <button style={{margin: "5px"}} onClick={() => {
                    setMaszyna("Mieszalnik")
                    setPokrywa("Otwarte") 
                    setPraca("Spoczynek")
                    setZawartoscDziennika("")
                    setKomunikat("Sterownik gotowy");
                }}>Reset</button>
            </div>
            <div>
                <h4>Dziennik</h4>
                <textarea rows="5" value={ZawartoscDziennika} readOnly></textarea>
            </div>
            <p>{komunikat}</p>
        </div>
    );
}

export default Mieszalnik;