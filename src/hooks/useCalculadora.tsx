import { useState, useRef } from "react";

enum Operadores {
    sumar, resta, multiplicar, dividir
}

export const useCalculadora = () => {

    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = ( numeroTexto: string ) => {

        // no aceptar doble punto
        if ( numero.includes('.') && numeroTexto === '.') return;

        if ( numero.startsWith('0') || numero.startsWith('-0') ) {

            // punto decimal
            if ( numeroTexto === '.') {
                setNumero( numero + numeroTexto );
            
            // evaluar si es otro cero y hay un punto
            } else if ( numeroTexto === '0' && numero.includes('.') ) {
                setNumero ( numero + numeroTexto );
            
            // evaluar si es diferente de cero y no tiene un punto
            } else if ( numeroTexto !== '0' && !numero.includes('.') ) {
                setNumero ( numeroTexto );

            // evitar 0000.0
            } else if ( numeroTexto === '0' && !numero.includes('.') ) {
                setNumero ( numero );
            } else {
                setNumero ( numero + numeroTexto );
            }

        } else {
            setNumero( numero + numeroTexto );
        }

    }

    const positivoNegativo = () => {
        if ( numero.includes('-')) {
            setNumero( numero.replace('-', ''));
        } else {
            setNumero( '-' + numero );
        }
    }

    const btnDelete = () => {
        if ( numero.length === 1 ) {
            setNumero ( '0' );
        } else if (numero.includes('-') && numero.length === 2) {
            setNumero('0');
        } else {
            setNumero( numero.slice(0,-1) )
        }
    }

    const cambiarNumPorAnterior = () => {

        if ( numero.endsWith('.') ) {
            setNumeroAnterior( numero );
        } else {
            setNumeroAnterior( numero );
        }

        setNumero('0');

    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.resta;
    }

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }

    const btnCalcular = () => {

        const num1 = Number ( numero );
        const num2 = Number ( numeroAnterior );

        switch ( ultimaOperacion.current ) {

            case Operadores.sumar: setNumero( `${ num1 + num2 }` ); break;
            case Operadores.resta: setNumero( `${ num2 - num1 }` ); break;
            case Operadores.multiplicar: setNumero( `${ num1 * num2 }` ); break;
            case Operadores.dividir: setNumero( `${ num2 / num1 }` ); break;

            default: break;

        }

        setNumeroAnterior( '0' );

    }

    return { 
        numeroAnterior,
        numero,
        limpiar,
        positivoNegativo,
        btnDelete,
        btnDividir,
        armarNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        btnCalcular,
    }

}