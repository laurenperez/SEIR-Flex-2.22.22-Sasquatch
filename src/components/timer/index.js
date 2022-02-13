import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import * as styles from './timer.module.scss';
import timesUp from '../../assets/times-up.wav';

Modal.setAppElement('#___gatsby');

const Timer = ({ modalIsOpen, toggleModal }) => {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTiming, setIsTiming] = useState(false);

    const callbackRef = useRef();


    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    function handleClick(seconds) {
        setElapsedTime(seconds);
        setIsTiming(true);
    }

    function handleTick() {
        if(isTiming) {
            setElapsedTime(elapsedTime - 1);
        } 
        
        if(elapsedTime === 1) {
            if(typeof window !== undefined) {
                const player = new Audio();
                player.src = timesUp;
                player.play();
            }
            setElapsedTime(0)
            setIsTiming(false)
        }
    }

    useEffect(() => {
        callbackRef.current = handleTick;
    });

    useEffect(() => {
        let timerId;
        if(isTiming) {
            timerId = setInterval(callbackRef.current, 1000);
        }
        return () => clearInterval(timerId);
    })


    return (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          style={customStyles}
          contentLabel="Example Modal"
        > <div className={styles.modalContainer}>
            <button onClick={toggleModal}>X</button>
            <h3>Activity Timer</h3>
            <div className={styles.timer} >
                {formatTime(elapsedTime)}
            </div>
                <div className={styles.controls}>
                    <button  
                        style={{visibility: elapsedTime > 0 ? 'visible' 
                        : 'hidden'}} onClick={() => setIsTiming(isTiming ? false : true)}>{isTiming ? 'Stop' : 'Start'}</button>
                    <button  
                        style={{visibility: isTiming ? 'hidden':'visible'}} 
                        onClick={() => handleClick(900)}>15 Mins</button>
                    <button  
                        style={{visibility: isTiming ? 'hidden':'visible'}} 
                        onClick={() => handleClick(720)}>12 Mins</button>
                    <button  
                        style={{visibility: isTiming ? 'hidden':'visible'}} 
                        onClick={() => handleClick(600)}>10 Mins</button>
                    <button  
                        style={{visibility: isTiming ? 'hidden':'visible'}} 
                        onClick={() => handleClick(300)}>5 Mins</button>
                    <button  
                        style={{visibility: elapsedTime > 0 ? 'visible' 
                        : 'hidden'}} onClick={() => { setIsTiming(false); setElapsedTime(0);}}>Reset</button>
                </div>
        </div>
        </Modal>
    );
}


export default Timer;