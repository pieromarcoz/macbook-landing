import {navLinks} from "../constants/index.js";

export default function Navbar() {
    return (
        <header>
            <nav>
                <img src={'/logo.svg'} alt={'Apple logo'}/>
                <ul className={'flex-center'}>
                    {navLinks.map(({label}) => (
                        <li key={label}>
                            <a href={`#${label.toLowerCase()}`}>{label}</a>
                        </li>
                    ))}
                </ul>
                <div className={'flex-center gap-3'}>
                    <button aria-label="Buscar">
                        <img src={'/search.svg'} alt={'Search'}/>
                    </button>
                    <button aria-label="Carrito de compras">
                        <img src={'/cart.svg'} alt={'Cart'}/>
                    </button>
                </div>
            </nav>
        </header>
    )
        ;
};

