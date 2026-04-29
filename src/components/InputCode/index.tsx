import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Typography } from '../Typography';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';
import { convertAlpha } from '../../utils';

type InputCodeCellProps = {
    value?: string;
    active?: boolean;
}

type InputCodeProps = {
    length?: number;
    onFinsh?: (value: string) => void;

} & TextInputProps;

const InputCodeCell = ({ value, active }: InputCodeCellProps) => {
    return (
        <View style={[styles.cellContainer, active && styles.cellContainerActive]}>
            <Typography allowFontScaling={false} style={[styles.cellText, active && styles.cellTextActive]} level={'bodyMedium'}>{value}</Typography>
        </View>
    )
}

const InputCode = ({ style, length, onFinsh, onChangeText, onFocus, onBlur, ...props }: InputCodeProps) => {
    const textRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState('');
    const arrs = useMemo(() => Array(length).fill(0).map((_, i) => i), [length]);

    const handleChangeText = (val: string) => {
        setText(val);
        onChangeText?.(val);
        if (length && val.length === length) {
            onFinsh?.(val);
        }
    };

    const activeIndex = useMemo(() => {
        if (!isFocused) return -1;
        if (text.length === 0) return 0;
        if (text.length >= (length ?? 0)) return (length ?? 0) - 1;
        return text.length;
    }, [isFocused, text, length]);

    return (
        <Pressable onPress={() => textRef.current?.focus()} style={[styles.inputCodeContainer, style]}>
            <TextInput
                ref={textRef}
                {...props}
                style={styles.hidden}
                value={text}
                maxLength={length}
                onChangeText={handleChangeText}
                onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
                onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
            />
            {arrs.map((i) => (
                <InputCodeCell key={i} value={text[i]} active={i === activeIndex} />
            ))}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cellContainer: {
        height: 54,
        width: 54,
        borderRadius: 18,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pallet.background,
        overflow: 'hidden'
    },

    cellText: {
        fontFamily: fonts.nunito.bold,
        borderRadius: 12,
        borderWidth: 2,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: convertAlpha(40, pallet.primary),
        backgroundColor: pallet.variant.neutral['100'],
    },

    cellContainerActive: {
        backgroundColor: convertAlpha(30, pallet.primary),
    },

    cellTextActive: {
        borderColor: pallet.primary,
    },

    hidden: {
        width: 0,
        height: 0,
        opacity: 0,
        position: 'absolute'
    },

    inputCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export { InputCode, InputCodeCell }