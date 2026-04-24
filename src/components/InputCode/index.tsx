import React, { useEffect, useMemo, useRef } from 'react';
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

const InputCode = ({ style, length, ...props }: InputCodeProps) => {
    const textRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const arrs = useMemo(() => { return Array(length).fill(0).map((_, i) => i) }, [length])

    useEffect(() => {
        if (props.value && length && props.value.length === length) {
            props.onFinsh?.(props.value);
        }
    }, [props.value, length]);

    const forceFocusTextInput = () => {
        textRef.current?.focus();
    }

    const activeIndex = useMemo(() => {
        if (!isFocused) return -1;

        const valLength = props.value?.length ?? 0;

        if (valLength === 0) return 0;

        if (valLength >= (length ?? 0)) return length! - 1;

        return valLength;
    }, [isFocused, props.value, length]);

    return (
        <Pressable onPress={forceFocusTextInput} style={[styles.inputCodeContainer, style]}>
            <TextInput
                maxLength={length}
                ref={textRef}
                {...props}
                style={styles.hidden}
                onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    props.onBlur?.(e);
                }}
            />
            {arrs.map((i) => (
                <InputCodeCell
                    key={i}
                    value={props.value?.[i]}
                    active={i === activeIndex}
                />
            ))}
        </Pressable>
    )
}

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