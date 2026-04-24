import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from '../../../components';
import { fonts } from '../../../config/constants';
import { pallet } from '../../../config/pallet';

const INITIAL_TIME = 60;

type ResendCodeProps = {
    onResend?: () => void;
}

const ResendCode = ({ onResend }: ResendCodeProps) => {
    const timer = useRef<number | null>(null);

    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isAllowSendAgain, setIsAllowSendAgain] = useState(false);

    useEffect(() => {
        if (timeLeft === 0) {
            setIsAllowSendAgain(true);
        }
    }, [timeLeft]);

    const start = () => {
        if (timer.current) {
            clearInterval(timer.current);
        }

        setTimeLeft(INITIAL_TIME);
        setIsAllowSendAgain(false);

        timer.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
    }

    useEffect(() => {
        start()

        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    }, [])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleResend = () => {
        setTimeLeft(INITIAL_TIME);
        setIsAllowSendAgain(false);

        onResend?.();
    };

    return (
        <View style={styles.container}>
            {isAllowSendAgain ? (
                <Pressable onPress={handleResend}>
                    <Typography style={[styles.contextText, styles.resendLink]} level='labelLarge'>Resend code</Typography>
                </Pressable>
            ) : (
                <Typography style={styles.contextText} level='labelLarge'>Resend code in {formatTime(timeLeft)}</Typography>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contextText: {
        color: pallet.variant.neutral['1000'],
        fontFamily: fonts.nunito.bold,
    },
    resendLink: {
        color: pallet.primary,
        fontFamily: fonts.nunito.bold,
        textAlign: 'center',
    },
})

export default ResendCode;
