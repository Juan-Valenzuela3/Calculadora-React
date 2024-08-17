import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { evaluate } from 'mathjs';

function Calculator () {
    const [displayValue, setDisplayValue] = useState('0');

    // Functions numbers | Event click and keyPressed
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []); 

    useEffect(() => {
      const handleEnter = (event) => {
          if (event.key === 'Enter') {
              calculatorNumber();
          } 
      };
  
      document.addEventListener('keydown', handleEnter);
  
      return () => {
          document.removeEventListener('keydown', handleEnter);
      };
    }, [displayValue]);

    const handleKeyDown = (event) => {
        const key = event.key;

        if (key === 'Enter') {
      
        } else if (key === 'Delete') {
          clearNumber();
        } else if (key === 'Backspace') {
          deleteNumber();
        } else if (/[0-9+\-\/.*=]/.test(key)) {
          numberClick(key);
        }
    };

    // Functions

    const numberClick = (number) => {

        setDisplayValue(prevValue => {
        const newValue = prevValue === '0' ? number : prevValue + number;
        
        if (/\.(\d*)\./.test(newValue)) {
          return prevValue; 
        } else {
          return newValue;
        }
      }); 

    };

    const deleteNumber = () => {
      setDisplayValue(prevValue => {
        if (/[\+\-\*\/]/.test(prevValue)) {
          // Si contiene un operador, sigue borrando el último dígito
          return prevValue.length > 1 ? prevValue.slice(0, -1) : '0';
        } else {
          // Si no hay operadores, significa que es el resultado de una operación
          return '0';
        }
      });
    }

    const clearNumber = () => {
      setDisplayValue('0');
    }

    const calculatorNumber = () => {
      const numberOperator = displayValue;
      const regex = /[\+\-\*\/]{2,}/;
      
      function substractOperator (cadena) {
        const operadores = ["+", "-", "*", "/", "%", "^"];
        const operatorMenos = [];

          for (let caracter of cadena) {
            if (operadores.includes(caracter)) {
                operatorMenos.push(caracter)
            }
          }

          return operatorMenos;
      }

      const operatorTotal = substractOperator(numberOperator)
      const comprobarMenos = operatorTotal[operatorTotal.length -1];
      const comprobarMenossubs = comprobarMenos.endsWith('-')    

      if (regex.test(numberOperator) && comprobarMenossubs === true) {
        const result = evaluate(numberOperator);
        setDisplayValue(result);
      } else if (regex.test(numberOperator)){

        function deleteOperators(cadena) {

          const operators = /[+\-*\/]/g;
          let numbers = cadena.split(operators); 
          let lastOperator = cadena.match(operators);
      
          if (lastOperator && numbers.length > 1) {
              let lastNumber = numbers.pop(); 
              cadena = numbers.join('') + lastOperator.pop() + lastNumber; 
          } else {
              cadena = cadena;
          }
          return cadena;
        }
      
      const oneOperator = deleteOperators(numberOperator);
      const result = evaluate(oneOperator)
      setDisplayValue(result)
      
      } else {
        const result = evaluate(numberOperator);
        setDisplayValue(result);
      }
    }

  return (
    <div id="container">
      
      <input type="text" id="display" value={displayValue} readOnly disabled/>
      <input type="submit" value="AC" id="clear" onClick={clearNumber}/>
      <button id="menos1" onClick={deleteNumber}>
        <FontAwesomeIcon icon={faDeleteLeft} />
      </button>        
      <input type="submit" value="/" id="divide" onClick={() => numberClick('/')}/>
      <input type="submit" value="7" onClick={() => numberClick('7')} id="seven"/>
      <input type="submit" value="8" onClick={() => numberClick('8')} id="eight" />
      <input type="submit" value="9" onClick={() => numberClick('9')} id="nine" />
      <input type="submit" value="x" onClick={() => numberClick('*')} id="multiply"/>
      <input type="submit" value="4" onClick={() => numberClick('4')} id="four"/>
      <input type="submit" value="5" onClick={() => numberClick('5')} id="five"/>
      <input type="submit" value="6" onClick={() => numberClick('6')} id="six"/>
      <input type="submit" value="-" onClick={() => numberClick('-')} id="subtract"/>
      <input type="submit" value="1" onClick={() => numberClick('1')} id="one"/>
      <input type="submit" value="2" onClick={() => numberClick('2')} id="two"/>
      <input type="submit" value="3" onClick={() => numberClick('3')} id="three"/>
      <input type="submit" value="+" onClick={() => numberClick('+')} id="add"/>
      <input type="submit" value="0" onClick={() => numberClick('0')} id="zero"/>
      <input type="submit" value="." onClick={() => numberClick('.')} id="decimal"/>
      <input type="submit" value="=" onClick={calculatorNumber} id="equals"/>  
      
    </div>
  )
}

export default Calculator
